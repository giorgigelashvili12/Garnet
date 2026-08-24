using Microsoft.AspNetCore.Mvc;
using Garnet.Services.Auth.Application;
using Garnet.Services.Auth.Application.Commands.Auth;
using Garnet.Services.Auth.Application.Handlers.Auth;

namespace Garnet.Services.Auth.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class AuthController : ControllerBase
{
    private readonly LoginUserHandler _loginHandler;
    private readonly RegistrationHandler _registrationHandler;

    public AuthController(
        LoginUserHandler loginHandler,
        RegistrationHandler registrationHandler
    )
    {
        _loginHandler = loginHandler;
        _registrationHandler = registrationHandler;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterMerchantCommand command, CancellationToken ct)
    {
        var result = await _registrationHandler.HandleAsync(command, ct);
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request, CancellationToken ct)
    {
        var meta = new LoginMeta(
            Ip: HttpContext.Connection.RemoteIpAddress?.ToString(),
            UserAgent: Request.Headers["User-Agent"].ToString(),
            Fingerprint: request.Fingerprint
        );

        var command = new LoginUserCommand(request.Email, request.Password, meta);
        var result = await _loginHandler.HandleAsync(command, ct);

        return Ok(result);
    }
}

public record LoginRequest(string Email, string Password, string? Fingerprint);
