namespace Garnet.Services.Auth.Application.Commands.Auth;

using Garnet.Services.Auth.Domain.Aggregates.MerchantAggregate.Enums;

public record GetProfileCommand(
    string Id
);

public record ProfileDto(
    Guid Id,
    string Email,
    string LegalName,
    string Phone,
    string Country,
    MerchantStatus Status,
    decimal Credit,
    decimal AICredit,
    SubscriptionEnum Subscription,
    DateTime CreatedAt,
    bool EmailVerified,
    string TestKey,
    string ProdKey
);

public record GetProfileResponse(
    ProfileDto Profile
);
