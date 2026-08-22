using Microsoft.AspNetCore.Mvc;

namespace Garnet.Services.Auth.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class EmailController : ControllerBase
{
    [HttpPost("verify")]
    public IActionResult VerifyEmail([FromQuery] string token)
    {
        return Ok(new { Verified = true, Message = "Email address confirmed." });
    }

    [HttpPost("resend")]
    public IActionResult ResendVerification([FromBody] ResendEmailRequest request)
    {
        return Ok(new { Message = "Verification email sent." });
    }
}

public record ResendEmailRequest(string Email);
