namespace Garnet.Libs.PaymentDomain;

public record PaymentTransaction(
    Guid TransactionId,
    Guid MerchantId,
    decimal Amount,
    string Currency,
    string Status,
    DateTime CreatedAtUtc
);
