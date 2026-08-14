# Ambient TypeScript Definitions

The `@types` package contains shared ambient TypeScript definitions, global entity types, and cross-application interfaces.

---

## Directory Structure

```plaintext
@types/
├── README.md                       # Type definitions documentation
└── index.d.ts                      # Ambient type declarations
```

---

## Code Examples

### 1. Global Types (`index.d.ts`)

```typescript
declare namespace Garnet {
  export interface User {
    id: string;
    email: string;
    role: string;
  }

  export interface PaymentEvent {
    id: string;
    amount: number;
    currency: string;
    status: string;
  }
}
```
