namespace Garnet.Services.Auth.Application.Commands.Auth;

public record UpdateProfileCommand(
    Guid UserId,
    string Phone,
    string LegalName
);

public record UpdateProfileRes(
    string Status,
    string Message
);
