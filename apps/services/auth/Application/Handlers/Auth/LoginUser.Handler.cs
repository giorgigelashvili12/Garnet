using Garnet.Services.Auth.Application.Commands.Auth;

namespace Garnet.Services.Auth.Application.Handlers.Auth;

public class LoginUserHandler
{
    public async Task<AuthTokenResult> HandleAsync(LoginUserCommand command, CancellationToken cancellationToken = default)
    {
        // Handling logic: validate credentials and issue tokens
        await Task.Yield();
        return new AuthTokenResult("sample_access_token", "sample_refresh_token", 3600);
    }
}
