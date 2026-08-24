namespace Garnet.Services.Auth.Application.Commands.Auth;

public record RegisterMerchantCommand(
    string Email,
    string RawPassword,
    string LegalName,
    string Phone,
    string Country,
    string ClientIp
);

public record RegisterMerchantResultDto(
    Guid MerchantId,
    string Email,
    string LegalName
);
