namespace Garnet.Libs.PaymentDomain.Abstractions.Models;

public record BaseGatewayResponse(
    bool IsSuccess,
    string GatewayTransactionId,
    PaymentStatus Status,
    string? ErrorMessage,
    DateTime ProcessedAtUtc
);
