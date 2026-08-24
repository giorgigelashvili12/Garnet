namespace Garnet.Services.Auth.Domain.Aggregates.MerchantAggregate;

using Garnet.Services.Auth.Domain.Events;

public class MerchantAuth
{
    public Guid MerchantId { get; private set; }
    public string PasswordHash { get; private set; } = string.Empty;
    public string Passkey { get; private set; } = string.Empty;
    public string? SecretKey { get; private set; }
    public List<string> BackupEmails { get; private set; } = new();
    public bool EmailVerified { get; private set; }
    public string? EmailVerificationToken { get; private set; }
    public long ExpiryDate { get; private set; }
    public bool IsLocked => LockedOutUntil.HasValue && LockedOutUntil.Value > DateTime.UtcNow;
    public DateTime? LockedOutUntil { get; private set; } = null;
    public string? OAuthId { get; private set; }
    public string? OAuthProvider { get; private set; }
    public bool MfaEnabled { get; private set; } = false;
    public string? MfaSecret { get; private set; }
    public List<string> BackupCodes { get; private set; } = new();

    private const int MaxFailedAttempts = 5;
    private static readonly TimeSpan LockoutDuration = TimeSpan.FromMinutes(15);
    public int AccessFaledCount { get; private set; }

    private readonly List<IDomainEvent> _domainEvents = new();
    public IReadOnlyCollection<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();

    private MerchantAuth() { } // EF Core

    public MerchantAuth(Guid merchantId, string passwordHash)
    {
        MerchantId = merchantId;
        PasswordHash = passwordHash;
    }

    public void RegisterFailedLogin()
    {
        AccessFailedCount++;

        if (AccessFailedCount >= MaxFailedAttempts)
        {
            LockedOutUntil = DateTime.UtcNow.Add(LockoutDuration);

            _domainEvents.Add(new AccountLockedDomainEvent(MerchantId, DateTime.UtcNo));
        }
    }

    public void ResetLockout()
    {
        AccessFailedCount = 0;
        LockedOutUntil = null;
    }

    public void EnableMfa(string secret, List<string> backupCodes)
    {
        MfaSecret = secret;
        BackupCodes = backupCodes;
        MfaEnabled = true;
    }

    public void ClearDomainEvents() => _domainEvents.Clear();
}
