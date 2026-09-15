namespace Garnet.Services.Auth.Application.Handlers.Auth;

using Garnet.Services.Auth.Application.Commands.Auth;
using Garnet.Services.Auth.Domain.Repositories;

public class GetProfileHandler
{
    private readonly IMerchantRepository _merchantRepository;

    public GetProfileHandler(IMerchantRepository merchantRepository)
    {
        _merchantRepository = merchantRepository;
    }

    public async Task<GetProfileResponse> HandleAsync(GetProfileCommand command, CancellationToken ct = default)
    {
        var merchant = await _merchantRepository.GetByIdAsync(command.Id, ct);

        if (merchant?.Auth == null)
        {
            throw new UnauthorizedAccessException("Invalid credentials.");
        }

        if (merchant.Auth.LockedOutUntil.HasValue && merchant.Auth.LockedOutUntil.Value > DateTime.UtcNow)
        {
            var remainingMinutes = Math.Ceiling((merchant.Auth.LockedOutUntil.Value - DateTime.UtcNow).TotalMinutes);
            throw new Exception($"Account is locked. Try again in {remainingMinutes} minute(s).");
        }

        var profileDto = new ProfileDto(
            merchant.Id,
            merchant.Email,
            merchant.LegalName,
            merchant.Phone,
            merchant.Country,
            merchant.Status,
            merchant.Credit,
            merchant.AICredit,
            merchant.Subscription,
            merchant.CreatedAt,
            merchant.Auth.TestKey,
            merchant.Auth.ProdKey
        );

        return new GetProfileResponse(profileDto);
    }
}
