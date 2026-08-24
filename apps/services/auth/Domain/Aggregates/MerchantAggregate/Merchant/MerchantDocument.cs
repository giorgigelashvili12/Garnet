namespace Garnet.Services.Auth.Domain.Aggregates.MerchantAggregate;

using Garnet.Services.Auth.Domain.Aggregates.MerchantAggregate.Enums;

public class MerchantDocument
{
    public Guid Id { get; private set; }
    public Guid MerchantId { get; private set; }
    public DocumentCategory Category { get; private set; } = DocumentCategory.None;
    public DocumentType Type { get; private set; } = DocumentType.Merchant;
    public string? DocumentId { get; private set; }
    public DocumentStatus Status { get; private set; } = DocumentStatus.Pending;
    public DateTime UploadedAt { get; private set; } = DateTime.UtcNow;
}