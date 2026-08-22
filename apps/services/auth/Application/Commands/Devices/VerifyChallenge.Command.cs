namespace Garnet.Services.Auth.Application.Commands.Devices;

public record VerifyChallengeCommand(Guid DeviceId, string SignedNonce);
