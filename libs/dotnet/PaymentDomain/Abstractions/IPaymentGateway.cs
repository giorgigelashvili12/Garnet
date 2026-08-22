using Garnet.Libs.PaymentDomain.Abstractions.Models;

namespace Garnet.Libs.PaymentDomain.Abstractions;

public interface IPaymentGateway
{
    Task<BaseGatewayResponse> ProcessPaymentAsync(BaseGatewayRequest request, CancellationToken cancellationToken = default);
    Task<BaseGatewayResponse> RefundPaymentAsync(string gatewayTransactionId, decimal amount, CancellationToken cancellationToken = default);
}
