namespace Garnet.Services.Auth.Domain.Aggregates.MerchantAggregate;

public class MerchantSessions
{
    public Guid MerchantId { get; private set; }
    public string Ip { get; private set; }
    public string UserAgent { get; private set; }
    public string Location { get; private set; }

    public string RefreshTokenHash { get; set; } = string.Empty;
    public bool IsRevoked { get; set; } = false;
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    public DateTime LastUsed { get; private set; } = DateTime.UtcNow;

    public MerchantSessions(Guid merchantId, string refreshTokenHash, string ip, string userAgent, string location)
    {
        Id = Guid.NewGuid();
        MerchantId = merchantId;
        RefreshTokenHash = refreshTokenHash;
        Ip = ip;
        UserAgent = userAgent;
        Location = location;
        CreatedAt = DateTime.UtcNow;
        LastUsed = DateTime.UtcNow;
        IsRevoked = false;
    }
}
