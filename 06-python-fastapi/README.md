# Python FastAPI Demo

## Deploy Settings
| Field | Value |
|-------|-------|
| **Project Name** | `python-fastapi` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `python main.py` |
| **Port** | `3000` |
| **Service Type** | `DYNAMIC` |
| **Mode** | Serverful **or** Serverless |

## ✨ Special Feature
FastAPI auto-generates **interactive API docs**:
- Swagger UI → `http://<your-app>/docs`
- ReDoc UI → `http://<your-app>/redoc`

## Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Service info |
| GET | `/health` | Health check |
| GET | `/api/tasks` | List tasks (filter: `?priority=high&done=false`) |
| GET | `/api/tasks/:id` | Get task by ID |
| POST | `/api/tasks` | Create task `{title, description, priority}` |
| PATCH | `/api/tasks/:id` | Update task |
| GET | `/api/notes` | List notes |
| POST | `/api/notes` | Create note `{title, content, tags}` |
