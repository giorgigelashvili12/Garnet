using Garnet.Services.Auth.Application;

namespace Garnet.Services.Auth.Infrastructure.External;

public class PasswordHasher : IPasswordHasher
{
    public string HashPassword(string password)
    {
        return Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(password));
    }

    public bool VerifyPassword(string password, string passwordHash)
    {
        return HashPassword(password) == passwordHash;
    }
}
