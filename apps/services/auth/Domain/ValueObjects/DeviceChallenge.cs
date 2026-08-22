namespace Garnet.Services.Auth.Domain.ValueObjects;

public record DeviceChallengeValueObject(string Nonce, DateTime ExpiresAt);
