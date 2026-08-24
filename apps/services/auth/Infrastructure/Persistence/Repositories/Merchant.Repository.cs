using Garnet.Services.Auth.Domain.Aggregates.MerchantAggregate;
using Garnet.Services.Auth.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Garnet.Services.Auth.Infrastructure.Persistence.Repositories;

public class MerchantRepository : IMerchantRepository
{
    private readonly AuthDbContext _dbContext;

    public MerchantRepository(AuthDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Merchant?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await _dbContext.Merchants
            .FirstOrDefaultAsync(m => m.Id == id, cancellationToken);
    }

    public async Task<Merchant?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        var normalizedEmail = email.ToLowerInvariant().Trim();

        return await _dbContext.Merchants
            .FirstOrDefaultAsync(m => m.Email == normalizedEmail, cancellationToken);
    }

    public async Task<bool> ExistsByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        var normalizedEmail = email.ToLowerInvariant().Trim();
        return await _dbContext.Merchants.AnyAsync(m => m.Email == normalizedEmail, cancellationToken);
    }

    public async Task AddAsync(Merchant merchant, CancellationToken cancellationToken = default)
    {
        await _dbContext.Merchants.AddAsync(merchant, cancellationToken);
    }

    public void Update(Merchant merchant)
    {
        _dbContext.Merchants.Update(merchant);
    }

    public async Task SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
