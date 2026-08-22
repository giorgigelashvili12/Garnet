namespace Garnet.Services.Auth.Application.Commands.Mfa;

public record ValidateMfaTokenCommand(Guid UserId, string Code);
