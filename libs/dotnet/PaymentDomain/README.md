# PaymentDomain Library

The **PaymentDomain** shared library defines shared payment contracts, gateway payload schemas, fee calculation utilities, and transaction state definitions.

---

## Directory Structure

```plaintext
PaymentDomain/
├── README.md                       # Payment contracts guide & examples
└── PaymentTransaction.cs           # Core payment transaction contracts
```

---

## Code Examples

### 1. Payment Transaction Record (`PaymentTransaction.cs`)

```csharp
namespace Garnet.Libs.PaymentDomain;

public record PaymentTransaction(
    Guid TransactionId,
    Guid MerchantId,
    decimal Amount,
    string Currency,
    string Status,
    DateTime CreatedAtUtc
);
```
