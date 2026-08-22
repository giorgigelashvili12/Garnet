using Garnet.Libs.PaymentDomain.Abstractions.Models;
using Garnet.Libs.PaymentDomain.Events;
using Garnet.Libs.PaymentDomain.ValueObjects;

namespace Garnet.Libs.PaymentDomain.Aggregates.PaymentAggregate;

public class Payment : AggregateRoot
{
    public Money Amount { get; private set; }
    public PaymentStatus Status { get; private set; }
    public DateTime CreatedAtUtc { get; private set; }

    public Payment(Guid id, Money amount)
    {
        Id = id;
        Amount = amount;
        Status = PaymentStatus.Pending;
        CreatedAtUtc = DateTime.UtcNow;

        AddDomainEvent(new PaymentCreatedEvent(Id, Amount.Amount, Amount.Currency.Code, CreatedAtUtc));
    }

    public void MarkAsSucceeded(string gatewayTnxId)
    {
        Status = PaymentStatus.Completed;
        AddDomainEvent(new PaymentSucceededEvent(Id, gatewayTnxId, DateTime.UtcNow));
    }

    public void MarkAsFailed(string reason)
    {
        Status = PaymentStatus.Failed;
        AddDomainEvent(new PaymentFailedEvent(Id, reason, DateTime.UtcNow));
    }
}
