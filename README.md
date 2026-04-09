<div align="center">
  <br>
  <h1>O P E N R O U T E R</h1>
  <p>
    <b>A self-hosted LLM API gateway.</b>
  </p>
  <p>
    <sub>
      One unified endpoint between your application and every major AI provider.
    </sub>
  </p>
  <br>
  <p>
    <img src="https://img.shields.io/badge/Node.js-111111?style=for-the-badge&logo=nodedotjs&logoColor=15803D" alt="Node.js">
    <img src="https://img.shields.io/badge/TypeScript-111111?style=for-the-badge&logo=typescript&logoColor=3178C6" alt="TypeScript">
    <img src="https://img.shields.io/badge/Next.js-111111?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
    <img src="https://img.shields.io/badge/Prisma-111111?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma">
  </p>

  <br>
  <a href="#-project-overview">Project Overview</a> ✦
  <a href="#-key-features">Key Features</a> ✦
  <a href="#-system-architecture">System Architecture</a> ✦
  <a href="#-tech-stack">Tech Stack</a>
  <br>
</div>

<hr>

## ◈ Project Overview

A unified proxy layer that centralizes access to Large Language Models. Instead of managing complex integration with multiple provider SDKs, handling inconsistent streaming outputs, or writing brittle fallback logic to handle provider outages, you point your application to a single endpoint.

The gateway absorbs the complexity of network failures, latency spikes, and routing logic. If a primary model fails, the gateway immediately reroutes the execution to a secondary model. Uptime is preserved structurally and the client never sees the error.

<br>

## ◈ Key Features

### Core Capabilities

| <kbd>01</kbd> Model Fallback                                                                                                                                  | <kbd>02</kbd> Provider Selection                                                                                                                 |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| If a target model returns an error (rate limits, downtime, context violations), the gateway automatically tries the next model in a configured priority list. | Before sending a request, the system evaluates available providers. Route prompts dynamically based on strategy (e.g., `cheapest` or `fastest`). |

| <kbd>03</kbd> Retry Policy                                                                                                                                 | <kbd>04</kbd> Streaming                                                                                                                        |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| Configurable retry behavior before escalating to full model fallback. Handles transient network errors gracefully using explicit attempts and delay logic. | Real-time token streaming via Server Sent Events. The gateway unifies provider-specific chunk formatting into a single, predictable interface. |

<br>

### Developer Tooling

**Tracers**
Full request lifecycle tracing captures which provider was selected, if a retry or fallback occurred, exact latency metrics at each stage, and absolute token usage. You gain profound insight into your pipeline behavior.

<br>

### Coming Soon

| Capability         | Impact                                                                                   |
| :----------------- | :--------------------------------------------------------------------------------------- |
| **Presets**        | Swap LLM parameters independently without compiling or pushing application code updates. |
| **Budget Limits**  | Establish spending maximums per request or per active user.                              |
| **Multimodality**  | Direct proxy compatibility for image inputs, PDF document analysis, and video.           |
| **Zero Insurance** | If all fallback routes and retries fail entirely, the execution is never billed.         |
| **BYOK**           | Unbind yourself from billing by letting end-users provide their own API keys.            |

<br>

### Implementation Comparison

| Domain             | Traditional Setup                                 | Our Gateway                                  |
| :----------------- | :------------------------------------------------ | :------------------------------------------- |
| **Integration**    | Maintaining 5+ SDKs and unique payload shapes     | A single OpenAI-compatible endpoint          |
| **Reliability**    | Application crashes during provider outages       | Automated model and provider fallbacks       |
| **Error Handling** | Bloated blocks of retry code in application logic | Centralized routing and exponential backoff  |
| **Visibility**     | Blind faith until the monthly invoice arrives     | Millisecond tracing and exact token counting |

<br>

## ◈ System Architecture

Requests flow through highly structured layers. Processing logic is deterministic, isolating faults based on origin while utilizing high-throughput data stores to protect downstream limits.

```mermaid
flowchart LR
    Req([Client Request]) --> RL{Rate Limiter}

    RL -->|Limit Exceeded| Drop[Reject 429]
    RL -->|Approved| Strat[Provider Selector]

    Strat --> Pool[(Redis Key Pool)]
    Pool --> Exec[API Execution]

    Exec -.->|Log Traces| PG[(PostgreSQL)]

    Exec -.->|Transient 5xx| Retry((Retry Policy))
    Retry -.->|Wait & Retry| Exec

    Exec ==>|Success| Stream(((Normalize & Stream)))

    Exec -.->|Hard Error| Engine{Decision Engine}

    Engine -->|Provider Exhausted| Pool
    Engine -->|Model Exhausted| Strat
    Engine -->|Client Error 4xx| DropReq[Reject: Inform User]
    Engine -->|Config Error 5xx| Alert[Alert Dev + Inform User]
```

When a request enters the gateway, it is first evaluated by a **Global Rate Limiter**. If traffic bounds are respected, the **Provider Selector** evaluates your fallback configurations to pick the optimal mathematical route (`cheapest`, `fastest`, etc.).

The execution runtime then leases the healthiest available API key from the **Redis Key Pool** (ranked dynamically by remaining TPM/RPM capacity) to hit the LLM provider.

If the API execution encounters an anomaly:

- **Transient network errors** trigger your designated retry policy with specific delays.
- **Hard provider failures** are intercepted by the **Decision Engine**. The engine temporarily evicts the bad key and cycles to the `Provider Exhausted` queue, or re-evaluates a new provider entirely (`Model Exhausted`).
- **Bad parameters (4xx)** are bounced directly back to the client.
- **Internal gateway errors (5xx)** notify engineering telemetry while returning a safe failure state to the client.

All telemetry records and trace logs are saved asynchronously to **PostgreSQL**.

<br>

## ◈ System Architecture Diagrams

<details>
<summary><b>View System Diagrams</b></summary>

<br>

<div align="center">

![Class Diagram](./docs/assets/class_diagram.png)
_Class Diagram_

![Usecase Diagram](./docs/assets/use_case_diagram.svg)
_Usecase Diagram_

![ER Diagram](./docs/assets/er_diagram.png)
_ER Diagram_

![Sequence Diagram](./docs/assets/sequence_diagram.jpeg)
_Sequence Diagram_

</div>

</details>

<br>

## ◈ Project Structure

```text
/
├── apps
│   ├── api-gateway/    — Execution router and decision logic
│   ├── dashboard/      — Administrative interface for telemetry
│   ├── devtools/       — Traces UI and system debug views
│   └── primary-backend/— Authentication and configuration state
├── packages
│   ├── config/         — Centralized system configurations
│   ├── db/             — Prisma data layer and PostgreSQL schemas
│   ├── eslint-config/  — Monorepo linting synchronization
│   ├── types/          — Inter-service TypeScript definitions
│   ├── typescript-config/ — Shared TS compilation settings
│   ├── ui/             — Shared React component library
│   └── utils/          — Standardized helper libraries
└── turbo.json          — Build orchestration
```

<br>

## ◈ Installation

**Prerequisites:** Node.js v18+, PostgreSQL.

<details>
<summary><b>Initial Setup</b></summary>

<br>

**1. Clone the repository**

```bash
git clone https://github.com/your-username/aetherroute.git
cd aetherroute
npm install
```

**2. Configure Environment**
Duplicate `.env.example` to `.env`.

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/gateway"
PORT="4000"
```

**3. Initialize Database**

```bash
npx turbo run db:generate
npx turbo run db:push
```

**4. Start**

```bash
npm run dev
```

<br>

**5. Active Port Mapping**

| Application         | Local Port |
| :------------------ | :--------- |
| **Dashboard**       | `3000`     |
| **API Gateway**     | `3001`     |
| **Primary Backend** | `4000`     |
| **DevTools**        | `4983`     |

> _Tip: Traces have a dedicated UI. Open `localhost:4983` in your browser, run a request via Postman to the API Gateway, and watch the telemetry populate in real-time._

</details>

<br>

## ◈ API Configuration

Harnessing the routing engine requires minimal declarative configuration inside standard structures.

```typescript
import { OpenRouterClient } from "@openrouter/sdk";

// Point to the local self-hosted gateway
const client = new OpenRouterClient({
  baseURL: "http://localhost:4000/v1",
  apiKey: "or-...",
});

const execute = async () => {
  const stream = await client.chat.generate({
    messages: [{ role: "user", content: "Compare system architectures." }],

    // 1. Declare the fallback hierarchy
    models: [
      "google/gemini-2.5-pro",
      "anthropic/claude-3.5-sonnet",
      "meta/llama-3-70b",
    ],

    // 2. Declare routing priorities
    routingStrategy: "fastest",
    retries: {
      attempts: 3,
      delayMs: 1500,
    },

    stream: true,
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.content);
  }
};
```

<br>

## ◈ Tech Stack

| Domain          | Technology          | Implementation Objective                                             |
| :-------------- | :------------------ | :------------------------------------------------------------------- |
| **API Gateway** | Node.js & Express   | Proxying high-throughput streams and evaluating error limits.        |
| **Type Safety** | TypeScript          | Structuring rigid data contracts across internal monorepo packages.  |
| **Monorepo**    | Turborepo           | Facilitating isolated builds and rapid cache-hitting deployments.    |
| **Database**    | PostgreSQL & Prisma | Relational data persistence for telemetry and configuration states.  |
| **Dashboard**   | Next.js 14          | Delivering a lightweight React interface for configuration tracking. |

<br>

---

<!-- <div align="center">
  <i>Maintained with ❤️ by the open source community.</i>
</div> -->
