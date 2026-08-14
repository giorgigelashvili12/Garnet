# Garnet - PSP Application

SaaS site, combining PSP, HaaS and Live chat support.

## 1. Goal

The goal is to make a modern, flexible SaaS platform, where merchants can implement payment methods directly in their applicaitions, detect fraud, implement live chat support, order hardware for their business.

## 2. Services

- Authentication & Authorization
- Commerce (Product catalog, product item, modifiers, inventory, vendors, warehouse, gift cards, mandate, custom attributes)
- Hardware (Hardware, Orders - KDS, Terminal Actions)
- Payments (Payment orchestrator, gateway adapters, ledger, settlements, payouts, refunds, disputes)
- Billing (Billing, billing credit balance, meters, AI bot usage)
- Chat (Live chat, widget + dashboard, AI chat bot, customer service analytics)
- Fraud Detection (Fraud detection engine)
- Admin (Help center, platform admin panel)

### File Structure (Including Servers and just Services)

```txt
apps/
  identity-service/
  commerce-service/
  orders-service/
  payments-orchestrator/
  gateway-adapters/
  ledger-service/
  settlement-service/
  refunds-service/
  billing-service/
  engagement-service/
  platform-admin/
  edge-gateway/
  realtime-gateway/
```

## 3. Internal Roles

### 3.1 Super Admin (garnet:super_admin)

Can do anything, tenant management, billing overrides, feature flags, audit log access.

### 3.2 Ops (garnet:ops)

View any tenant, investigate disputes, trigger manual settlement runs, can't delete any or modify billing

### 3.3 Support (garnet:support)

Read-only access to tenant data for support tickets, can view transactions but cannot modify them

### 3.4 Finance (garnet:finance)

Settlement reports, payout ledgers, no access to merchant config

### 3.5 Developer (garnet:developer)

Internal API access, can manage feature flags, cannot touch financial data

### 3.6 Tenant Owner (tenant:owner)

Full control over their own tenant, billing, team management, API keys, payout, etc.

### 3.7 Tenant Admin (tenant:admin)

Cannot access billing and payout bank account changes

### 3.8 Tenant Developer (tenant:developer)

API key manageent, webhook config, sandbox access, no access to live financial data.

### 3.9 Tenant Finance Manager (tenant:finance_manager)

Payouts, refunds, dispute responses, reports, can't touch team or configuration

### 3.10 Tenant Support Agent (tenant:support_agent)

Chat dashboard, can issue refunds up to a configures limit, view orders/customers, no payment config

### 3.11 Tenant Analyst (tenant:analyst)

Read-only access to analytics, reports or tnx history

### 3.12 Tenant Manager (tenant:manager)

Location-scoped, manages staff, shifts, inventory for assigned locations

### 3.13 POS Cashier (pos:cashier)

Create orders, accept payments, open cash register, issue receipts

### 3.14 POS Supervisor (pos:supervisor)

Cashier + apply discounts, void orders, view shift reports

### 3.15 POS Kitchen Staff (pos:kitchen_staff)

KDS only, view and bump tickets

### 3.16 POS Inventory Manager (pos:inventory_manager)

Inventory adjustment, vendor orders, warehouse operations.

## 4. Services & Models

### 4.1 Auth

List of methods:

- register
- emailVerification
- verifyemail
- login
- createSession (private)
- refresh
- logout
- removeSession
- getProfile
- oauthEntry
- forgotPassword
- updateProfile
- softDeleteAccount
- registerDevice
- generateChallenge
- verifyChallenge
- togglePin
- listSessions
- deleteDevice
- setupMfa
- verifyAndEnableMfa
- validateMfaToken
- useBackupCode
- generateRegistrationOptions
- verifyRegistration
- generateAuthOptions
- verifyAuth

### 4.2 Public API

For testing and demonstration, demo api for essential endpoints

### 4.3 Payment Orchestrator

- tokenizeCard (internal)
- detokenizeCard (internal)
- generateNetworkToken (internal)
- createPaymentIntent
- updatePaymentIntent
- confirmPaymentIntent
- capturePaymentIntent
- cancelPaymentIntent
- retrievePaymentIntent
- createPaymentMethod
- attachPaymentMethod
- detachPaymentMethod
- listPaymentMethods
- verifyMicrodeposits
- initiate3DSChallenge
- handle3DSResponse
- createTerminalAction
- cancelTerminalAction
- createGatewayConfig
- updateGatewayConfig
- evaluateRoutingRule
-

#### dev

To access the server and make requests, authentication is required, where a key is given on the dashboard. Along the key, options can be passed (Currently not defined)

```ts
// Just the key
const garnet = new Garnet("key");

// Options
const garnet = new Garnet({
    apiKey: "key",
    options: {
        something: "something",
    },
});
```


dotnet new avalonia.app -o PosTerminal

Data stores
  PostgreSQL
  CockroachD
  MongoDB
  Redis 
  ClickHouse
  Cassandra

Search & vectors
  OpenSearch
  pgvector

Messaging & streaming
  Kafka
  Debezium
  EMQX

Orchestration & mesh
  Docker
  Kubernetes
  Istio
  Temporal

Gateway & auth
  Kong
  Vault

Storage
  MinIO

Observability
  OpenTelemetry
  Jaeger
  Prometheus
  Grafana
  Loki
Developer tooling
  Nx