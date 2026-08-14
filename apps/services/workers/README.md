# Workers Directory

The `workers` directory contains asynchronous background processes, event consumers, and durable workflow engines.

---

## Directory Structure

```plaintext
workers/
├── cdc-consumer/                   # Change Data Capture (CDC) worker (Debezium + Kafka)
└── temporal/                       # Temporal.io durable execution workflow workers
```

---

## Service Overview

- **`cdc-consumer/`**: Listens to database Write-Ahead Logs (WAL) via Debezium and streams database changes into Kafka topics for asynchronous processing, search indexing, and cache invalidation.
- **`temporal/`**: Executes distributed, stateful, long-running business workflows (such as subscription renewals, multi-step payouts, and retryable merchant onboarding).
