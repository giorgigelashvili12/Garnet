namespace Garnet.Services.Auth.Application.Commands.Auth;

public record ResetPasswordCommand(string Token, string NewPassword);
