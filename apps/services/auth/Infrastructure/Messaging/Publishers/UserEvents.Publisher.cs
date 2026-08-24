// using Confluent.Kafka;
// using Garnet.Services.Auth.Domain.Events;
// using Microsoft.Extensions.Configuration;
// using System.Text.Json;

// namespace Garnet.Services.Auth.Infrastructure.Messaging.Publishers;

// public class UserEventsPublisher
// {
//     private readonly IProducer<string, string> _producer;
//     private readonly string _topic;

//     public UserEventsPublisher(IConfiguration configuration)
//     {
//         var bootstrapServers = configuration["Kafka:BootstrapServers"] ?? "localhost:9092";
//         _topic = configuration["Kafka:AuthEventsTopic"] ?? "garnet.auth.events";

//         var config = new ProducerConfig
//         {
//             BootstrapServers = bootstrapServers,
//             ClientId = "auth-service-publisher"
//         };

//         _producer = new ProducerBuilder<string, string>(config).Build();
//     }

//     public async Task PublishUserRegisteredAsync(UserRegisteredEvent domainEvent, CancellationToken ct = default)
//     {
//         var messageValue = JsonSerializer.Serialize(domainEvent);

//         var message = new Message<string, string>
//         {
//             Key = domainEvent.UserId.ToString(),
//             Value = messageValue
//         };

//         await _producer.ProduceAsync(_topic, message, ct);
//     }
// }
using Garnet.Libs.InfraCommon.Messaging;
using Garnet.Libs.SharedKernel.Events;
using Garnet.Libs.SharedKernel.Events.Auth;

namespace Garnet.Services.Auth.Infrastructure.Messaging.Publishers;

public class UserEventsPublisher
{
    private readonly IEventBus _eventBus;

    public UserEventsPublisher(IEventBus eventBus)
    {
        _eventBus = eventBus;
    }

    public async Task PublishUserRegisteredAsync(UserRegisteredEvent domainEvent, CancellationToken ct = default)
    {
        await _eventBus.PublishAsync(
            topic: EventTopics.AuthEvents, 
            partitionKey: domainEvent.UserId.ToString(), 
            @event: domainEvent, 
            ct: ct
        );
    }
}
