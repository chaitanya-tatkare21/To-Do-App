let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

  sortedTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <div class="task-header">
        <span class="task-text" onclick="toggleComplete(${index})">${task.text}</span>
        <button class="delete-btn" onclick="deleteTask(${index})">X</button>
      </div>
      <div class="task-meta">
        ${task.dueDate ? `📅 Due: ${task.dueDate}` : ""}
        ${task.category ? ` | 🏷️ ${task.category}` : ""}
      </div>
    `;

    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const dueDateInput = document.getElementById("dueDate");
  const categoryInput = document.getElementById("category");

  const text = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  const category = categoryInput.value;

  if (!text) {
    alert("Please enter a task.");
    return;
  }

  tasks.push({
    text,
    dueDate,
    category,
    completed: false
  });

  saveTasks();
  renderTasks();

  taskInput.value = "";
  dueDateInput.value = "";
  categoryInput.value = "";
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function clearAllTasks() {
  if (confirm("Are you sure you want to clear all tasks?")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
}

window.onload = renderTasks;



