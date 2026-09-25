# Java Spring Boot Demo

## Deploy Settings
| Field | Value |
|-------|-------|
| **Project Name** | `java-springboot` |
| **Build Command** | `mvn clean package -DskipTests` |
| **Start Command** | `java -jar target/springboot-demo-1.0.0.jar` |
| **Port** | `3000` |
| **Service Type** | `DYNAMIC` |
| **Mode** | Serverful **or** Serverless |

> **Note:** Java has a longer cold-start time (~3-5s) compared to Node/Go.  
> Serverless mode will show this clearly on the first wake-up request.

## Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Service info |
| GET | `/health` | Health check + uptime |
| GET | `/api/employees` | List employees (filter: `?dept=Engineering`) |
| GET | `/api/employees/:id` | Get employee by ID |
| POST | `/api/employees` | Create employee `{name, dept, salary}` |
