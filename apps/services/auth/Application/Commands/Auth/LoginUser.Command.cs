namespace Garnet.Services.Auth.Application.Commands.Auth;

public record LoginUserCommand(
    string Email,
    string Password,
    LoginMeta? Meta
);

public record LoginMeta(
    string? Ip,
    string? UserAgent,
    string? Fingerprint
);
