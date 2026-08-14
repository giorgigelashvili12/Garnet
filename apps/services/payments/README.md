# Payments Service

The **Payments Service** is the central transaction processing microservice. It manages payment authorization, capture, refunds, payment gateway routing (Stripe, Adyen, PayPal), and payment state transitions.

---

## Directory Structure

```plaintext
payments/
├── Api/
│   ├── Controllers/
│   │   └── PaymentsController.cs   # Payment processing & refund endpoints
│   └── Program.cs                  # Web API entrypoint
├── Application/
│   └── IPaymentService.cs          # Payment execution, authorization & refund contracts
├── Domain/
│   └── Payment.cs                  # Payment aggregate root, state machine, and domain events
└── Infrastructure/
    └── PaymentsDbContext.cs        # Payment transaction store and gateway integrations
```

---

## Code Examples

### 1. Domain Aggregate (`Domain/Payment.cs`)

```csharp
namespace Garnet.Services.Payments.Domain;

public class Payment
{
    public Guid Id { get; private set; }
    public decimal Amount { get; private set; }
    public string Currency { get; private set; } = "USD";
    public string Status { get; private set; } = "Pending";

    public Payment(Guid id, decimal amount, string currency)
    {
        Id = id;
        Amount = amount;
        Currency = currency;
    }

    public void Authorize()
    {
        Status = "Authorized";
    }
}
```

### 2. Application Service Interface (`Application/IPaymentService.cs`)

```csharp
namespace Garnet.Services.Payments.Application;

public interface IPaymentService
{
    Task<PaymentResultDto> AuthorizePaymentAsync(Guid paymentId, decimal amount, string currency, CancellationToken cancellationToken = default);
}

public record PaymentResultDto(Guid Id, bool Success, string Status);
```
