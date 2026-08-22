namespace Garnet.Services.Auth.Infrastructure.Persistence.Stores;

public class SessionStore
{
    public async Task SaveSessionAsync(string sessionKey, string sessionData, TimeSpan ttl)
    {
        await Task.Yield();
    }

    public async Task<string?> GetSessionAsync(string sessionKey)
    {
        await Task.Yield();
        return null;
    }
}
