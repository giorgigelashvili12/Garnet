using Microsoft.AspNetCore.Mvc;

namespace Garnet.Services.Auth.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class MfaController : ControllerBase
{
    [HttpPost("setup")]
    public IActionResult SetupMfa()
    {
        return Ok(new { SecretKey = "JBSWY3DPEHPK3PXP", QrCodeUrl = "otpauth://totp/Garnet:user@example.com?secret=JBSWY3DPEHPK3PXP" });
    }

    [HttpPost("verify")]
    public IActionResult VerifyMfa([FromBody] VerifyMfaRequest request)
    {
        return Ok(new { Success = true });
    }
}

public record VerifyMfaRequest(string Code);
