namespace Garnet.Services.Auth.Application.Commands.Auth;

public record DeleteAccountCommand(Guid UserId, string Reason);
