namespace Garnet.Services.Auth.Domain.Aggregates.MerchantAggregate;

using Garnet.Services.Auth.Domain.Aggregates.MerchantAggregate.Enums;

public class MerchantConfiguration
{
    public Guid MerchantId { get; private set; }
    public string SuccessUrl { get; private set; } = string.Empty;
    public string FailUrl { get; private set; } = string.Empty;
    public string BaseUrl { get; private set; } = string.Empty;
    public bool Setup { get; private set; } = false;

    public Dictionary<string, CommunicationType> CommunicationPreferences { get; private set; } = new();

    public MerchantConfiguration(Guid merchantId, string baseUrl = "", string successUrl = "", string failUrl = "")
    {
        MerchantId = merchantId;
        BaseUrl = baseUrl;
        SuccessUrl = successUrl;
        FailUrl = failUrl;
    }

    public CommunicationType GetPreference(string topic, CommunicationType defaultChannel = CommunicationType.Email)
    {
        return CommunicationPreferences.TryGetValue(topic, out var channel) ? channel : defaultChannel;
    }

    public void SetPreference(string topic, CommunicationType channel)
    {
        CommunicationPreferences[topic] = channel;
    }
}
