using Garnet.Services.Auth.Domain.Aggregates.UserAggregate;
using Garnet.Services.Auth.Domain.Repositories;

namespace Garnet.Services.Auth.Infrastructure.Persistence.Repositories;

public class UserRepository : IUserRepository
{
    public async Task<User?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        await Task.Yield();
        return null;
    }

    public async Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        await Task.Yield();
        return null;
    }

    public async Task AddAsync(User user, CancellationToken cancellationToken = default)
    {
        await Task.Yield();
    }

    public async Task UpdateAsync(User user, CancellationToken cancellationToken = default)
    {
        await Task.Yield();
    }
}
