# 🚀 Demo Projects — ServerAutomation

A collection of **10 ready-to-deploy demo projects** covering all major frameworks.  
Each project works in both **Serverful** and **Serverless** mode (except Static sites).

---

## 📦 Project Catalog

| # | Folder | Framework | Type | Build Command | Start Command |
|---|--------|-----------|------|---------------|---------------|
| 01 | `01-static-vite-react` | React + Vite | **STATIC** | `npm install && npm run build` | — |
| 02 | `02-node-express-api` | Node.js + Express | **DYNAMIC** | `npm install` | `node index.js` |
| 03 | `03-python-flask-api` | Python + Flask | **DYNAMIC** | `pip install -r requirements.txt` | `python app.py` |
| 04 | `04-go-gin-api` | Go + Gin | **DYNAMIC** | `go build -o app .` | `./app` |
| 05 | `05-node-nextjs-ssr` | Next.js SSR | **DYNAMIC** | `npm install && npm run build` | `npm start` |
| 06 | `06-python-fastapi` | Python + FastAPI | **DYNAMIC** | `pip install -r requirements.txt` | `python main.py` |
| 07 | `07-java-springboot` | Java + Spring Boot | **DYNAMIC** | `mvn clean package -DskipTests` | `java -jar target/springboot-demo-1.0.0.jar` |
| 08 | `08-static-vue-vite` | Vue 3 + Vite | **STATIC** | `npm install && npm run build` | — |
| 09 | `09-static-svelte` | Svelte + Vite | **STATIC** | `npm install && npm run build` | — |
| 10 | `10-deno-oak-api` | Deno + Oak | **DYNAMIC** | — | `deno run --allow-net --allow-env main.ts` |

> All dynamic projects listen on the `PORT` environment variable (default: `3000`).

---

## 🏃 How to Deploy Each Project

1. **Open** the ServerAutomation UI at `http://localhost:3001`
2. Click **New Project**
3. Fill in the fields from the table above
4. Choose **Serverful** or **Serverless** mode
5. Hit **Deploy** and watch the live logs!

---

## 🔥 What Each Demo Shows

### Static Sites (01, 08, 09)
- Built with Vite → produces `dist/` folder
- Uploaded to MinIO (S3-compatible storage)
- Served via reverse proxy — **no running container**
- ✅ Best for: portfolios, marketing pages, SPAs

### Dynamic APIs (02, 03, 04, 06, 10)
- Start a real HTTP server on port 3000
- In-memory CRUD data (users, products, books, tasks, quotes)
- All have a `/health` and `/` endpoint
- ✅ Best for: REST APIs, microservices

### SSR App (05)
- Next.js runs `getServerSideProps` — renders on server per request
- Shows server timestamp that changes on every refresh
- ✅ Best for: dynamic pages, personalized content

### Java Spring Boot (07)
- Slower cold-start (~3-5s) — great to demonstrate **serverless warm-up**
- Full REST API with employees CRUD
- ✅ Best for: enterprise Java showcases

---

## ⚡ Serverless vs Serverful

| Feature | Serverful | Serverless |
|---------|-----------|------------|
| Container | Always running | Stopped when idle |
| First request | Instant | Cold start (1-10s) |
| Resource use | Always allocated | Only when active |
| Cost model | Fixed | Pay-per-use |
| Best for | High-traffic apps | Low-traffic / dev |

---

## 📂 Folder Structure

```
demo-projects/
├── README.md                    ← This file
├── 01-static-vite-react/        ← React SPA
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
├── 02-node-express-api/         ← Express REST API
│   ├── package.json
│   └── index.js
├── 03-python-flask-api/         ← Flask REST API
│   ├── requirements.txt
│   └── app.py
├── 04-go-gin-api/               ← Go Gin REST API
│   ├── go.mod
│   └── main.go
├── 05-node-nextjs-ssr/          ← Next.js SSR
│   ├── package.json
│   ├── next.config.js
│   └── pages/
├── 06-python-fastapi/           ← FastAPI + Swagger
│   ├── requirements.txt
│   └── main.py
├── 07-java-springboot/          ← Spring Boot
│   ├── pom.xml
│   └── src/
├── 08-static-vue-vite/          ← Vue 3 SPA
│   ├── package.json
│   ├── vite.config.js
│   └── src/
├── 09-static-svelte/            ← Svelte SPA + Todo
│   ├── package.json
│   ├── vite.config.js
│   └── src/
└── 10-deno-oak-api/             ← Deno + Oak API
    ├── main.ts
    └── README.md
```
