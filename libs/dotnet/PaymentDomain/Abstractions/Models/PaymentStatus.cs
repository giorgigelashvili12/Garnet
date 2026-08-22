namespace Garnet.Libs.PaymentDomain.Abstractions.Models;

public enum PaymentStatus
{
    Pending,
    Processing,
    Authorized,
    Completed,
    Failed,
    Cancelled,
    Refunded
}
