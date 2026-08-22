using Garnet.Libs.PaymentDomain.Abstractions;
using Garnet.Libs.PaymentDomain.Abstractions.Models;

namespace Garnet.Libs.PaymentDomain.Providers.Credo;

public class CredoPaymentGateway : IPaymentGateway
{
    public async Task<BaseGatewayResponse> ProcessPaymentAsync(BaseGatewayRequest request, CancellationToken cancellationToken = default)
    {
        await Task.Yield();
        return new BaseGatewayResponse(true, $"CREDO-{Guid.NewGuid():N}", PaymentStatus.Completed, null, DateTime.UtcNow);
    }

    public async Task<BaseGatewayResponse> RefundPaymentAsync(string gatewayTransactionId, decimal amount, CancellationToken cancellationToken = default)
    {
        await Task.Yield();
        return new BaseGatewayResponse(true, gatewayTransactionId, PaymentStatus.Refunded, null, DateTime.UtcNow);
    }
}
