# GoCommon Library

The **GoCommon** library provides standard Go utilities for logging, error wrapping, metrics instrumentation, and distributed messaging interfaces.

---

## Directory Structure

```plaintext
GoCommon/
├── README.md                       # Usage guide & code examples
├── errors.go                       # Domain error wrapping helper types
├── eventbus.go                     # Generic event publisher & subscriber interface
└── logger.go                       # Structured logging interface wrapper (Zap / Zerolog)
```

---

## Code Examples

### 1. Structured Logging (`logger.go`)

```go
package gocommon

type Logger interface {
	Info(msg string, keysAndValues ...interface{})
	Error(err error, msg string, keysAndValues ...interface{})
}
```

### 2. Event Bus Interface (`eventbus.go`)

```go
package gocommon

import "context"

type EventBus interface {
	Publish(ctx context.Context, topic string, payload interface{}) error
	Subscribe(ctx context.Context, topic string, handler func(payload []byte) error) error
}
```
