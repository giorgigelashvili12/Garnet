using Garnet.Services.Auth.Domain.Aggregates.MerchantAggregate;

namespace Garnet.Services.Auth.Domain.Repositories;

public interface IMerchantRepository
{
    Task<Merchant?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<Merchant?> GetByEmailAsync(string email, CancellationToken cancellationToken = default);
    Task<bool> ExistsByEmailAsync(string email, CancellationToken cancellationToken = default);

    Task AddAsync(Merchant merchant, CancellationToken cancellationToken = default);
    Task UpdateAsync(Merchant merchant, CancellationToken cancellationToken = default);
    void Update(Merchant merchant);

    Task<Merchant?> GetByRefreshTokenAsync(string tokenHash, CancellationToken ct = default);

    Task SaveChangesAsync(CancellationToken cancellationToken = default);
}
