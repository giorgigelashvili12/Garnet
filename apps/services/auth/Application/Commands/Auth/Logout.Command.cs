namespace Garnet.Services.Auth.Application.Commands.Auth;

public record LogoutCommand(
    string RefreshToken
);

public record LogoutResultDto(
    string Status,
    string Message
);
