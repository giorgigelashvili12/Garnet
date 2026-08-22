namespace Garnet.Services.Auth.Domain.Aggregates.DeviceAggregate;

public class Device
{
    public Guid Id { get; private set; }
    public Guid UserId { get; private set; }
    public string DeviceName { get; private set; } = string.Empty;
    public string Fingerprint { get; private set; } = string.Empty;
    public bool IsTrusted { get; private set; }
    public DateTime RegisteredAt { get; private set; }

    public Device(Guid id, Guid userId, string deviceName, string fingerprint)
    {
        Id = id;
        UserId = userId;
        DeviceName = deviceName;
        Fingerprint = fingerprint;
        IsTrusted = true;
        RegisteredAt = DateTime.UtcNow;
    }
}
