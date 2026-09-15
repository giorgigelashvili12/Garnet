namespace Garnet.Services.Auth.Infrastructure.External.OAuth;

using Garnet.Services.Auth.Application.Interfaces;

public class OAuthService : IOAuthService
{
    private readonly GoogleOAuthProvider _googleProvider;

    public OAuthService(GoogleOAuthProvider googleProvider)
    {
        _googleProvider = googleProvider;
    }

    public async Task<OAuthUserProfile> AuthCodeAsync(string provider, string code, CancellationToken ct = default)
    {
        return provider.ToUpperInvariant() switch
        {
            "GOOGLE" => await _googleProvider.ProfileAsync(code, ct),
            _ => throw new NotSupportedException($"OAuth provider '{provider}' not supported")
        };
    }
}
