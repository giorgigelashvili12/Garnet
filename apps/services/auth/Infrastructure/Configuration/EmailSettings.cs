namespace Garnet.Services.Auth.Infrastructure.External.Brevo;

public class EmailSettings
{
    public const string SectionName = "EmailSettings";

    public string ApiKey { get; set; } = string.Empty;
    public string SenderName { get; set; } = string.Empty;
    public string SenderEmail { get; set; } = string.Empty;
    public string ApiUrl { get; set; } = string.Empty;
}
