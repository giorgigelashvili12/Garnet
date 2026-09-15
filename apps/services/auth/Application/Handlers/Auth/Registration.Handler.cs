namespace Garnet.Services.Auth.Application.Handlers.Auth;

using Garnet.Services.Auth.Application.Commands.Auth;
using Garnet.Services.Auth.Application.Interfaces;
using Garnet.Services.Auth.Domain.Aggregates.MerchantAggregate;
using Garnet.Services.Auth.Domain.Repositories;

public class RegistrationHandler
{
    private readonly IMerchantRepository _merchantRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IEmailVerificationService _emailVerificationService;

    public RegistrationHandler(
        IMerchantRepository merchantRepository,
        IPasswordHasher passwordHasher,
        IEmailVerificationService emailVerificationService
    )
    {
        _merchantRepository = merchantRepository;
        _passwordHasher = passwordHasher;
        _emailVerificationService = emailVerificationService;
    }

    public async Task<RegisterMerchantResultDto> HandleAsync(
        RegisterMerchantCommand command,
        CancellationToken ct = default
    )
    {
        var exists = await _merchantRepository.ExistsByEmailAsync(command.Email, ct);
        if (exists)
        {
            throw new InvalidOperationException("A merchant with this email already exists");
        }

        var passwordHash = _passwordHasher.HashPassword(command.RawPassword);

        var merchant = Merchant.CreateNew(
            command.Email,
            passwordHash,
            command.LegalName,
            command.Phone,
            command.Country
        );

        string token = merchant.Auth.GenerateEmailVerificationToken();

        await _merchantRepository.AddAsync(merchant, ct);
        await _merchantRepository.SaveChangesAsync(ct);

        await _emailVerificationService.SendAsync(merchant.Email, token, ct);

        return new RegisterMerchantResultDto(merchant.Id, merchant.Email, merchant.LegalName);
    }
}
