# InfraCommon

## OutboxMessage.cs

Represent a database table used by transactional outbox pattern. Instead of publishing domain events to a message broker, events are converted into OutboxMessage database rows and saved in the exact same database transaction as aggregate changes

Example:

```csharp
public class OutboxMessage
{
    public Guid Id { get; set; }
    public string Type { get; set; } = string.Empty;       // e.g., "PaymentAuthorizedEvent"
    public string Content { get; set; } = string.Empty;    // Serialized JSON event payload
    public DateTime OccurredOnUtc { get; set; }
    public DateTime? ProcessedOnUtc { get; set; }          // Null until a background worker picks it up
    public string? Error { get; set; }                    // Stores error trace if dispatch fails
}
```

## PublishedDomainEventsInterceptor.cs

An Entity Framework Core `SaveChangesInterceptor` which automatically runs right before EF Core commit changes to SQL. Inspects all tracked `AggregateRoot` instances, collects their domain events, convert them into OutboxMessage entities and clear aggregate's event queue.

Example:

```csharp
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

public class PublishDomainEventsInterceptor : SaveChangesInterceptor
{
    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
        DbContextEventData eventData,
        InterceptionResult<int> result,
        CancellationToken cancellationToken = default)
    {
        DbContext? dbContext = eventData.Context;
        if (dbContext is null) 
            return base.SavingChangesAsync(eventData, result, cancellationToken);

        // 1. Find all aggregate roots in EF tracking memory with pending domain events
        var outboxMessages = dbContext.ChangeTracker
            .Entries<AggregateRoot<Guid>>()
            .Select(entry => entry.Entity)
            .SelectMany(entity =>
            {
                var events = entity.DomainEvents.ToList();
                entity.ClearDomainEvents(); // Clear events so they aren't processed twice
                return events;
            })
            // 2. Map domain events into OutboxMessage records
            .Select(domainEvent => new OutboxMessage
            {
                Id = Guid.NewGuid(),
                Type = domainEvent.GetType().Name,
                Content = JsonSerializer.Serialize(domainEvent, domainEvent.GetType()),
                OccurredOnUtc = DateTime.UtcNow
            })
            .ToList();

        // 3. Stage outbox messages into the database in the current transaction context
        if (outboxMessages.Any())
        {
            dbContext.Set<OutboxMessage>().AddRange(outboxMessages);
        }

        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }
}
```

## BaseDbContext.cs

An abstract EF Core `DbContext` that services (like payments or billing) inherit from. It automatically registers `OutboxMessage` entity mappings and attaches the interceptor so developers never forget to handle domain events manually.

Example:

```csharp
using Microsoft.EntityFrameworkCore;

public abstract class BaseDbContext : DbContext
{
    private readonly PublishDomainEventsInterceptor _interceptor;

    protected BaseDbContext(
        DbContextOptions options, 
        PublishDomainEventsInterceptor interceptor) : base(options)
    {
        _interceptor = interceptor;
    }

    public DbSet<OutboxMessage> OutboxMessages => Set<OutboxMessage>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // Automatically inject the interceptor whenever save operation triggers
        optionsBuilder.AddInterceptors(_interceptor);
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Global configuration for Outbox Table across all microservices
        modelBuilder.Entity<OutboxMessage>(builder =>
        {
            builder.ToTable("OutboxMessages");
            builder.HasKey(o => o.Id);
            builder.Property(o => o.Type).IsRequired().HasMaxLength(255);
            builder.Property(o => o.Content).IsRequired();
        });

        base.OnModelCreating(modelBuilder);
    }
}
```
