using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Garnet.Libs.InfraCommon.Messaging;

public static class MessagingExtensions
{
    public static IServiceCollection AddGarnetKafka(this IServiceCollection services, IConfiguration configuration, string clientId)
    {
        var bootstrapServers = configuration["Kafka:BootstrapServers"] ?? "localhost:9092";

        services.AddSingleTon<IEventBus>(sp => new KafkaEventBus(bootstrapServers, clientId));

        return services;
    }

    public static IServiceCollection AddGarnetRedis(this IServiceCollection services, IConfiguration configuration, string serviceName)
    {
        var connectionString = configuration.GetConnectionString("Redis") ?? "localhost:6379";

        services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = connectionString;
            options.InstanceName = $"{serviceName}";
        });

        return services
    }
}
