namespace Garnet.Services.Auth.Application.Handlers.Auth;

using Garnet.Services.Auth.Domain.Repositories;
using System.Security.Cryptography;
using Garnet.Services.Auth.Application.Commands.Auth;
using Garnet.Services.Auth.Domain.Aggregates.MerchantAggregate;
using Garnet.Services.Auth.Application.Interfaces;

public class RequestEmailVerificationHanlder
{
    private readonly IMerchantRepository _merchantRepository;
    private readonly IEmailVerificationService _emailVerificationService;

    public RequestEmailVerificationHanlder(IMerchantRepository merchantRepository, IEmailVerificationService emailVerificationService)
    {
        _merchantRepository = merchantRepository;
        _emailVerificationService = emailVerificationService;
    }

    public async Task HandleAsync(VerifyEmailCommand command, CancellationToken ct = default)
    {
        var merchant = await _merchantRepository.GetByEmailAsync(command.Email, ct)
        ?? throw new InvalidOperationException("Merchant not found");

        var auth = merchant.Auth;

        if (auth.EmailVerified) {
            return;
        }

        if (!auth.ExpiryDate.HasValue || DateTime.UtcNow > auth.ExpiryDate.Value)
        {
            return merchant.Auth.EmailVerificationToken;
        }

        string token = Convert.ToHexString(RandomNumberGenerator.GetBytes(24));

        merchant.Auth.EmailVerificationToken = token;
        merchant.Auth.ExpiryDate = DateTime.UtcNow.AddHours(24);

        await _merchantRepository.AddAsync(merchant, ct);
        await _merchantRepository.SaveChangesAsync(ct);

        await _emailVerificationService.SendAsync(merchant.Email, token, ct);

        return token;
    }
}
