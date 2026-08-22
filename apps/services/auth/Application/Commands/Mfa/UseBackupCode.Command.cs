namespace Garnet.Services.Auth.Application.Commands.Mfa;

public record UseBackupCodeCommand(Guid UserId, string BackupCode);
