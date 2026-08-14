# SharedKernel

Contains no business logic, no frameworks, db or APIs.

## Aggregates

Provide base types with identity logic and mechanisms to collect internal domain events before commiting them.

Example:

```csharp
public abstract class AggregateRoot<TId> : Entity<TId>
{
    private readonly List<IDomainEvent> _domainEvents = new();

    public IReadOnlyCollection<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();

    protected AggregateRoot(TId id) : base(id) { }

    protected void RaiseDomainEvent(IDomainEvent domainEvent)
    {
        _domainEvents.Add(domainEvent);
    }

    public void ClearDomainEvents()
    {
        _domainEvents.Clear();
    }
}
```

Usage Example:

```csharp
public class Payment : AggregateRoot<Guid>
{
    public Money Amount { get; private set; }
    public PaymentStatus Status { get; private set; }

    public Payment(Guid id, Money amount) : base(id)
    {
        Amount = amount;
        Status = PaymentStatus.Pending;
    }

    public void Authorize()
    {
        Status = PaymentStatus.Authorized;

        RaiseDomainEvent(new PaymentAuthorizedEvent(Id, Amount.Amount, Amount.Currency));
    }
}
```

## Events

Defines the messaging contracts for state changes that occur within any domain

Example:

```csharp
public interface IDomainEvent
{
    Guid Id { get; }
    DateTime OccurredOnUtc { get; }
}
```

```csharp
public record PaymentAuthorizedEvent(
    Guid PaymentId,
    decimal Amount,
    string Currency
) : IDomainEvent
{
    public Guid Id { get; } = Guid.NewGuid();
    public DateTime OccurredOnUtc { get; } = DateTime.UtcNow;
}
```

## Results

Implements the result pattern for functional error handling, instead of throwing C# heavy exceptions for expected domain failures.

Example:

```csharp
public class Result<TValue>
{
    public bool IsSuccess { get; }
    public bool IsFailure => !IsSuccess;
    public TValue? Value { get; }
    public Error Error { get; }

    private Result(TValue value)
    {
        IsSuccess = true;
        Value = value;
        Error = Error.None;
    }

    private Result(Error error)
    {
        IsSuccess = false;
        Value = default;
        Error = error;
    }

    public static Result<TValue> Success(TValue value) => new(value);
    public static Result<TValue> Failure(Error error) => new(error);
}
```

Usage in Domain/Application logic:

```csharp
public Result<Payment> ProcessCapture(Payment payment)
{
    if (payment.Status != PaymentStatus.Authorized)
    {
        return Result<Payment>.Failure(
            new Error("Payment.NotAuthorized", "Only authorized payments can be captured."));
    }

    payment.Capture();
    return Result<Payment>.Success(payment);
}
```

## ValueObjects

Base record/class ensuring structural equality rather than reference equality for immutable concepts.

Example:

```csharp
public abstract class ValueObject : IEquatable<ValueObject>
{
    protected abstract IEnumerable<object> GetEqualityComponents();

    public bool Equals(ValueObject? other) =>
        other is not null && GetEqualityComponents().SequenceEqual(other.GetEqualityComponents());

    public override bool Equals(object? obj) =>
        obj is ValueObject other && Equals(other);

    public override int GetHashCode() =>
        GetEqualityComponents().Aggregate(0, (hash, obj) => HashCode.Combine(hash, obj.GetHashCode()));

    public static bool operator ==(ValueObject? left, ValueObject? right) => Equals(left, right);
    public static bool operator !=(ValueObject? left, ValueObject? right) => !Equals(left, right);
}
```

Concrete value object example:

```csharp
public class Money : ValueObject
{
    public decimal Amount { get; }
    public string Currency { get; }

    public Money(decimal amount, string currency)
    {
        if (amount < 0) 
            throw new ArgumentException("Amount cannot be negative.", nameof(amount));

        Amount = amount;
        Currency = currency.ToUpperInvariant();
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Amount;
        yield return Currency;
    }
}
```
