using Garnet.Services.Auth.Application.Interfaces;
using Microsoft.Extensions.Options;

namespace Garnet.Services.Auth.Infrastructure.Messaging.Email.Senders;

public class FrontendSettings
{
    public const string SectionName = "FrontendSettings";
    public string BaseUrl { get; set; } = "http://localhost:5000";
}

public class EmailVerificationService : IEmailVerificationService
{
    private readonly IEmailSender _emailSender;
    private readonly FrontendSettings _frontendSettings;

    public EmailVerificationService(
        IEmailSender emailSender,
        IOptions<FrontendSettings> frontendSettings)
    {
        _emailSender = emailSender;
        _frontendSettings = frontendSettings.Value;
    }

    public async Task SendAsync(string recipientEmail, string verificationToken, CancellationToken ct = default)
    {
        string verificationUrl = $"{_frontendSettings.BaseUrl.TrimEnd('/')}/verify?token={Uri.EscapeDataString(verificationToken)}";
        string subject = "Verify Your Email Address";

        string templatePath = Path.Combine(AppContext.BaseDirectory, "Messaging", "Email", "Templates", "EmailVerification.html");

        if (!File.Exists(templatePath))
        {
            templatePath = Path.Combine(AppContext.BaseDirectory, "Messaging", "Email", "Templates", "WelcomeEmail.html");
        }

        if (!File.Exists(templatePath))
        {
            throw new FileNotFoundException($"Email template not found at path: {templatePath}");
        }

        string htmlTemplate = await File.ReadAllTextAsync(templatePath, ct);
        string htmlBody = htmlTemplate.Replace("{{ConfirmUrl}}", verificationUrl);

        await _emailSender.SendEmailAsync(
            recipientEmail: recipientEmail,
            subject: subject,
            htmlBody: htmlBody,
            isHtml: true,
            ct: ct
        );
    }
}
