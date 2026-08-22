namespace Garnet.Services.Auth.Application.Commands.Devices;

public record DeleteDeviceCommand(Guid DeviceId, Guid UserId);
