using Microsoft.AspNetCore.Mvc;

namespace Garnet.Services.Auth.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class DeviceController : ControllerBase
{
    [HttpPost("register")]
    public IActionResult RegisterDevice([FromBody] RegisterDeviceRequest request)
    {
        return Ok(new { DeviceId = Guid.NewGuid(), Status = "Registered" });
    }

    [HttpPost("challenge")]
    public IActionResult ChallengeDevice([FromBody] ChallengeDeviceRequest request)
    {
        return Ok(new { ChallengeToken = Guid.NewGuid().ToString("N") });
    }
}

public record RegisterDeviceRequest(string DeviceName, string Fingerprint);
public record ChallengeDeviceRequest(Guid DeviceId);
