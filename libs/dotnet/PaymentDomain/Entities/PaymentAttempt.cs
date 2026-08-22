using Garnet.Libs.PaymentDomain.Abstractions.Models;

namespace Garnet.Libs.PaymentDomain.Entities;

public class PaymentAttempt
{
    public Guid Id { get; private set; }
    public Guid PaymentId { get; private set; }
    public string ProviderName { get; private set; } = string.Empty;
    public PaymentStatus Status { get; private set; }
    public string? ErrorDetails { get; private set; }
    public DateTime AttemptedAtUtc { get; private set; }

    public PaymentAttempt(Guid id, Guid paymentId, string providerName)
    {
        Id = id;
        PaymentId = paymentId;
        ProviderName = providerName;
        Status = PaymentStatus.Processing;
        AttemptedAtUtc = DateTime.UtcNow;
    }
}
