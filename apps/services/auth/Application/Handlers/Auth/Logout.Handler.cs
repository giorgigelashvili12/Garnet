namespace Garnet.Services.Auth.Application.Handlers.Auth;

using System.Security.Cryptography;
using System.Text;
using Garnet.Services.Auth.Application.Commands.Auth;
using Garnet.Services.Auth.Domain.Repositories;
using Garnet.Services.Auth.Infrastructure.Persistence.Stores;

public class LogoutHandler
{
    private readonly IMerchantRepository _merchantRepository;
    private readonly SessionStore _sessionStore;

    public LogoutHandler(
        IMerchantRepository merchantRepository,
        SessionStore sessionStore
    )
    {
        _merchantRepository = merchantRepository;
        _sessionStore = sessionStore;
    }

    public async Task<LogoutResultDto> HandleAsync(
        LogoutCommand command,
        CancellationToken ct = default
    )
    {
        string tokenHash = HashSha256(command.RefreshToken);

        var merchant = await _merchantRepository.GetByRefreshTokenHashAsync(tokenHash, ct);
        if (merchant != null)
        {
            var session = merchant.Sessions.FirstOrDefault(s => s.RefreshTokenHash == tokenHash);
            if (session != null)
            {
                session.IsRevoked = true;
                await _merchantRepository.SaveChangesAsync(ct);
            }
        }

        string cacheKey = $"session:{tokenHash}";
        await _sessionStore.RemoveSessionAsync(cacheKey, ct);

        return new LogoutResultDto("success", "logged out successfully");
    }

    private static string HashSha256(string rawData)
    {
        byte[] bytes = SHA256.HashData(Encoding.UTF8.GetBytes(rawData));
        return Convert.ToHexString(bytes).ToLowerInvariant();
    }
}
