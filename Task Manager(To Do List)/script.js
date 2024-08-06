document.addEventListener("DOMContentLoaded", loadTasks);
document.querySelector("#task-form").addEventListener("submit", addTask);
document.querySelector(".task-list").addEventListener("click", handleTaskAction);
document.querySelector(".filter-task").addEventListener("change", filterTasks);

function addTask(event) {
    event.preventDefault();
    const taskInput = document.querySelector(".task-input");
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        const task = createTaskElement(taskText);
        document.querySelector(".task-list").appendChild(task);
        saveTask(taskText);
        taskInput.value = "";
    }
}

function createTaskElement(text) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    const taskLi = document.createElement("li");
    taskLi.innerText = text;
    taskDiv.appendChild(taskLi);

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("task-actions");
    
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeBtn.classList.add("complete-btn");
    actionsDiv.appendChild(completeBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("delete-btn");
    actionsDiv.appendChild(deleteBtn);

    taskDiv.appendChild(actionsDiv);

    return taskDiv;
}

function handleTaskAction(event) {
    const item = event.target;
    const task = item.closest(".task");

    if (item.classList.contains("delete-btn") || item.parentElement.classList.contains("delete-btn")) {
        task.remove();
        removeTask(task.firstChild.innerText);
    } else if (item.classList.contains("complete-btn") || item.parentElement.classList.contains("complete-btn")) {
        task.classList.toggle("completed");
        updateTaskStatus(task.firstChild.innerText);
    }
}

function filterTasks(event) {
    const filter = event.target.value;
    const tasks = document.querySelectorAll(".task");

    tasks.forEach(task => {
        switch (filter) {
            case "all":
                task.style.display = "flex";
                break;
            case "completed":
                task.style.display = task.classList.contains("completed") ? "flex" : "none";
                break;
            case "incomplete":
                task.style.display = task.classList.contains("completed") ? "none" : "flex";
                break;
        }
    });
}

function saveTask(task) {
    let tasks = getTasks();
    tasks.push({ text: task, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = getTasks();
    tasks.forEach(task => {
        const taskElement = createTaskElement(task.text);
        if (task.completed) {
            taskElement.classList.add("completed");
        }
        document.querySelector(".task-list").appendChild(taskElement);
    });
}

function updateTaskStatus(taskText) {
    let tasks = getTasks();
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(taskText) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}
