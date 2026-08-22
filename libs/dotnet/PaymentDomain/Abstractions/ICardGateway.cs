using Garnet.Libs.PaymentDomain.Abstractions.Models;

namespace Garnet.Libs.PaymentDomain.Abstractions;

public interface ICardGateway : IPaymentGateway
{
    Task<BaseGatewayResponse> AuthorizeCardAsync(string cardToken, decimal amount, CancellationToken cancellationToken = default);
}
