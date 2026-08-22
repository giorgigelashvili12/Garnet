namespace Garnet.Libs.PaymentDomain.Events;

public record PaymentCreatedEvent(Guid PaymentId, decimal Amount, string Currency, DateTime CreatedAtUtc);
