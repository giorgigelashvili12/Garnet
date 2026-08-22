namespace Garnet.Services.Auth.Domain.Aggregates.DeviceAggregate;

public class DeviceSession
{
    public Guid Id { get; private set; }
    public Guid DeviceId { get; private set; }
    public string RefreshTokenHash { get; private set; } = string.Empty;
    public string IpAddress { get; private set; } = string.Empty;
    public DateTime ExpiresAt { get; private set; }
    public DateTime LastActiveAt { get; private set; }

    public DeviceSession(Guid id, Guid deviceId, string refreshTokenHash, string ipAddress, DateTime expiresAt)
    {
        Id = id;
        DeviceId = deviceId;
        RefreshTokenHash = refreshTokenHash;
        IpAddress = ipAddress;
        ExpiresAt = expiresAt;
        LastActiveAt = DateTime.UtcNow;
    }
}
