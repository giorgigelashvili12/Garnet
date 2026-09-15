namespace Garnet.Services.Auth.Application.Interfaces;

public record OAuthUserProfile(
    string Email,
    string ProviderId,
    string Provider, // google / github
    string? Name
);

public interface IOAuthService
{
    Task<OAuthUserProfile> AuthCodeAsync(string provider, string code, CancellationToken ct = default);
}
