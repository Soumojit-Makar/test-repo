import os
import time
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="FastAPI Demo",
    description="Demo REST API built with Python FastAPI — deploy as Serverful or Serverless",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

PORT = int(os.environ.get("PORT", 3000))
START_TIME = time.time()

# ── Schemas ───────────────────────────────────────────────────────────────────

class Task(BaseModel):
    id: Optional[int] = None
    title: str
    description: str = ""
    priority: str = "medium"  # low | medium | high
    done: bool = False

class Note(BaseModel):
    id: Optional[int] = None
    title: str
    content: str
    tags: List[str] = []

# ── In-memory store ───────────────────────────────────────────────────────────

tasks: List[Task] = [
    Task(id=1, title="Set up FastAPI", description="Install dependencies and run the server", priority="high", done=True),
    Task(id=2, title="Deploy to ServerAutomation", description="Use the platform to deploy this app", priority="high", done=False),
    Task(id=3, title="Try serverless mode", description="Toggle to serverless and see cold-start", priority="medium", done=False),
]
notes: List[Note] = [
    Note(id=1, title="Welcome", content="This is a FastAPI demo app with auto-generated Swagger docs!", tags=["intro"]),
]
next_task_id = 4
next_note_id = 2

# ── Routes ────────────────────────────────────────────────────────────────────

@app.get("/", tags=["Info"])
def root():
    return {
        "service": "python-fastapi-demo",
        "version": "1.0.0",
        "status": "running",
        "runtime": "Python/FastAPI",
        "docs": "/docs",
        "redoc": "/redoc",
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }

@app.get("/health", tags=["Info"])
def health():
    return {"status": "ok", "uptime": round(time.time() - START_TIME, 2)}

# Tasks
@app.get("/api/tasks", response_model=List[Task], tags=["Tasks"])
def list_tasks(priority: Optional[str] = None, done: Optional[bool] = None):
    result = tasks
    if priority:
        result = [t for t in result if t.priority == priority]
    if done is not None:
        result = [t for t in result if t.done == done]
    return result

@app.get("/api/tasks/{task_id}", response_model=Task, tags=["Tasks"])
def get_task(task_id: int):
    for t in tasks:
        if t.id == task_id:
            return t
    raise HTTPException(status_code=404, detail="Task not found")

@app.post("/api/tasks", response_model=Task, status_code=201, tags=["Tasks"])
def create_task(task: Task):
    global next_task_id
    task.id = next_task_id
    next_task_id += 1
    tasks.append(task)
    return task

@app.patch("/api/tasks/{task_id}", response_model=Task, tags=["Tasks"])
def update_task(task_id: int, updates: dict):
    for t in tasks:
        if t.id == task_id:
            for key, value in updates.items():
                if hasattr(t, key):
                    setattr(t, key, value)
            return t
    raise HTTPException(status_code=404, detail="Task not found")

# Notes
@app.get("/api/notes", response_model=List[Note], tags=["Notes"])
def list_notes():
    return notes

@app.post("/api/notes", response_model=Note, status_code=201, tags=["Notes"])
def create_note(note: Note):
    global next_note_id
    note.id = next_note_id
    next_note_id += 1
    notes.append(note)
    return note

# ── Entry point ───────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    print(f"⚡ FastAPI running on port {PORT}")
    uvicorn.run("main:app", host="0.0.0.0", port=PORT, reload=False)
