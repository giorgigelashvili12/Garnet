namespace Garnet.Libs.SharedKernel.Events.Auth;

public record UserRegisteredEvent(
    Guid UserId,
    string Email,
    string Username,
    Dictionary<string, object> Metadata
) : IntegrationEvent;
