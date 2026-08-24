namespace Garnet.Services.Auth.Application.Interfaces;

public interface IEmailSender
{
    Task SendEmailAsync(string to, string subject, string body, bool isHtml, CancellationToken cancellationToken = default);
}
