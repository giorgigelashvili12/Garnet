namespace Garnet.Services.Auth.Domain.Aggregates.UserAggregate;

public class MfaDetails
{
    public string SecretKey { get; private set; } = string.Empty;
    public bool IsEnabled { get; private set; }
    public List<string> BackupCodes { get; private set; } = new();

    public MfaDetails(string secretKey, bool isEnabled, List<string> backupCodes)
    {
        SecretKey = secretKey;
        IsEnabled = isEnabled;
        BackupCodes = backupCodes;
    }
}
