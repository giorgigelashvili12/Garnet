# LedgerDomain Library

The **LedgerDomain** shared library provides double-entry accounting data contracts, journal entry primitives, and financial ledger models across all .NET services.

---

## Directory Structure

```plaintext
LedgerDomain/
├── README.md                       # Documentation & ledger entry examples
└── LedgerEntry.cs                  # Double-entry ledger record definition
```

---

## Code Examples

### 1. Double-Entry Ledger Model (`LedgerEntry.cs`)

```csharp
namespace Garnet.Libs.LedgerDomain;

public record LedgerEntry(
    Guid Id,
    Guid TransactionId,
    string AccountNumber,
    decimal DebitAmount,
    decimal CreditAmount,
    string Currency,
    DateTime Timestamp
);
```
