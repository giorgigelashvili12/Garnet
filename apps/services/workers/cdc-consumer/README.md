# CDC Consumer Worker

The **CDC Consumer Worker** captures change data events emitted from primary OLTP databases (PostgreSQL, CockroachDB) via **Debezium** and updates downstream search engines (OpenSearch), data warehouses (ClickHouse), and Redis caches.

---

## Directory Structure

```plaintext
cdc-consumer/
├── README.md                       # Architectural guide & streaming setup
├── main.go                         # Go CDC stream consumer entrypoint
└── main.ts                         # Node.js TypeScript CDC stream consumer entrypoint
```

---

## Code Examples

### 1. Go CDC Consumer (`main.go`)

```go
package main

import (
	"context"
	"fmt"
	"log"
)

type CDCEvent struct {
	Table     string                 `json:"table"`
	Operation string                 `json:"operation"`
	Before    map[string]interface{} `json:"before"`
	After     map[string]interface{} `json:"after"`
}

func main() {
	log.Println("Starting CDC Consumer worker...")
}
```

### 2. TypeScript CDC Consumer (`main.ts`)

```typescript
export interface CDCEvent<T = Record<string, unknown>> {
  table: string;
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  before?: T;
  after?: T;
}

export async function processCDCEvent(event: CDCEvent): Promise<void> {
  console.log(`Processing CDC ${event.operation} on ${event.table}`);
}
```
