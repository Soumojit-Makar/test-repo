# Node.js + Express API Demo

## Deploy Settings
| Field | Value |
|-------|-------|
| **Project Name** | `node-express-api` |
| **Git URL** | *(upload this folder or push to GitHub)* |
| **Build Command** | `npm install` |
| **Start Command** | `node index.js` |
| **Port** | `3000` |
| **Service Type** | `DYNAMIC` |
| **Mode** | Serverful **or** Serverless |

## Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Service info + endpoint list |
| GET | `/health` | Health check |
| GET | `/api/users` | List all users |
| POST | `/api/users` | Create user `{name, email}` |
| GET | `/api/users/:id` | Get user by ID |
| GET | `/api/todos` | List all todos |
| POST | `/api/todos` | Create todo `{title}` |
| PATCH | `/api/todos/:id` | Update todo `{done, title}` |
