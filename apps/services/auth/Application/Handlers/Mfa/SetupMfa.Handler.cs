using Garnet.Services.Auth.Application.Commands.Mfa;

namespace Garnet.Services.Auth.Application.Handlers.Mfa;

public class SetupMfaHandler
{
    public async Task<string> HandleAsync(SetupMfaCommand command, CancellationToken cancellationToken = default)
    {
        // Handling logic: generate MFA TOTP setup key
        await Task.Yield();
        return "JBSWY3DPEHPK3PXP";
    }
}
