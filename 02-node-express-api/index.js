const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────────────────────

app.get('/', (req, res) => {
  res.json({
    service: 'node-express-api-demo',
    version: '1.0.0',
    status: 'running',
    runtime: 'Node.js ' + process.version,
    timestamp: new Date().toISOString(),
    endpoints: [
      'GET  /',
      'GET  /health',
      'GET  /api/users',
      'POST /api/users',
      'GET  /api/users/:id',
      'GET  /api/todos',
      'POST /api/todos',
    ],
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// ── Users (in-memory) ────────────────────────────────────────────────────────
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'user' },
];
let nextUserId = 4;

app.get('/api/users', (req, res) => {
  res.json({ users, total: users.length });
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.post('/api/users', (req, res) => {
  const { name, email, role = 'user' } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }
  const user = { id: nextUserId++, name, email, role };
  users.push(user);
  res.status(201).json(user);
});

// ── Todos (in-memory) ────────────────────────────────────────────────────────
let todos = [
  { id: 1, title: 'Learn Docker', done: true },
  { id: 2, title: 'Deploy with ServerAutomation', done: false },
  { id: 3, title: 'Go serverless', done: false },
];
let nextTodoId = 4;

app.get('/api/todos', (req, res) => {
  res.json({ todos, total: todos.length });
});

app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const todo = { id: nextTodoId++, title, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.patch('/api/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  if (typeof req.body.done === 'boolean') todo.done = req.body.done;
  if (req.body.title) todo.title = req.body.title;
  res.json(todo);
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Node.js Express API running on port ${PORT}`);
});
