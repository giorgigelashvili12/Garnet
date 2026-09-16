namespace Garnet.Services.Auth.Application.Interfaces;

public interface IEmailVerificationService
{
    Task SendAsync(string recipientEmail, string verificationToken, CancellationToken ct = default);
}
