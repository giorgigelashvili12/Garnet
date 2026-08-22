namespace Garnet.Services.Auth.Domain.Events;

public record DeviceChallengedEvent(Guid DeviceId, string Nonce, DateTime IssuedAt);
