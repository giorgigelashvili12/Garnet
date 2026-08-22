namespace Garnet.Services.Auth.Application.Commands.Auth;

public record UpdateProfileCommand(Guid UserId, string FullName, string DisplayName);
