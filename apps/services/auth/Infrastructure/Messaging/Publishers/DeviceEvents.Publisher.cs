using Garnet.Services.Auth.Domain.Events;

namespace Garnet.Services.Auth.Infrastructure.Messaging.Publishers;

public class DeviceEventsPublisher
{
    public async Task PublishDeviceChallengedAsync(DeviceChallengedEvent domainEvent)
    {
        await Task.Yield();
        // Publish event to message broker
    }
}
