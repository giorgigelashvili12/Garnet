namespace Garnet.Libs.InfraCommon.Messaging;

public interface IEventBus
{
    Task PublishAsync<T>(string topic, string partitionKey, T @event, CancellationToken ct = default) where T : class;
}
