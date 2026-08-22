namespace Garnet.Services.Auth.Application;

public interface IAuthService
{
    Task<AuthTokenResult> RegisterAsync(string email, string password, CancellationToken cancellationToken = default);
    Task<AuthTokenResult> LoginAsync(string email, string password, CancellationToken cancellationToken = default);
    Task<AuthTokenResult> RefreshTokenAsync(string refreshToken, CancellationToken cancellationToken = default);
}

public record AuthTokenResult(string AccessToken, string RefreshToken, int ExpiresInSeconds);
