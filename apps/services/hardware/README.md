# Hardware Service

The **Hardware Service** manages point-of-sale (POS) terminal devices, card readers, receipt printers, and IoT hardware telemetry integrations.

---

## Directory Structure

```plaintext
hardware/
├── Api/
│   ├── Controllers/
│   │   └── HardwareController.cs   # POS Terminal management and device status APIs
│   └── Program.cs                  # Web API entrypoint
├── Application/
│   └── IHardwareService.cs         # Device provisioning and telemetry interface
├── Domain/
│   └── Device.cs                   # POS Terminal and Hardware Device domain entity
└── Infrastructure/
    └── HardwareDbContext.cs        # Device registry and telemetry storage
```

---

## Code Examples

### 1. Domain Aggregate (`Domain/Device.cs`)

```csharp
namespace Garnet.Services.Hardware.Domain;

public class Device
{
    public Guid Id { get; private set; }
    public string SerialNumber { get; private set; } = string.Empty;
    public string DeviceType { get; private set; } = string.Empty;
    public string Status { get; private set; } = "Offline";

    public Device(Guid id, string serialNumber, string deviceType)
    {
        Id = id;
        SerialNumber = serialNumber;
        DeviceType = deviceType;
    }
}
```

### 2. Application Interface (`Application/IHardwareService.cs`)

```csharp
namespace Garnet.Services.Hardware.Application;

public interface IHardwareService
{
    Task<DeviceDto?> RegisterDeviceAsync(string serialNumber, string type, CancellationToken cancellationToken = default);
}

public record DeviceDto(Guid Id, string SerialNumber, string DeviceType, string Status);
```
