namespace Garnet.Services.Auth.Application.Commands.Devices;

public record RegisterDeviceCommand(Guid UserId, string DeviceName, string Fingerprint);
