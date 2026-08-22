namespace Garnet.Services.Auth.Infrastructure.External.OAuth;

public class GoogleOAuthProvider
{
    public async Task<OAuthUserInfo> AuthenticateCodeAsync(string authCode)
    {
        await Task.Yield();
        return new OAuthUserInfo("google-12345", "user@gmail.com", "Google User");
    }
}

public record OAuthUserInfo(string ProviderId, string Email, string Name);
