# Commerce Service

The **Commerce Service** manages merchant products, store catalogs, shopping carts, and order checkout flows.

---

## Directory Structure

```plaintext
commerce/
├── Api/
│   ├── Controllers/
│   │   └── CommerceController.cs   # Product catalog and cart API endpoints
│   └── Program.cs                  # Entrypoint and service composition
├── Application/
│   └── ICommerceService.cs         # Use cases for catalog management and checkout
├── Domain/
│   └── Product.cs                  # Product, Variant, and Order domain entities
└── Infrastructure/
    └── CommerceDbContext.cs        # Persistence layer for product catalog
```

---

## Code Examples

### 1. Domain Aggregate (`Domain/Product.cs`)

```csharp
namespace Garnet.Services.Commerce.Domain;

public class Product
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public decimal Price { get; private set; }

    public Product(Guid id, string name, decimal price)
    {
        Id = id;
        Name = name;
        Price = price;
    }
}
```

### 2. Application Service Interface (`Application/ICommerceService.cs`)

```csharp
namespace Garnet.Services.Commerce.Application;

public interface ICommerceService
{
    Task<ProductDto?> GetProductByIdAsync(Guid id, CancellationToken cancellationToken = default);
}

public record ProductDto(Guid Id, string Name, decimal Price);
```
