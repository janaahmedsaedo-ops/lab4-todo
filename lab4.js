"use strict";
class Task {
    constructor(id, text) {
        this.id = id;
        this.text = text;
        this.completed = false;
    }
}
let tasks = [];
let currentFilter = "all";
let nextId = 1;
let editingId = 0;
function addTask() {
    const input = document.getElementById("task-input");
    const text = input.value.trim();
    if (!text)
        return;
    tasks.push(new Task(nextId, text));
    nextId++;
    input.value = "";
    render();
}
function toggleTask(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].completed = !tasks[i].completed;
        }
    }
    render();
}
function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    render();
}
function clearCompleted() {
    tasks = tasks.filter((t) => !t.completed);
    render();
}
function clearAll() {
    tasks = [];
    render();
}
function render() {
    const list = document.getElementById("task-list");
    const counter = document.getElementById("counter");
    if (!list || !counter)
        return;
    list.innerHTML = "";
    let visibleTasks = tasks;
    if (currentFilter === "active") {
        visibleTasks = tasks.filter((t) => !t.completed);
    }
    else if (currentFilter === "completed") {
        visibleTasks = tasks.filter((t) => t.completed);
    }
    for (let i = 0; i < visibleTasks.length; i++) {
        const task = visibleTasks[i];
        const item = document.createElement("div");
        item.className = "todo-item";
        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("click", () => toggleTask(task.id));
        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";
        deleteBtn.className = "btn-delete";
        deleteBtn.addEventListener("click", () => deleteTask(task.id));
        if (editingId === task.id) {
            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.className = "edit-input";
            editInput.value = task.text;
            editInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    if (editInput.value.trim() !== "") {
                        task.text = editInput.value.trim();
                    }
                    editingId = 0;
                    render();
                }
            });
            item.appendChild(checkbox);
            item.appendChild(editInput);
            item.appendChild(deleteBtn);
        }
        else {
            const textSpan = document.createElement("span");
            textSpan.textContent = task.text;
            textSpan.className = task.completed ? "task-text done" : "task-text";
            textSpan.addEventListener("dblclick", () => {
                editingId = task.id;
                render();
            });
            item.appendChild(checkbox);
            item.appendChild(textSpan);
            item.appendChild(deleteBtn);
        }
        list.appendChild(item);
    }
    const remaining = tasks.filter((t) => !t.completed).length;
    counter.textContent = `${remaining} ${remaining === 1 ? "item" : "items"} left`;
    const btnAll = document.getElementById("filter-all");
    const btnActive = document.getElementById("filter-active");
    const btnCompleted = document.getElementById("filter-completed");
    if (btnAll && btnActive && btnCompleted) {
        btnAll.className = (currentFilter === "all") ? "filter active" : "filter";
        btnActive.className = (currentFilter === "active") ? "filter active" : "filter";
        btnCompleted.className = (currentFilter === "completed") ? "filter active" : "filter";
    }
}
const addBtn = document.getElementById("add-btn");
if (addBtn)
    addBtn.addEventListener("click", addTask);
const taskInput = document.getElementById("task-input");
if (taskInput) {
    taskInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter")
            addTask(); // Lab 3, Slide 20
    });
}
const clearCompletedBtn = document.getElementById("clear-completed");
if (clearCompletedBtn)
    clearCompletedBtn.addEventListener("click", clearCompleted);
const clearAllBtn = document.getElementById("clear-all");
if (clearAllBtn)
    clearAllBtn.addEventListener("click", clearAll);
const filterAllBtn = document.getElementById("filter-all");
if (filterAllBtn)
    filterAllBtn.addEventListener("click", () => { currentFilter = "all"; render(); });
const filterActiveBtn = document.getElementById("filter-active");
if (filterActiveBtn)
    filterActiveBtn.addEventListener("click", () => { currentFilter = "active"; render(); });
const filterCompletedBtn = document.getElementById("filter-completed");
if (filterCompletedBtn)
    filterCompletedBtn.addEventListener("click", () => { currentFilter = "completed"; render(); });
render();
