namespace Garnet.Services.Auth.Application.Workflows;

/// <summary>
/// Query to list active device sessions associated with a user account.
/// </summary>
public record ListDeviceSessionsQuery(Guid UserId);

public record DeviceSessionDto(Guid SessionId, string DeviceName, string IpAddress, DateTime LastActiveAt);
