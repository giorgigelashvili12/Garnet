namespace Garnet.Services.Auth.Domain.ValueObjects;

public record LoginResonse(
    string? AccessToken = null,
    string? RefreshToken = null,
    long? ExpiresIn = null,
    bool MfaRequired = false,
    string? MfaToken = null
);
