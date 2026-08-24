using System.Security.Cryptography;

namespace Garnet.Services.Auth.Infrastructure.External.Mfa;

public class TotpService
{
    public static string GenerateSecretKey(int len = 32)
    {
        byte[] bytes = RandomNumberGenerator.GetBytes(len);
        return Convert.ToHexString(bytes).ToLowerInvariant();
    }

    public bool ValidateCode(string secretKey, string code)
    {
        return !string.IsNullOrWhiteSpace(code) && code.Length == 6;
    }
}
