using Garnet.Services.Auth.Application.Commands.Devices;

namespace Garnet.Services.Auth.Application.Handlers.Devices;

public class RegisterDeviceHandler
{
    public async Task<Guid> HandleAsync(RegisterDeviceCommand command, CancellationToken cancellationToken = default)
    {
        // Handling logic: register new trusted device
        await Task.Yield();
        return Guid.NewGuid();
    }
}
