namespace Garnet.Services.Auth.Application.Handlers.Auth;

using Garnet.Services.Auth.Application.Commands.Auth;
using Garnet.Services.Auth.Application.Interfaces;
using Garnet.Services.Auth.Domain.Aggregates.MerchantAggregate;
using Garnet.Services.Auth.Domain.Repositories;
using Garnet.Services.Auth.Infrastructure.External.Tokens;
using Garnet.Libs.SharedKernel.Events.Auth;
using Garnet.Libs.SharedKernel.Events;
using Garnet.Libs.InfraCommon.Messaging;

public class OAuthLoginHandler
{
    private readonly IOAuthService _oAuthService;
    private readonly IMerchantRepository _merchantRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly JwtTokenGenerator _jwtTokenGenerator;
    private readonly IEventBus _eventBus;

    public OAuthLoginHandler(
        IOAuthService oAuthService,
        IMerchantRepository merchantRepository,
        IPasswordHasher passwordHasher,
        JwtTokenGenerator jwtTokenGenerator,
        IEventBus eventBus
    )
    {
        _oAuthService = oAuthService;
        _merchantRepository = merchantRepository;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
        _eventBus = eventBus;
    }

    public async Task<OAuthLoginResult> HandleAsync(OAuthLoginCommand command, CancellationToken ct = default)
    {
        var profile = await _oAuthService.AuthCodeAsync(command.Provider, command.Code, ct);

        var merchant = await _merchantRepository.GetByEmailAsync(profile.Email, ct);

        bool isNewAccount = false;

        if (merchant is null)
        {
            var randomPassword = _passwordHasher.HashPassword(Guid.NewGuid().ToString("N"));

            merchant = Merchant.CreateNew(
                email: profile.Email,
                passwordHash: randomPassword,
                legalName: profile.Name ?? profile.Email,
                phone: string.Empty,
                country: string.Empty
            );

            merchant.Auth.EmailVerified = true;

            merchant.Auth.LinkOAuth(profile.Provider, profile.ProviderId);

            await _merchantRepository.AddAsync(merchant, ct);
            await _merchantRepository.SaveChangesAsync(ct);

            isNewAccount = true;
        }
        else
        {
            if (string.IsNullOrEmpty(merchant.Auth.OAuthProvider))
            {
                merchant.Auth.LinkOAuth(profile.Provider, profile.ProviderId);
                _merchantRepository.Update(merchant);
                await _merchantRepository.SaveChangesAsync(ct);
            }
            else if (merchant.Auth.OAuthProvider != profile.Provider || merchant.Auth.OAuthId != profile.ProviderId)
            {
                throw new InvalidOperationException(
                    "This email is already linked to a different OAuth provider.");
            }
        }

        var accessToken = _jwtTokenGenerator.GenerateAccessToken(
            merchant.Id, merchant.Email, new[] { "Merchant" });
        var refreshToken = _jwtTokenGenerator.GenerateRefreshToken();

        var loginEvent = new UserLoginEvent(
            MerchantId: merchant.Id,
            CreatedAt: DateTime.UtcNow
        )
        {
            Metadata = new Dictionary<string, object>
            {
                ["OAuthProvider"] = profile.Provider,
                ["IpAddress"] = command.Meta?.Ip ?? "127.0.0.1",
                ["UserAgent"] = command.Meta?.UserAgent ?? "Unknown"
            }
        };

        await _eventBus.PublishAsync(
            topic: EventTopics.AuthEvents,
            partitionKey: merchant.Id.ToString(),
            @event: loginEvent,
            ct: ct
        );

        return new OAuthLoginResult(
            AccessToken: accessToken,
            RefreshToken: refreshToken,
            ExpiresIn: 3600,
            IsNewAccount: isNewAccount
        );
    }
}

public record OAuthLoginResult(
    string AccessToken,
    string RefreshToken,
    int ExpiresIn,
    bool IsNewAccount
);
