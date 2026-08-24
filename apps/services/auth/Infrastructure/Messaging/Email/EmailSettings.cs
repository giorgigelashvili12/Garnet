namespace Garnet.Services.Auth.Infrastructure.Messaging.Email;

public class EmailSettings
{
    public const string SectionName = "EmailSettings";

    public string ApiKey { get; set; } = string.Empty;
    public string SenderName { get; set; } = "Garnet";
    public string SenderEmail { get; set; } = string.Empty;
    public string ApiUrl { get; set; } = "https://api.brevo.com/v3/smtp/email";
}
