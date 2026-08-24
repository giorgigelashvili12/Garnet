namespace Garnet.Services.Auth.Domain.Events;

public record MfaEnabledEvent(Guid UserId, DateTime EnabledAt, Dictionary<string, object> Metadata) : IntegrationEvent;
