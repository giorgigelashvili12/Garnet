namespace Garnet.Services.Auth.Infrastructure.External.OAuth;

using System.Net.Http.Json;
using Microsoft.Extensions.Options;

public class GoogleOAuthOptions
{
    public const string SectionName = "OAuth:Google";

    public string ClientId { get; set; } = string.Empty;
    public string ClientSecret { get; set; } = string.Empty;
    public string RedirectUri { get; set; } = string.Empty;
}

internal record GoogleTokenResponse(
    [property: System.Text.Json.Serialization.JsonPropertyName("access_token")] string AccessToken,
    [property: System.Text.Json.Serialization.JsonPropertyName("id_token")] string IdToken,
    [property: System.Text.Json.Serialization.JsonPropertyName("token_type")] string TokenType,
    [property: System.Text.Json.Serialization.JsonPropertyName("expires_in")] int ExpiresIn
);

internal record GoogleUserInfoResponse(
    [property: System.Text.Json.Serialization.JsonPropertyName("sub")] string Sub,
    [property: System.Text.Json.Serialization.JsonPropertyName("email")] string Email,
    [property: System.Text.Json.Serialization.JsonPropertyName("name")] string Name,
    [property: System.Text.Json.Serialization.JsonPropertyName("picture")] string Picture,
    [property: System.Text.Json.Serialization.JsonPropertyName("email_verified")] bool EmailVerified
);

public class GoogleOAuthProvider
{
    private const string TokenEndpoint = "https://oauth2.googleapis.com/token";
    private const string UserInfoEndpoint = "https://www.googleapis.com/oauth2/v3/userinfo";

    private readonly HttpClient _httpClient;
    private readonly GoogleOAuthOptions _options;

    public GoogleOAuthProvider(HttpClient httpClient, IOptions<GoogleOAuthOptions> options)
    {
        _httpClient = httpClient;
        _options = options.Value;
    }

    public async Task<Application.Interfaces.OAuthUserProfile> ProfileAsync(string code, CancellationToken ct = default)
    {
        var tokenResponse = await ExchangeCodeForTokensAsync(code, ct);
        var userInfo = await GetUserInfoAsync(tokenResponse.AccessToken, ct);

        return new Application.Interfaces.OAuthUserProfile(
            Email: userInfo.Email,
            ProviderId: userInfo.Sub,
            Provider: "google",
            Name: userInfo.Name
        );
    }

    public string BuildAuthorizationUrl(string? state = null)
    {
        var scopes = Uri.EscapeDataString("openid email profile");
        var url = $"https://accounts.google.com/o/oauth2/v2/auth" +
                  $"?client_id={Uri.EscapeDataString(_options.ClientId)}" +
                  $"&redirect_uri={Uri.EscapeDataString(_options.RedirectUri)}" +
                  $"&response_type=code" +
                  $"&scope={scopes}" +
                  $"&access_type=offline" +
                  $"&prompt=consent";

        if (!string.IsNullOrEmpty(state))
            url += $"&state={Uri.EscapeDataString(state)}";

        return url;
    }

    private async Task<GoogleTokenResponse> ExchangeCodeForTokensAsync(string code, CancellationToken ct)
    {
        var payload = new Dictionary<string, string>
        {
            ["code"] = code,
            ["client_id"] = _options.ClientId,
            ["client_secret"] = _options.ClientSecret,
            ["redirect_uri"] = _options.RedirectUri,
            ["grant_type"] = "authorization_code"
        };

        using var request = new HttpRequestMessage(HttpMethod.Post, TokenEndpoint)
        {
            Content = new FormUrlEncodedContent(payload)
        };

        using var response = await _httpClient.SendAsync(request, ct);

        if (!response.IsSuccessStatusCode)
        {
            var errorBody = await response.Content.ReadAsStringAsync(ct);
            throw new InvalidOperationException(
                $"Google token exchange failed ({response.StatusCode}): {errorBody}");
        }

        var tokenResponse = await response.Content.ReadFromJsonAsync<GoogleTokenResponse>(ct);
        return tokenResponse ?? throw new InvalidOperationException("Google returned an empty token response");
    }

    private async Task<GoogleUserInfoResponse> GetUserInfoAsync(string accessToken, CancellationToken ct)
    {
        using var request = new HttpRequestMessage(HttpMethod.Get, UserInfoEndpoint);
        request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

        using var response = await _httpClient.SendAsync(request, ct);

        if (!response.IsSuccessStatusCode)
        {
            var errorBody = await response.Content.ReadAsStringAsync(ct);
            throw new InvalidOperationException(
                $"Google userinfo request failed ({response.StatusCode}): {errorBody}");
        }

        var userInfo = await response.Content.ReadFromJsonAsync<GoogleUserInfoResponse>(ct);
        return userInfo ?? throw new InvalidOperationException("Google returned an empty userinfo response");
    }
}
