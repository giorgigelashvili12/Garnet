namespace Garnet.Services.Auth.Infrastructure.Messaging.Senders;

using Garnet.Services.Auth.Application.Interfaces;

public interface IEmailVerificationService
{
    Task SendAsync(string recipientEmail, string verificationToken, CancellationToken ct = default);
}

public class EmailVerificationService : IEmailVerificationService
{
    private readonly IEmailSender _emailSender;

    public EmailVerificationService(IEmailSender emailSender)
    {
        _emailSender = emailSender;
    }

    public async Task SendAsync(string recipientEmail, string verificationToken, CancellationToken ct = default)
    {
        string verificationUrl = $"http://localhost:5000/verify?token={Uri.EscapeDataString(verificationToken)}";
        string subject = "Verify Your Email Address";

        string templatePath = Path.Combine(AppContext.BaseDirectory, "Templates", "EmailVerification.html");
        if (!File.Exists(templatePath))
        {
            templatePath = Path.Combine(AppContext.BaseDirectory, "Templates", "WelcomeEmail.html");
        }

        string htmlTemplate = await File.ReadAllTextAsync(templatePath, ct);
        string htmlBody = htmlTemplate.Replace("{{ConfirmUrl}}", verificationUrl);

        await _emailSender.SendEmailAsync(recipientEmail, subject, htmlBody, true, ct);
    }
}
