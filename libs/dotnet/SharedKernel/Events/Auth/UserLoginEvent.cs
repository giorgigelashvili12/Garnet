namespace Garnet.Libs.SharedKernel.Events.Auth;

using Garnet.Libs.SharedKernel.Events;

public record UserLoginEvent(
    Guid MerchantId,
    DateTime CreatedAt,
    Dictionary<string, object> Metadata
) : IntegrationEvent;
