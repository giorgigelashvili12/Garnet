using Garnet.Libs.PaymentDomain.Abstractions;
using Garnet.Libs.PaymentDomain.Abstractions.Models;

namespace Garnet.Libs.PaymentDomain.Providers.BOG;

public class BogPaymentGateway : IRedirectGateway
{
    public async Task<BaseGatewayResponse> ProcessPaymentAsync(BaseGatewayRequest request, CancellationToken cancellationToken = default)
    {
        await Task.Yield();
        return new BaseGatewayResponse(true, $"BOG-{Guid.NewGuid():N}", PaymentStatus.Completed, null, DateTime.UtcNow);
    }

    public async Task<BaseGatewayResponse> RefundPaymentAsync(string gatewayTransactionId, decimal amount, CancellationToken cancellationToken = default)
    {
        await Task.Yield();
        return new BaseGatewayResponse(true, gatewayTransactionId, PaymentStatus.Refunded, null, DateTime.UtcNow);
    }

    public async Task<string> GetRedirectUrlAsync(BaseGatewayRequest request, string callbackUrl, CancellationToken cancellationToken = default)
    {
        await Task.Yield();
        return $"https://ecommerce.ufc.ge/eCommerce/bog_checkout?order_id={request.TransactionId}";
    }
}
