
class Task {
    id: number;
    text: string;
    completed: boolean;

    constructor(id: number, text: string) {
        this.id = id;
        this.text = text;
        this.completed = false;
    }
}


let tasks: Task[] = [];
let currentFilter: string = "all";
let nextId: number = 1;
let editingId: number = 0;


function addTask(): void {
    const input = document.getElementById("task-input") as HTMLInputElement;
    const text: string = input.value.trim();

    if (!text) return; 

    tasks.push(new Task(nextId, text)); 
    nextId++;
    input.value = "";
    render();
}


function toggleTask(id: number): void {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].completed = !tasks[i].completed;
        }
    }
    render();
}


function deleteTask(id: number): void {
    tasks = tasks.filter((t: Task) => t.id !== id);
    render();
}


function clearCompleted(): void {
    tasks = tasks.filter((t: Task) => !t.completed);
    render();
}
function clearAll(): void {
    tasks = [];
    render();
}


function render(): void {
    const list = document.getElementById("task-list");
    const counter = document.getElementById("counter");
    if (!list || !counter) return;

    list.innerHTML = ""; 

    
    let visibleTasks: Task[] = tasks;
    if (currentFilter === "active") {
        visibleTasks = tasks.filter((t: Task) => !t.completed);
    } else if (currentFilter === "completed") {
        visibleTasks = tasks.filter((t: Task) => t.completed);
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

            editInput.addEventListener("keydown", (e: KeyboardEvent) => {
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
        } else {
            
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

    
    const remaining: number = tasks.filter((t: Task) => !t.completed).length;
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
if (addBtn) addBtn.addEventListener("click", addTask);

const taskInput = document.getElementById("task-input");
if (taskInput) {
    taskInput.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Enter") addTask(); // Lab 3, Slide 20
    });
}

const clearCompletedBtn = document.getElementById("clear-completed");
if (clearCompletedBtn) clearCompletedBtn.addEventListener("click", clearCompleted);

const clearAllBtn = document.getElementById("clear-all");
if (clearAllBtn) clearAllBtn.addEventListener("click", clearAll);

const filterAllBtn = document.getElementById("filter-all");
if (filterAllBtn) filterAllBtn.addEventListener("click", () => { currentFilter = "all"; render(); });

const filterActiveBtn = document.getElementById("filter-active");
if (filterActiveBtn) filterActiveBtn.addEventListener("click", () => { currentFilter = "active"; render(); });

const filterCompletedBtn = document.getElementById("filter-completed");
if (filterCompletedBtn) filterCompletedBtn.addEventListener("click", () => { currentFilter = "completed"; render(); });


render();