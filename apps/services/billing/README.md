# Billing Service

The **Billing Service** handles merchant invoices, subscription plans, recurring billing schedules, and ledger synchronization.

---

## Directory Structure

```plaintext
billing/
├── Api/
│   ├── Controllers/
│   │   └── BillingController.cs    # Invoicing and subscription endpoints
│   └── Program.cs                  # Web API entrypoint
├── Application/
│   └── IBillingService.cs          # Invoice generation and payment processing contracts
├── Domain/
│   └── Invoice.cs                  # Billing aggregate root, line items, and invoice status
└── Infrastructure/
    └── BillingDbContext.cs         # Database mapping for billing records
```

---

## Code Examples

### 1. Domain Aggregate (`Domain/Invoice.cs`)

```csharp
namespace Garnet.Services.Billing.Domain;

public class Invoice
{
    public Guid Id { get; private set; }
    public Guid MerchantId { get; private set; }
    public decimal TotalAmount { get; private set; }
    public string Status { get; private set; } = "Draft";

    public Invoice(Guid id, Guid merchantId, decimal totalAmount)
    {
        Id = id;
        MerchantId = merchantId;
        TotalAmount = totalAmount;
    }
}
```

### 2. Application Service Interface (`Application/IBillingService.cs`)

```csharp
namespace Garnet.Services.Billing.Application;

public interface IBillingService
{
    Task<InvoiceDto> CreateInvoiceAsync(Guid merchantId, decimal amount, CancellationToken cancellationToken = default);
}

public record InvoiceDto(Guid Id, Guid MerchantId, decimal TotalAmount, string Status);
```
