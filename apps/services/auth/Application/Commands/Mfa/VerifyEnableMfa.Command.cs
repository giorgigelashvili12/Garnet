namespace Garnet.Services.Auth.Application.Commands.Mfa;

public record VerifyEnableMfaCommand(Guid UserId, string SetupCode);
