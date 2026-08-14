# ChatDomain Library

The **ChatDomain** library contains shared Go primitives and data contracts for chat applications, real-time messaging, and channel state.

---

## Directory Structure

```plaintext
ChatDomain/
├── README.md                       # Guide & chat domain contracts
└── message.go                      # Chat message & room payload structures
```

---

## Code Examples

### 1. Chat Message Contract (`message.go`)

```go
package chatdomain

import "time"

type ChatMessage struct {
	ID        string    `json:"id"`
	ChannelID string    `json:"channel_id"`
	SenderID  string    `json:"sender_id"`
	Body      string    `json:"body"`
	SentAt    time.Time `json:"sent_at"`
}
```
