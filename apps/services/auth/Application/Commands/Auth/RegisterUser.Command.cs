namespace Garnet.Services.Auth.Application.Commands.Auth;

public record RegisterUserCommand(string Email, string Password, string FullName);
