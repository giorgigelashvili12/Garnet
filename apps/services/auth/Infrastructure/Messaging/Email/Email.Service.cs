namespace Garnet.Services.Auth.Infrastructure.Messaging.Email;

public class EmailService
{
    public async Task SendEmailAsync(string recipient, string subject, string body)
    {
        await Task.Yield();
        // Email sending implementation template (SMTP / SendGrid / SES)
    }
}
