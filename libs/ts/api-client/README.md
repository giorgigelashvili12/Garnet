# Garnet API Client SDK

The **api-client** library provides a typed HTTP SDK wrapper (Axios/Fetch) for invoking backend services with automatic token refresh, retries, and error handling.

---

## Directory Structure

```plaintext
api-client/
├── README.md                       # API SDK usage documentation
└── src/
    └── index.ts                    # HTTP client wrapper entrypoint
```

---

## Code Examples

### 1. Client SDK (`src/index.ts`)

```typescript
export interface ApiClientConfig {
  baseUrl: string;
  timeoutMs?: number;
  authToken?: string;
}

export class GarnetApiClient {
  private readonly baseUrl: string;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl;
  }

  public async get<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`);
    return res.json() as Promise<T>;
  }
}
```
