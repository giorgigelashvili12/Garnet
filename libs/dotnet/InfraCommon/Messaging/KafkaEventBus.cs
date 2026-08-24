using Cofluent.Kafka;
using System.Text.Json;

namespace Garnet.Libs.InfraCommon.Messaging;

public class KafkaEventBus : IEventBus, IDisposable
{
    private readonly IProducer<string, string> _producer;

    public KafkaEventBus(string bootstrapServers, string clientId)
    {
        var config = new ProducerConfig
        {
            BootstrapServers = bootstrapServers,
            CLientId = clientId,
            Acks = Acks.All,
            EnableIdempotence = true
        };

        _producer = new ProducerBuilder<string, string>(config).Build();
    }

    public async Task PublishAsync<T>(string topic, string partitionKey, T @event, CancellationToken ct = default)
    where T : class
    {
        var jsonValue = JsonSerializer.Serialize(@event);
        var message = new Message<string, string>
        {
            Key = partitionKey,
            Value = jsonValue
        };

        await _producer.ProduceAsync(topic, message, ct);
    }

    public void Dispose() => _producer.Dispose();
}
