namespace Garnet.Services.Auth.Infrastructure.External.Tokens;

public class JwtTokenGenerator
{
    public string GenerateAccessToken(Guid userId, string email, IEnumerable<string> roles)
    {
        return $"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.sample_payload.{userId}";
    }

    public string GenerateRefreshToken()
    {
        return Guid.NewGuid().ToString("N");
    }
}
