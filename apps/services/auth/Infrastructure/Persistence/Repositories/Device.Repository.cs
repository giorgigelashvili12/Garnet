using Garnet.Services.Auth.Domain.Aggregates.DeviceAggregate;
using Garnet.Services.Auth.Domain.Repositories;

namespace Garnet.Services.Auth.Infrastructure.Persistence.Repositories;

public class DeviceRepository : IDeviceRepository
{
    public async Task<Device?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        await Task.Yield();
        return null;
    }

    public async Task<IEnumerable<Device>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        await Task.Yield();
        return Enumerable.Empty<Device>();
    }

    public async Task AddAsync(Device device, CancellationToken cancellationToken = default)
    {
        await Task.Yield();
    }
}
