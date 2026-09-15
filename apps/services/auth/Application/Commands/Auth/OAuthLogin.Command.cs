namespace Garnet.Services.Auth.Application.Commands.Auth;

public record OAuthLoginCommand(
    string Provider,
    string Code,
    LoginMeta? Meta
);
