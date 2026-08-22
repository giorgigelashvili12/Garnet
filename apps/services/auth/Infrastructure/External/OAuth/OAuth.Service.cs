namespace Garnet.Services.Auth.Infrastructure.External.OAuth;

public class OAuthService
{
    public async Task<OAuthUserInfo> ProcessCallbackAsync(string provider, string code)
    {
        await Task.Yield();
        return new OAuthUserInfo("ext-id-999", "user@provider.com", "External User");
    }
}
