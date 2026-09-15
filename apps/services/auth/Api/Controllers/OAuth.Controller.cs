using Microsoft.AspNetCore.Mvc;
using Garnet.Services.Auth.Application.Commands.Auth;
using Garnet.Services.Auth.Application.Handlers.Auth;
using Garnet.Services.Auth.Infrastructure.External.OAuth;

namespace Garnet.Services.Auth.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class OAuthController : ControllerBase
{
    private readonly OAuthLoginHandler _oauthLoginHandler;
    private readonly GoogleOAuthProvider _googleProvider;

    public OAuthController(
        OAuthLoginHandler oauthLoginHandler,
        GoogleOAuthProvider googleProvider
    )
    {
        _oauthLoginHandler = oauthLoginHandler;
        _googleProvider = googleProvider;
    }

    [HttpGet("google/url")]
    public IActionResult GetGoogleAuthUrl([FromQuery] string? state = null)
    {
        var url = _googleProvider.BuildAuthorizationUrl(state);
        return Ok(new { AuthorizationUrl = url });
    }

    [HttpPost("google/callback")]
    public async Task<IActionResult> GoogleCallback([FromBody] OAuthCallbackRequest request, CancellationToken ct)
    {
        var meta = new LoginMeta(
            Ip: HttpContext.Connection.RemoteIpAddress?.ToString(),
            UserAgent: Request.Headers["User-Agent"].ToString(),
            Fingerprint: request.Fingerprint
        );

        var command = new OAuthLoginCommand(
            Provider: "google",
            Code: request.Code,
            Meta: meta
        );

        var result = await _oauthLoginHandler.HandleAsync(command, ct);

        return Ok(result);
    }
}

public record OAuthCallbackRequest(string Code, string? State, string? Fingerprint);
