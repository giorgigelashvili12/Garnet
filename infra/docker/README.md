# Docker Directory

## dockerfiles/

Base container definitions for each language stack used in the repo, .NET, Go, Node.js, Python. Services use these instead of rewriting identical Dockerfiles in every service repository.

## init/

Provisioning scripts, schemas, and configurations that execute automatically when Docker containers spin up for the first time via volume mounts. (/docker-entrypoint-initdb.d/)

## docker-compose.*.yml

`.infra` - Infrastructure databases, secret store and CDC pipelines.
`.observability` - Tracing, metrics, and loggin stacks (prometheus, grafana, jaeger)
`.apps` - Microservices and web apps
`default docker-compose.yml` - Root entry point that merges or includes the specialized compose files.

## init/clickhouse

In this case, service ClickHouse servers as an OLAP analytics database, it handles real-time payment analytics, merchant reporting dashboards, fraud detection logs, and transactional throughput metrics.

```plaintext
init/clickhouse/
├── 01_create_tables.sql
├── 02_materialized_views.sql
└── config.xml (optional server config overrides)
```

For exampel in `01_create_tables.sql`

```csharp
CREATE DATABASE IF NOT EXISTS psp_analytics;

-- Partitioned columnar table optimized for high-volume event ingestion
CREATE TABLE IF NOT EXISTS psp_analytics.payment_events
(
    event_id UUID,
    payment_id UUID,
    merchant_id UUID,
    amount Decimal(18, 4),
    currency LowCardinality(String),
    status LowCardinality(String),
    payment_method LowCardinality(String),
    created_at DateTime DEFAULT now()
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(created_at)
ORDER BY (merchant_id, created_at, payment_id);
```

In `02_materialized_views.sql`

```csharp
-- Pre-aggregated view for instant merchant dashboard metrics
CREATE MATERIALIZED VIEW IF NOT EXISTS psp_analytics.hourly_merchant_stats
ENGINE = SummingMergeTree()
PRIMARY KEY (merchant_id, hour)
AS SELECT
    merchant_id,
    toStartOfHour(created_at) AS hour,
    count() AS total_transactions,
    sum(amount) AS total_volume
FROM psp_analytics.payment_events
GROUP BY merchant_id, hour;
```
