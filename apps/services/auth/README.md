# Auth Service

The **Auth Service** is a security microservice managing user authentication, JWT token issuance, multi-factor authentication (MFA), session management, and OAuth integrations.

---

## Directory Structure

```plaintext
auth/
├── Api/
│   ├── Controllers/
│   │   └── AuthController.cs       # Authentication endpoints (login, register, token refresh)
│   └── Program.cs                  # Web API entrypoint and service configuration
├── Application/
│   └── IAuthService.cs             # Auth logic contracts, token generation interfaces
├── Domain/
│   └── UserIdentity.cs             # Identity aggregate root, credentials, and security tokens
└── Infrastructure/
    └── AuthDbContext.cs            # Identity database context and credential persistence
```

---

## Code Examples

### 1. Domain Model (`Domain/UserIdentity.cs`)

```csharp
namespace Garnet.Services.Auth.Domain;

public class UserIdentity
{
    public Guid Id { get; private set; }
    public string Username { get; private set; } = string.Empty;
    public string PasswordHash { get; private set; } = string.Empty;
    public bool MfaEnabled { get; private set; }

    public UserIdentity(Guid id, string username, string passwordHash)
    {
        Id = id;
        Username = username;
        PasswordHash = passwordHash;
    }
}
```

### 2. Application Interface (`Application/IAuthService.cs`)

```csharp
namespace Garnet.Services.Auth.Application;

public interface IAuthService
{
    Task<AuthTokenResult> LoginAsync(string username, string password, CancellationToken cancellationToken = default);
}

public record AuthTokenResult(string AccessToken, string RefreshToken, int ExpiresIn);
```

### 3. API Controller (`Api/Controllers/AuthController.cs`)

```csharp
using Microsoft.AspNetCore.Mvc;
using Garnet.Services.Auth.Application;

namespace Garnet.Services.Auth.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var result = await _authService.LoginAsync(request.Username, request.Password);
        return Ok(result);
    }
}

public record LoginRequest(string Username, string Password);
```
