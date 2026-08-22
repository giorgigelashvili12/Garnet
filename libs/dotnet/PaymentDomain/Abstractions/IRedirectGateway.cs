using Garnet.Libs.PaymentDomain.Abstractions.Models;

namespace Garnet.Libs.PaymentDomain.Abstractions;

public interface IRedirectGateway : IPaymentGateway
{
    Task<string> GetRedirectUrlAsync(BaseGatewayRequest request, string callbackUrl, CancellationToken cancellationToken = default);
}
