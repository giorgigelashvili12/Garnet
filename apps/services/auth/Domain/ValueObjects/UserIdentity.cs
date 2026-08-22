namespace Garnet.Services.Auth.Domain.ValueObjects;

public record UserIdentityValueObject(Guid UserId, string Email, string Provider);
