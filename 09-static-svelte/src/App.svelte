<script>
  let count = 0;
  let todos = [
    { id: 1, text: 'Deploy with ServerAutomation', done: true },
    { id: 2, text: 'Try Serverless mode', done: false },
    { id: 3, text: 'Explore all 10 demo projects', done: false },
  ];
  let newTodo = '';
  let nextId = 4;

  function addTodo() {
    if (!newTodo.trim()) return;
    todos = [...todos, { id: nextId++, text: newTodo.trim(), done: false }];
    newTodo = '';
  }

  function toggleTodo(id) {
    todos = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
  }

  $: completed = todos.filter(t => t.done).length;
</script>

<main>
  <div class="card">
    <div class="logo">🔥</div>
    <h1>Svelte + Vite Static Demo</h1>
    <p class="subtitle">Deployed as a <strong>Static Site</strong> on ServerAutomation</p>

    <div class="counter-box">
      <p class="label">Click Counter</p>
      <button class="big-btn" on:click={() => count++}>
        Clicked {count} {count === 1 ? 'time' : 'times'}
      </button>
    </div>

    <div class="todo-box">
      <p class="label">Todo List ({completed}/{todos.length} done)</p>
      <div class="todo-input">
        <input bind:value={newTodo} placeholder="Add a task..." on:keydown={e => e.key === 'Enter' && addTodo()} />
        <button on:click={addTodo} class="add-btn">+</button>
      </div>
      <ul>
        {#each todos as todo (todo.id)}
          <li class:done={todo.done} on:click={() => toggleTodo(todo.id)}>
            <span class="check">{todo.done ? '✓' : '○'}</span>
            {todo.text}
          </li>
        {/each}
      </ul>
    </div>

    <div class="badge">Powered by ServerAutomation</div>
  </div>
</main>

<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }

  :global(body) {
    font-family: 'Segoe UI', system-ui, sans-serif;
    background: linear-gradient(135deg, #1c1c2e, #2d1b69, #11998e);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .card {
    background: rgba(255,255,255,0.07);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 24px;
    padding: 3rem;
    max-width: 540px;
    width: 100%;
    color: #fff;
    text-align: center;
  }

  .logo { font-size: 3rem; margin-bottom: 1rem; }
  h1 { font-size: 1.8rem; font-weight: 700; margin-bottom: 0.5rem; }
  .subtitle { color: #8892b0; margin-bottom: 2rem; }
  .subtitle strong { color: #ff3e00; }

  .label {
    font-size: 0.8rem; text-transform: uppercase;
    letter-spacing: 1px; color: #8892b0; margin-bottom: 0.75rem;
  }

  .counter-box {
    background: rgba(255,62,0,0.1);
    border: 1px solid rgba(255,62,0,0.3);
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .big-btn {
    background: linear-gradient(135deg, #ff3e00, #ff7849);
    color: #fff; border: none; border-radius: 12px;
    padding: 0.75rem 2rem; font-size: 1rem; font-weight: 600;
    cursor: pointer; transition: transform 0.15s, filter 0.15s;
  }
  .big-btn:active { transform: scale(0.95); }
  .big-btn:hover { filter: brightness(1.2); }

  .todo-box {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    padding: 1.5rem;
    text-align: left;
    margin-bottom: 1.5rem;
  }

  .todo-input { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
  input {
    flex: 1; background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 8px; padding: 0.6rem 1rem;
    color: #fff; font-size: 0.9rem;
  }
  input::placeholder { color: #8892b0; }
  input:focus { outline: none; border-color: #ff3e00; }

  .add-btn {
    background: #ff3e00; color: #fff; border: none;
    border-radius: 8px; width: 40px; height: 40px;
    font-size: 1.4rem; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
  }

  ul { list-style: none; }
  li {
    display: flex; align-items: center; gap: 0.75rem;
    padding: 0.6rem 0.5rem; border-radius: 8px;
    cursor: pointer; transition: background 0.15s;
    font-size: 0.95rem; color: #ccd6f6;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  li:hover { background: rgba(255,255,255,0.05); }
  li.done { text-decoration: line-through; color: #8892b0; }

  .check { font-size: 1rem; color: #ff3e00; width: 20px; text-align: center; }
  li.done .check { color: #42b883; }

  .badge {
    background: linear-gradient(135deg, #ff3e00, #ff7849);
    border-radius: 50px; padding: 0.5rem 1.5rem;
    font-size: 0.85rem; font-weight: 600; letter-spacing: 0.5px;
    display: inline-block;
  }
</style>
