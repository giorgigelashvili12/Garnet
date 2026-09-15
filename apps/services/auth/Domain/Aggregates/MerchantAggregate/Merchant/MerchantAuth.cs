namespace Garnet.Services.Auth.Domain.Aggregates.MerchantAggregate;

using System.Security.Cryptography;
using Garnet.Services.Auth.Domain.Events;

public class MerchantAuth
{
    public Guid MerchantId { get; private set; }
    public string PasswordHash { get; private set; } = string.Empty;
    public string Passkey { get; private set; } = string.Empty;

    public string TestKey { get; private set; } = string.Empty;
    public string ProdKey { get; private set; } = string.Empty;

    public List<string> BackupEmails { get; private set; } = new();
    public bool EmailVerified { get; internal set; }
    public string? EmailVerificationToken { get; private set; }
    public DateTime? EmailVerificationTokenExpiry { get; private set; }
    public bool IsLocked => LockedOutUntil.HasValue && LockedOutUntil.Value > DateTime.UtcNow;
    public DateTime? LockedOutUntil { get; private set; } = null;
    public string? OAuthId { get; private set; }
    public string? OAuthProvider { get; private set; }
    public bool MfaEnabled { get; private set; } = false;
    public string? MfaSecret { get; private set; }
    public List<string> BackupCodes { get; private set; } = new();

    private const int MaxFailedAttempts = 5;
    private static readonly TimeSpan LockoutDuration = TimeSpan.FromMinutes(15);
    public int AccessFailedCount { get; private set; }

    private readonly List<IDomainEvent> _domainEvents = new();
    public IReadOnlyCollection<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();

    private MerchantAuth() { } // EF Core

    public MerchantAuth(Guid merchantId, string passwordHash)
    {
        MerchantId = merchantId;
        PasswordHash = passwordHash;
        TestKey = GenerateApiKey("sk_test_");
        ProdKey = GenerateApiKey("sk_live_");
    }

    public void RegenerateSecretKey()
    {
        TestKey = GenerateApiKey("sk_test_");
        ProdKey = GenerateApiKey("sk_live_");
    }

    public void RegenerateTestKey() => TestKey = GenerateApiKey("sk_test_");
    public void RegenerateProdKey() => ProdKey = GenerateApiKey("sk_live_");

    private static string GenerateApiKey(string prefix)
    {
        byte[] bytes = new byte[32];
        RandomNumberGenerator.Fill(bytes);
        return $"{prefix}{Convert.ToHexString(bytes).ToLowerInvariant()}";
    }

    public void RegisterFailedLogin()
    {
        AccessFailedCount++;

        if (AccessFailedCount >= MaxFailedAttempts)
        {
            LockedOutUntil = DateTime.UtcNow;
            LockedOutUntil = LockedOutUntil.Value.Add(LockoutDuration);

            _domainEvents.Add(new AccountLockedDomainEvent(MerchantId, DateTime.UtcNow));
        }
    }

    public void ResetLockout()
    {
        AccessFailedCount = 0;
        LockedOutUntil = null;
    }

    public void LinkOAuth(string provider, string providerId)
    {
        OAuthProvider = provider;
        OAuthId = providerId;
    }

    public void EnableMfa(string secret, List<string> backupCodes)
    {
        MfaSecret = secret;
        BackupCodes = backupCodes;
        MfaEnabled = true;
    }

    public void ClearDomainEvents() => _domainEvents.Clear();

    public string GenerateEmailVerificationToken(TimeSpan? lifetime = null)
    {
        var token = Convert.ToHexString(RandomNumberGenerator.GetBytes(24));
        
        EmailVerificationToken = token;
        EmailVerificationTokenExpiry = DateTime.UtcNow.Add(lifetime ?? TimeSpan.FromHours(24));
        EmailVerified = false;

        return token;
    }
}
