namespace Garnet.Services.Auth.Domain.Aggregates.UserAggregate;

public class User
{
    public Guid Id { get; private set; }
    public string Email { get; private set; } = string.Empty;
    public string PasswordHash { get; private set; } = string.Empty;
    public string FullName { get; private set; } = string.Empty;
    public bool MfaEnabled { get; private set; }
    public DateTime CreatedAt { get; private set; }

    public User(Guid id, string email, string passwordHash, string fullName)
    {
        Id = id;
        Email = email;
        PasswordHash = passwordHash;
        FullName = fullName;
        CreatedAt = DateTime.UtcNow;
    }
}
