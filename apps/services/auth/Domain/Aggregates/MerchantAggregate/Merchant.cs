namespace Garnet.Services.Auth.Domain.Aggregates.MerchantAggregate;

using Garnet.Services.Auth.Domain.Aggregates.MerchantAggregate.Enums;

public class Merchant
{
    public Guid Id { get; private set; }
    public string Email { get; private set; } = string.Empty;
    public string LegalName { get; private set; } = string.Empty;
    public string Phone { get; private set; } = string.Empty;
    public string Country { get; private set; } = string.Empty;
    public MerchantStatus Status { get; private set; } = MerchantStatus.Pending;
    public List<string> Accounts { get; private set; } = new();
    public decimal Credit { get; private set; } = 0;
    public decimal AICredit { get; private set; } = 1000;
    public SubscriptionEnum Subscription { get; private set; } = SubscriptionEnum.Free;
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    public MerchantAuth Auth { get; private set; } = null!;
    public MerchantConfiguration Config { get; private set; } = null!;
    public ICollection<MerchantDocument> Documents { get; private set; } = new List<MerchantDocument>();

    private Merchant() { } // EF Core

    public static Merchant CreateNew(
        string email,
        string passwordHash,
        string legalName,
        string phone,
        string country
    )
    {
        var merchantId = Guid.NewGuid();

        var merchant = new Merchant
        {
            Id = merchantId,
            Email = email.ToLowerInvariant().Trim(),
            LegalName = legalName,
            Phone = phone,
            Country = country,
            CreatedAt = DateTime.UtcNow
        };

        merchant.Auth = new MerchantAuth(merchantId, passwordHash);
        merchant.Config = new MerchantConfiguration(merchantId);

        return merchant;
    }
}
