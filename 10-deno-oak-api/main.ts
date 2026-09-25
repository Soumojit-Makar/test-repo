import { Application, Router } from "https://deno.land/x/oak@v16.1.0/mod.ts";

const PORT = parseInt(Deno.env.get("PORT") ?? "3000");
const startTime = Date.now();

// ── In-memory data ────────────────────────────────────────────────────────────
const quotes = [
  { id: 1, text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { id: 2, text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { id: 3, text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { id: 4, text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
];
const stats = { requests: 0, starts: 1 };
let nextQuoteId = 5;

// ── Router ────────────────────────────────────────────────────────────────────
const router = new Router();

router
  .get("/", (ctx) => {
    stats.requests++;
    ctx.response.body = {
      service: "deno-oak-api-demo",
      version: "1.0.0",
      status: "running",
      runtime: `Deno ${Deno.version.deno}`,
      timestamp: new Date().toISOString(),
      endpoints: [
        "GET  /",
        "GET  /health",
        "GET  /api/quotes",
        "POST /api/quotes",
        "GET  /api/quotes/:id",
        "GET  /api/quotes/random",
        "GET  /api/stats",
      ],
    };
  })
  .get("/health", (ctx) => {
    ctx.response.body = {
      status: "ok",
      uptime_ms: Date.now() - startTime,
    };
  })
  .get("/api/quotes", (ctx) => {
    stats.requests++;
    ctx.response.body = { quotes, total: quotes.length };
  })
  .get("/api/quotes/random", (ctx) => {
    stats.requests++;
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    ctx.response.body = q;
  })
  .get("/api/quotes/:id", (ctx) => {
    stats.requests++;
    const id = parseInt(ctx.params.id);
    const q = quotes.find((q) => q.id === id);
    if (!q) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Quote not found" };
      return;
    }
    ctx.response.body = q;
  })
  .post("/api/quotes", async (ctx) => {
    stats.requests++;
    const body = await ctx.request.body.json();
    if (!body.text || !body.author) {
      ctx.response.status = 400;
      ctx.response.body = { error: "text and author are required" };
      return;
    }
    const quote = { id: nextQuoteId++, text: body.text, author: body.author };
    quotes.push(quote);
    ctx.response.status = 201;
    ctx.response.body = quote;
  })
  .get("/api/stats", (ctx) => {
    ctx.response.body = { ...stats, quotes: quotes.length };
  });

// ── App ───────────────────────────────────────────────────────────────────────
const app = new Application();

// CORS middleware
app.use((ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  ctx.response.headers.set("Access-Control-Allow-Headers", "*");
  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 204;
    return;
  }
  return next();
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`🦕 Deno Oak API running on port ${PORT}`);
await app.listen({ port: PORT });
