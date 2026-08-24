using Microsoft.EntityFrameworkCore;
using Garnet.Services.Auth.Domain.Aggregates.MerchantAggregate;

namespace Garnet.Services.Auth.Infrastructure;

public class AuthDbContext : DbContext
{
    public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
    {
    }

    public DbSet<Merchant> Merchants => Set<Merchant>();
    public DbSet<MerchantAuth> MerchantAuths => Set<MerchantAuth>();
    public DbSet<MerchantDocument> MerchantDocuments => Set<MerchantDocument>();
    public DbSet<MerchantConfiguration> MerchantConfigurations => Set<MerchantConfiguration>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Merchant>(builder =>
        {
            builder.HasKey(m => m.Id);
            builder.HasIndex(m => m.Email).IsUnique();

            builder.Property(m => m.Status).HasConversion<string>();
            builder.Property(m => m.Subscription).HasConversion<string>();
        });

        modelBuilder.Entity<MerchantAuth>(builder =>
        {
            builder.HasKey(a => a.MerchantId);
        });

        modelBuilder.Entity<MerchantConfiguration>(builder =>
        {
            builder.HasKey(c => c.MerchantId);
        });

        modelBuilder.Entity<MerchantDocument>(builder =>
        {
            builder.HasKey(d => d.Id);
        });
    }
}
