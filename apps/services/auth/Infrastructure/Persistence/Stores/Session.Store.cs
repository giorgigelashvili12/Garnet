using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace Garnet.Services.Auth.Infrastructure.Persistence.Stores;

public class SessionStore
{
    private readonly IDistributedCache _cache;

    public SessionStore(IDistributedCache cache)
    {
        _cache = cache;
    }

    public async Task SaveSessionAsync<T>(string sessionKey, T sessionData, TimeSpan ttl, CancellationToken ct = default)
    {
        var options = new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = ttl
        };

        var json = JsonSerializer.Serialize(sessionData);
        await _cache.SetStringAsync(sessionKey, json, options, ct);
    }

    public async Task<T?> GetSessionAsync<T>(string sessionKey, CancellationToken ct = default)
    {
        var json = await _cache.GetStringAsync(sessionKey, ct);
        if (string.IsNullOrEmpty(json)) return default;

        return JsonSerializer.Deserialize<T>(json);
    }

    public async Task RemoveSessionAsync(string sessionKey, CancellationToken ct = default)
    {
        await _cache.RemoveAsync(sessionKey, ct);
    }
}
