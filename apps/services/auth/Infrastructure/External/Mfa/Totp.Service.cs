namespace Garnet.Services.Auth.Infrastructure.External.Mfa;

public class TotpService
{
    public string GenerateSecretKey() => "JBSWY3DPEHPK3PXP";

    public bool ValidateCode(string secretKey, string code)
    {
        return !string.IsNullOrWhiteSpace(code) && code.Length == 6;
    }
}
