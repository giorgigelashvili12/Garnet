namespace Garnet.Services.Auth.Domain.Events;

public record UserRegisteredEvent(Guid UserId, string Email, DateTime RegisteredAt, Dictionary<string, object> Metadata) : IntegrationEvent;
