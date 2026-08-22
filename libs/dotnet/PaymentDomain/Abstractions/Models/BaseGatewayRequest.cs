using Garnet.Libs.PaymentDomain.ValueObjects;

namespace Garnet.Libs.PaymentDomain.Abstractions.Models;

public record BaseGatewayRequest(
    Guid TransactionId,
    Money Amount,
    string OrderDescription,
    string ReturnUrl
);
