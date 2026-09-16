using System.Net.Http.Json;
using Garnet.Services.Auth.Application.Interfaces;

namespace Garnet.Services.Auth.Infrastructure.External.Brevo;

public class BrevoEmailSender : IEmailSender
{
    private readonly HttpClient _httpClient;
    private readonly EmailSettings _settings;

    public BrevoEmailSender(HttpClient httpClient, IOptions<EmailSettings> options)
    {
        _httpClient = httpClient;
        _settings = options.Value;
    }

    public async Task SendEmailAsync(
        string recipientEmail,
        string subject,
        string htmlBody,
        bool isHtml = true,
        CancellationToken ct = default
    )
    {
        var payload = new
        {
            sender = new
            {
                name = _settings.SenderName,
                email = _settings.SenderEmail,
            },
            to = new[]
            {
                new { email = recipientEmail }
            },
            subject = subject,
            htmlContent = isHtml ? htmlBody : null,
            textContent = isHtml ? htmlBody : null
        };

        using var res = await _httpClient.PostAsJsonAsync(_settings.ApiUrl, payload, ct);

        if (!res.IsSuccessStatusCode)
        {
            var err = await res.Content.ReadAsStringAsync(ct);
            throw new HttpRequestException($"Brevo API call faield: [{res.StatusCode}] - {err}");
        }
    }
}
