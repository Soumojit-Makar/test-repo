# README: Python Flask API Demo

## Deploy Settings
| Field | Value |
|-------|-------|
| **Project Name** | `python-flask-api` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `python app.py` |
| **Port** | `3000` |
| **Service Type** | `DYNAMIC` |
| **Mode** | Serverful **or** Serverless |

## Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Service info |
| GET | `/health` | Health check + uptime |
| GET | `/api/products` | List products (filter: `?category=electronics`) |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create product `{name, price, stock, category}` |
| GET | `/api/orders` | List all orders |
| POST | `/api/orders` | Create order `{product_id, quantity}` |
