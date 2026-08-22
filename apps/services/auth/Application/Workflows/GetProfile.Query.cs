namespace Garnet.Services.Auth.Application.Workflows;

/// <summary>
/// Query to fetch detailed profile information for an authenticated user.
/// </summary>
public record GetProfileQuery(Guid UserId);

public record UserProfileDto(Guid UserId, string Email, string FullName, bool MfaEnabled);
