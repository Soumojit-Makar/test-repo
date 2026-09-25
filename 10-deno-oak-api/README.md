# Deno + Oak API Demo

## Deploy Settings
| Field | Value |
|-------|-------|
| **Project Name** | `deno-oak-api` |
| **Build Command** | *(leave blank — no build step needed)* |
| **Start Command** | `deno run --allow-net --allow-env main.ts` |
| **Port** | `3000` |
| **Service Type** | `DYNAMIC` |
| **Mode** | Serverful **or** Serverless |

> **Note:** Deno has no `package.json` or `node_modules`. It downloads dependencies directly from URLs on first run. Make sure the container has internet access for the first start.

## Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Service info |
| GET | `/health` | Health check |
| GET | `/api/quotes` | List all quotes |
| GET | `/api/quotes/random` | Get a random quote |
| GET | `/api/quotes/:id` | Get quote by ID |
| POST | `/api/quotes` | Create quote `{text, author}` |
| GET | `/api/stats` | Request count + stats |
