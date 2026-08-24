namespace Garnet.Libs.SharedKernel.Events;

public abstract record IntegrationEvent
{
    public Guid Id {get; init; } = Guid.NewGuid();
    public DateTime OccurredOnUtc {get; init; } = DateTime.UtcNow;
    public Dictionary<string, object> Metadata {get; init;} = new();
}
