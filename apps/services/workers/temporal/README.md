# Temporal Worker

The **Temporal Worker** runs durable workflows and activities using [Temporal.io](https://temporal.io/). It handles complex saga patterns, asynchronous payment retries, recurring billing workflows, and long-running distributed processes.

---

## Directory Structure

```plaintext
temporal/
├── README.md                       # Architectural guide & Temporal SDK integration
├── worker.py                       # Python Temporal worker template
├── worker.cs                       # C# .NET Temporal worker template
└── worker.go                       # Go Temporal worker template
```

---

## Code Examples

### 1. Python Temporal Worker (`worker.py`)

```python
import asyncio
from temporalio.client import Client
from temporalio.worker import Worker

async def main():
    client = await Client.connect("localhost:7233")
    worker = Worker(
        client,
        task_queue="payment-tasks",
        workflows=[],
        activities=[],
    )
    await worker.run()

if __name__ == "__main__":
    asyncio.run(main())
```

### 2. C# Temporal Worker (`worker.cs`)

```csharp
using Temporalio.Client;
using Temporalio.Worker;

class Program
{
    static async Task Main(string[] args)
    {
        var client = await TemporalClient.ConnectAsync(new TemporalClientConnectOptions("localhost:7233"));
        using var worker = new TemporalWorker(
            client,
            new TemporalWorkerOptions(taskQueue: "payment-tasks"));
        await worker.ExecuteAsync(CancellationToken.None);
    }
}
```

### 3. Go Temporal Worker (`worker.go`)

```go
package main

import (
	"log"
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"
)

func main() {
	c, err := client.Dial(client.Options{})
	if err != nil {
		log.Fatalln("Unable to create client", err)
	}
	defer c.Close()

	w := worker.New(c, "payment-tasks", worker.Options{})
	err = w.Run(worker.InterruptCh())
	if err != nil {
		log.Fatalln("Unable to start worker", err)
	}
}
```
