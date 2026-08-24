using Microsoft.EntityFrameworkCore;
using Garnet.Services.Auth.Application;
using Garnet.Services.Auth.Application.Handlers.Auth;
using Garnet.Services.Auth.Domain.Repositories;
using Garnet.Services.Auth.Infrastructure;
using Garnet.Services.Auth.Infrastructure.External;
using Garnet.Services.Auth.Infrastructure.External.Tokens;
using Garnet.Services.Auth.Infrastructure.Messaging.Publishers;
using Garnet.Services.Auth.Infrastructure.Persistence.Repositories;
using Garnet.Services.Auth.Infrastructure.Persistence.Stores;
using Garnet.Services.Auth.Infrastructure.Messaging.Email;
using Garnet.Services.Auth.Application.Interfaces;

namespace Garnet.Services.Auth.Api;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();

        builder.Services.AddDbContext<AuthDbContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

        builder.Services.Configure<EmailSettings>(
            builder.Configuration.GetSection(EmailSettings.SectionName)
        );

        builder.Services.AddHttpClient<IEmailSender, EmailService>();

        builder.Services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = builder.Configuration.GetConnectionString("RedisConnection") ?? "localhost:6379";
            options.InstanceName = "GarnetAuth_";
        });
        builder.Services.AddSingleton<SessionStore>();

        builder.Services.AddSingleton<UserEventsPublisher>();

        builder.Services.AddScoped<IMerchantRepository, MerchantRepository>();
        builder.Services.AddSingleton<IPasswordHasher, PasswordHasher>();
        builder.Services.AddSingleton<JwtTokenGenerator>();
        builder.Services.AddScoped<LoginUserHandler>();
        builder.Services.AddScoped<RegistrationHandler>();

        var app = builder.Build();

        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();

        app.Run();
    }
}
