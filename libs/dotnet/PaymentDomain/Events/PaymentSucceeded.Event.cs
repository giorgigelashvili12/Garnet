namespace Garnet.Libs.PaymentDomain.Events;

public record PaymentSucceededEvent(Guid PaymentId, string GatewayTransactionId, DateTime CompletedAtUtc);
