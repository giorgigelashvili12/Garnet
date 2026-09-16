namespace Garnet.Services.Auth.Application.Interfaces;

public interface IEmailSender
{
    Task SendEmailAsync(
        string recipientEmail,
        string subject,
        string htmlBody,
        bool isHtml = true,
        CancellationToken ct = default
    );
}
