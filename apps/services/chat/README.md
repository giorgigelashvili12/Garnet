# Chat Service

The **Chat Service** is a high-concurrency Go microservice powering real-time WebSocket communication, customer support chat channels, and notification streaming.

---

## Directory Structure

```plaintext
chat/
├── Api/
│   └── main.go                     # Go application entrypoint, HTTP/WebSocket server initialization
├── Application/
│   └── chat_service.go             # Application logic, message dispatching, and room management
├── Domain/
│   └── room.go                     # Chat room and message domain definitions
└── Infrastructure/
    └── redis_adapter.go            # Redis Pub/Sub adapter for cross-node message broadcasting
```

---

## Code Examples

### 1. Domain Types (`Domain/room.go`)

```go
package domain

import "time"

type Message struct {
	ID        string    `json:"id"`
	RoomID    string    `json:"room_id"`
	SenderID  string    `json:"sender_id"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
}

type Room struct {
	ID    string   `json:"id"`
	Name  string   `json:"name"`
	Users []string `json:"users"`
}
```

### 2. Application Handler (`Application/chat_service.go`)

```go
package application

import (
	"context"
	"fmt"
	"garnet/services/chat/domain"
)

type ChatService struct{}

func NewChatService() *ChatService {
	return &ChatService{}
}

func (s *ChatService) SendMessage(ctx context.Context, msg domain.Message) error {
	fmt.Printf("Publishing message to room %s\n", msg.RoomID)
	return nil
}
```

### 3. Server Entrypoint (`Api/main.go`)

```go
package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "WebSocket Endpoint")
	})

	log.Println("Chat Service running on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Server error: %v", err)
	}
}
```
