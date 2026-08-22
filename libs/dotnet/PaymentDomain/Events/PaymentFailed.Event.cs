namespace Garnet.Libs.PaymentDomain.Events;

public record PaymentFailedEvent(Guid PaymentId, string Reason, DateTime FailedAtUtc);
