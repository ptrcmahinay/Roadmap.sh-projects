let tasks = [];

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;

  const task = {
    id: Date.now(),
    text,
    seconds: 0,
    isRunning: false,
    interval: null,
  };

  tasks.push(task);
  input.value = "";
  renderTasks();
}

function removeTask(id) {
  tasks = tasks.filter(task => {
    if (task.id === id && task.interval) clearInterval(task.interval);
    return task.id !== id;
  });
  renderTasks();
}

function toggleTimer(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      if (task.isRunning) {
        clearInterval(task.interval);
      } else {
        task.interval = setInterval(() => {
          task.seconds++;
          renderTasks();
        }, 1000);
      }
      task.isRunning = !task.isRunning;
    }
    return task;
  });
}

function resetTimer(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      clearInterval(task.interval);
      task.seconds = 0;
      task.isRunning = false;
    }
    return task;
  });
  renderTasks();
}

function formatTime(s) {
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task";

    const text = document.createElement("div");
    text.className = "task-text";
    text.textContent = task.text;

    const controls = document.createElement("div");
    controls.className = "controls";
    controls.innerHTML = `
      ⏱️ ${formatTime(task.seconds)}
      <span>
        <button onclick="toggleTimer(${task.id})">${task.isRunning ? "Pause" : "Start"}</button>
        <button onclick="resetTimer(${task.id})">Reset</button>
        <button onclick="removeTask(${task.id})">Remove</button>
      </span>
    `;

    li.appendChild(text);
    li.appendChild(controls);
    list.appendChild(li);
  });

  document.getElementById("taskCount").textContent = `Tasks: ${tasks.length}`;
}