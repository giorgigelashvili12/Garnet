namespace Garnet.Services.Auth.Application.Handlers.Auth;

using Garnet.Services.Auth.Application.Commands.Auth;
using Garnet.Services.Auth.Domain.Repositories;

public class UpdateProfileHandler
{
    private readonly IMerchantRepository _merchantRepository;

    public UpdateProfileHandler(IMerchantRepository merchantRepository)
    {
        _merchantRepository = merchantRepository;
    }

    public async Task HandleAsync(UpdateProfileCommand command, CancellationToken ct = default)
    {
        var merchant = await _merchantRepository.GetByIdAsync(command.id);
        if (merchant?.Auth == null)
        {
            throw new UnauthorizedAccessException("Invald Credentials (Email or password)");
        }

        if (command.Auth.LockedOutUntil.HasValue && command.Auth.LockedOutUntil.Value > DateTime.UtcNow)
        {
            var remainingMinutes = Math.Ceiling((command.Auth.LockedOutUntil.Value - DateTime.UtcNow).TotalMinutes);

            throw new Forbidden($"Account is locked. Try again in {remainingMinutes} minute(s).");
        }

        if (string.IsNullOrWhiteSpace(command.Phone) || string.IsNullOrWhiteSpace(command.LegalName))
        {
            throw new UnauthorizedAccessException("Fields should not be null or empty");
        }

        merchant.Phone = command.Phone;
        merchant.LegalName = command.LegalName;

        await _merchantRepository.UpdateAsync(merchant, ct);

        return new UpdateProfileRes(
            Status: "Success",
            Message: "Profile updated"
        );
    }
}
