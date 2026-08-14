# Admin Service

The **Admin Service** is a C# .NET microservice built using Clean Architecture principles. It manages system administration, merchant auditing, role-based access control (RBAC), and back-office management functionality.

---

## Directory Structure

```plaintext
admin/
├── Api/
│   ├── Controllers/
│   │   └── AdminController.cs      # ASP.NET Core API Controllers
│   └── Program.cs                  # Web API entrypoint and DI configuration
├── Application/
│   └── IAdminService.cs            # Application interfaces, use cases, and DTOs
├── Domain/
│   └── AdminUser.cs                # Core domain aggregates, entities, and value objects
└── Infrastructure/
    └── AdminDbContext.cs           # Database context, repositories, and external integrations
```

---

## Code Examples

### 1. Domain Aggregate (`Domain/AdminUser.cs`)

```csharp
namespace Garnet.Services.Admin.Domain;

public class AdminUser
{
    public Guid Id { get; private set; }
    public string Email { get; private set; } = string.Empty;
    public string Role { get; private set; } = string.Empty;

    public AdminUser(Guid id, string email, string role)
    {
        Id = id;
        Email = email;
        Role = role;
    }
}
```

### 2. Application Service Interface (`Application/IAdminService.cs`)

```csharp
namespace Garnet.Services.Admin.Application;

public interface IAdminService
{
    Task<AdminUserDto?> GetAdminByIdAsync(Guid id, CancellationToken cancellationToken = default);
}

public record AdminUserDto(Guid Id, string Email, string Role);
```

### 3. API Controller (`Api/Controllers/AdminController.cs`)

```csharp
using Microsoft.AspNetCore.Mvc;
using Garnet.Services.Admin.Application;

namespace Garnet.Services.Admin.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class AdminController : ControllerBase
{
    private readonly IAdminService _adminService;

    public AdminController(IAdminService adminService)
    {
        _adminService = adminService;
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _adminService.GetAdminByIdAsync(id);
        return result is not null ? Ok(result) : NotFound();
    }
}
```
