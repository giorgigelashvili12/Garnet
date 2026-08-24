namespace Garnet.Libs.SharedKernel.Events.Auth;

using Garnet.Libs.SharedKernel.Events;

public record AccountLockedEvent(
    Guid MerchantId,
    DateTime LockedUntil,
    Dictionary<string, object> Metadata
) : IntegrationEvent;
