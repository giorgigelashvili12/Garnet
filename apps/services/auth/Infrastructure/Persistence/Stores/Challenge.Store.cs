namespace Garnet.Services.Auth.Infrastructure.Persistence.Stores;

public class ChallengeStore
{
    public async Task StoreChallengeAsync(Guid deviceId, string nonce, TimeSpan expiry)
    {
        await Task.Yield();
    }

    public async Task<bool> ValidateChallengeAsync(Guid deviceId, string nonce)
    {
        await Task.Yield();
        return true;
    }
}
