namespace Garnet.Services.Auth.Application.Handlers.Auth;

using Garnet.Services.Auth.Application.Commands.Auth;
using Garnet.Services.Auth.Domain.Repositories;

public class VerifyEmailHanlder
{
    private readonly IMerchantRepository _merchantRepository;

    public VerifyEmailHanlder(IMerchantRepository merchantRepository)
    {
        _merchantRepository = merchantRepository;
    }

    public async Task HandleAsync(VerifyEmailCommand command, CancellationToken ct = default)
    {
        var merchant = await _merchantRepository.GetByEmailAsync(command.Email, ct)
        ?? throw new InvalidOperationException("Merchant not found");

        var auth = merchant.Auth;

        if (auth.EmailVerified)
        {
            return;
        }

        if (string.IsNullOrEmpty(auth.EmailVerificationToken) || auth.EmailVerificationToken != command.Token)
        {
            throw new InvalidOperationException("Invalid verification token");
        }

        if (!auth.ExpiryDate.HasValue || DateTime.UtcNow > auth.ExpiryDate.Value)
        {
            throw new InvalidOperationException("Verification token has expired");
        }

        auth.EmailVerified = true;
        auth.EmailVerificationToken = null;
        auth.ExpiryDate = null;

        await _merchantRepository.SaveChangesAsync(ct);
    }
}
