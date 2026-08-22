using Garnet.Services.Auth.Domain.Events;

namespace Garnet.Services.Auth.Infrastructure.Messaging.Publishers;

public class UserEventsPublisher
{
    public async Task PublishUserRegisteredAsync(UserRegisteredEvent domainEvent)
    {
        await Task.Yield();
        // Publish event to message broker
    }
}
