namespace Garnet.Services.Auth.Application.Handlers.Auth;

using Garnet.Services.Auth.Application.Commands.Auth;
using Garnet.Services.Auth.Domain.Repositories;
using Garnet.Services.Auth.Infrastructure.External.Tokens;
using Garnet.Services.Auth.Infrastructure.External.Mfa;
using Garnet.Services.Auth.Domain.ValueObjects;
using System.Net;
using Garnet.Libs.SharedKernel.Events.Auth;
using Garnet.Libs.SharedKernel.Events;
using Garnet.Libs.InfraCommon.Messaging;
using Garnet.Services.Auth.Infrastructure.Persistence.Stores;

public class LoginUserHandler
{
    private readonly IMerchantRepository _merchantRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly JwtTokenGenerator _jwtTokenGenerator;
    private readonly TotpService _totpService;
    private readonly SessionStore _sessionStore;
    private readonly IEventBus _eventBus;

    public LoginUserHandler(
        IMerchantRepository merchantRepository,
        IPasswordHasher passwordHasher,
        JwtTokenGenerator jwtTokenGenerator,
        TotpService totpService,
        SessionStore sessionStore,
        IEventBus eventBus
    )
    {
        _merchantRepository = merchantRepository;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
        _totpService = totpService;
        _sessionStore = sessionStore;
        _eventBus = eventBus;
    }

    public async Task<AuthTokenResult> HandleAsync(LoginUserCommand command, CancellationToken cancellationToken = default)
    {
        var merchant = await _merchantRepository.GetByEmailAsync();
        if (merchant?.Auth == null)
        {
            throw new UnauthorizedAccessException("Invald Credentials (Email or password)");
        }

        if (command.Auth.LockedOutUntil.HasValue && command.Auth.LockedOutUntil.Value > DateTime.UtcNow)
        {
            var remainingMinutes = Math.Ceiling((command.Auth.LockedOutUntil.Value - DateTime.UtcNow).TotalMinutes);

            throw new Forbidden($"Account is locked. Try again in {remainingMinutes} minute(s).");
        }

        var passwordValid = _passwordHasher.VerifyPassword(command.Password, merchant.Auth.PasswordHash);
        if (!passwordValid)
        {
            merchant.Auth.RegisterFailedLogin();

            _merchantRepository.Update(merchant);
            await _merchantRepository.SaveChangesAsync(cancellationToken);

            if (merchant.Auth.IsLocked)
            {
                var accountLockedEvent = new AccountLockedEvent(
                    MerchantId: merchantId,
                    LockedUntil: merchant.Auth.LockedOutUntil!.Value
                );

                await _eventBus.PublishAsync(
                    topic: EventTopics.AuthEvents,
                    partitionKey: merchant.Id.ToString(),
                    @event: accountLockedEvent,
                    ct: cancellationToken
                );
            }

            throw new UnauthorizedAccessException("Invalid credentials: invalid password");
        }

        merchant.Auth.ResetLockout();
        _merchantRepository.Update(merchant);
        await _merchantRepository.SaveChangesAsync(cancellationToken);

        if (command.Auth.MfaEnabled)
        {
            string mfaToken = _totpService.GenerateSecretKey(32);
            
            var mfaPayload = new { MerchantId = merchant.id, CreatedAt = DateTme.UtcNow };

            await _sessionStore.SaveSessionAsync(
                sessionKey: $"mfa:pending:{mfaToken}",
                sessonData: mfaPayload,
                ttl: TimeSpan.FromMinutes(5),
                ct: cancellationToken
            );

            return new LoginResponse(
                MfaRequired: true,
                MfaToken: mfaToken
            );
        }

        var accessToken = _jwtTokenGenerator.GenerateAccessToken(merchant.Id, merchant.Email, new[] { "Merchant" });
        var refreshToken = _jwtTokenGenerator.GenerateRefreshToken();

        var userLoginEvent = new UserLoginEvent(
            MerchantId: merchant.id,
            CreatedAt: DateTime.UtcNow
        )
        {
            Metadata = new Dictionary<string, object>
            {
                ["IpAddress"] = command.IpAddress ?? "127.0.0.1",
                ["Location"] = command.Location ?? "Unknown",
                ["UserAgent"] = command.UserAgent ?? "Unknown",
                ["DeviceType"] = command.DeviceType ?? "Unknown"
            }
        };

        await _eventBus.PublishAsync(
            topic: EventTopics.AuthEvents,
            partitionKey: merchant.Id.ToString(),
            @event: userLoginEvent,
            ct: cancellationToken
        );

        return new LoginResponse(
            AccessToken: accessToken,
            RefreshToken: refreshToken,
            ExpiresIn: 3600
        );
    }
}
