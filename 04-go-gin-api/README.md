# Go + Gin API Demo

## Deploy Settings
| Field | Value |
|-------|-------|
| **Project Name** | `go-gin-api` |
| **Build Command** | `go build -o app .` |
| **Start Command** | `./app` |
| **Port** | `3000` |
| **Service Type** | `DYNAMIC` |
| **Mode** | Serverful **or** Serverless |

## Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Service info |
| GET | `/health` | Health check + uptime |
| GET | `/api/books` | List books (filter: `?genre=tech`) |
| GET | `/api/books/:id` | Get book by ID |
| POST | `/api/books` | Create book `{title, author, genre, price, stock}` |
| GET | `/api/reviews` | List all reviews |
| POST | `/api/reviews` | Create review `{book_id, rating, text}` |
