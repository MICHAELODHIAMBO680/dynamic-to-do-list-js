document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Load tasks from Local Storage on page load
    loadTasks();

    // Event listener for adding a task
    addButton.addEventListener("click", () => addTask(taskInput.value));

    // Allow adding tasks with the "Enter" key
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask(taskInput.value);
        }
    });

    // Function to add a task
    function addTask(taskText, save = true) {
        const trimmedTaskText = taskText.trim(); // Trimmed outside of taskInput
        if (!trimmedTaskText) {
            alert("Please enter a task!");
            return;
        }

        // Create task item
        const taskItem = document.createElement("li");
        taskItem.textContent = trimmedTaskText;

        // Create remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn");
        removeButton.addEventListener("click", () => removeTask(taskItem, trimmedTaskText));

        // Append elements
        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        // Save task to Local Storage if required
        if (save) {
            saveTaskToLocalStorage(trimmedTaskText);
        }

        // Clear input field
        taskInput.value = "";
    }

    // Function to remove a task
    function removeTask(taskItem, taskText) {
        taskList.removeChild(taskItem);
        removeTaskFromLocalStorage(taskText);
    }

    // Save task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Remove task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        const filteredTasks = tasks.filter((task) => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    }

    // Load tasks from Local Storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks.forEach((taskText) => addTask(taskText, false)); // Pass 'false' to prevent saving again
    }
});

