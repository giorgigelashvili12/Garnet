using Garnet.Libs.PaymentDomain.Abstractions;
using Garnet.Libs.PaymentDomain.Abstractions.Models;

namespace Garnet.Libs.PaymentDomain.Providers.TBC;

/// <summary>
/// TBC Bank Payment Gateway implementation template.
/// </summary>
public class TbcPaymentGateway : IRedirectGateway
{
    public async Task<BaseGatewayResponse> ProcessPaymentAsync(BaseGatewayRequest request, CancellationToken cancellationToken = default)
    {
        await Task.Yield();
        return new BaseGatewayResponse(true, $"TBC-{Guid.NewGuid():N}", PaymentStatus.Completed, null, DateTime.UtcNow);
    }

    public async Task<BaseGatewayResponse> RefundPaymentAsync(string gatewayTransactionId, decimal amount, CancellationToken cancellationToken = default)
    {
        await Task.Yield();
        return new BaseGatewayResponse(true, gatewayTransactionId, PaymentStatus.Refunded, null, DateTime.UtcNow);
    }

    public async Task<string> GetRedirectUrlAsync(BaseGatewayRequest request, string callbackUrl, CancellationToken cancellationToken = default)
    {
        await Task.Yield();
        return $"https://ecom.tbcbank.ge/checkout?payId={request.TransactionId}";
    }
}
