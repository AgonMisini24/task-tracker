let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks = tasks.map(function (task) {
  if (typeof task === "string") {
    return { text: task, completed: false };
  }
  return task;
});
let totalTasks = tasks.length;

const addButton = document.getElementById("addButton");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

function renderTask(task) {
  const newTask = document.createElement("li");
  newTask.textContent = task.text;

  if (task.completed) {
    newTask.classList.add("done");
  }

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation();

    const taskIndex = tasks.indexOf(task);

    if (taskIndex > -1) {
      tasks.splice(taskIndex, 1);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskList.removeChild(newTask);

    totalTasks--;
    taskCount.textContent = `Tasks: ${totalTasks}`;
  });

  newTask.appendChild(deleteButton);

  newTask.addEventListener("click", function () {
    task.completed = !task.completed;
    newTask.classList.toggle("done");
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  taskList.appendChild(newTask);
}

addButton.addEventListener("click", function () {
  if (taskInput.value.trim() === "") {
    alert("Please enter a task.");
    return;
  }

  const taskText = taskInput.value.trim();
  const task = { text: taskText, completed: false };

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTask(task);

  taskInput.value = "";

  totalTasks++;
  taskCount.textContent = `Tasks: ${totalTasks}`;
});

tasks.forEach((task) => {
  renderTask(task);
});
taskCount.textContent = `Tasks: ${totalTasks}`;
