using System.Text;
using System.Text.Json;
using Microsoft.Extentions.Options;
using Garnet.Services.Auth.Application.Interfaces;

namespace Garnet.Services.Auth.Infrastructure.Messaging.Email;

public class EmailService : IEmailSender
{
    private readonly HttpClient _httpClient;
    private readonly EmailSettings _settings;

    public EmailService(HttpClient httpClient, IOptions<EmailSettings> settings)
    {
        _httpClient = httpClient;
        _settings = settings.Value;
        Configuration.Default.ApiKey["api-key"] = _settings.ApiKey;
    }

    public async Task SendEmailAsync(string recipient, string subject, string body, bool isHtml = true, CancellationToken ct = default)
    {
        var apiInstance = new TransactionalEmailsApi();
        var sender = new SendSmtpEmailSender(_settings.SenderName, _settings.SenderEmail);
        var receiver = new SendSmtpEmailTo(recipient);
        var toList = new List<SendSmtpEmailTo> { receiver };
        var emailPayload = new SendSmtpEmail(
            sender: sender,
            to: toList,
            subject: subject,
            htmlContent: isHtml ? body : null,
            textContent: isHtml ? null : body
        );
        await apiInstance.SendTransacEmailAsync(emailPayload);
    }
}
