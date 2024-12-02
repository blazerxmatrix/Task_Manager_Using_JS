// Helper to load tasks from LocalStorage
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Helper to save tasks to LocalStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task logic
if (document.getElementById('task-form')) {
    document.getElementById('task-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const tasks = getTasks();

        const newTask = {
            task_name: document.getElementById('task-name').value,
            stakeholder: document.getElementById('stakeholder').value,
            responsible: document.getElementById('responsible').value,
            due_date: document.getElementById('due-date').value,
            status: document.getElementById('status').value,
            completion_percent: parseInt(document.getElementById('completion-percent').value),
        };

        console.log('Tasks before adding new task:', tasks);
        console.log('New Task:', newTask);

        tasks.push(newTask);
        saveTasks(tasks);
        window.location.href = 'index.html';
    });
}

// Display tasks logic
if (document.getElementById('task-table')) {
    const tasks = getTasks();
    const taskTable = document.getElementById('task-table');
    const avgCompletion = document.getElementById('average-completion');

    // Populate table
    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${task.task_name}</td>
            <td>${task.stakeholder}</td>
            <td>${task.responsible}</td>
            <td>${task.due_date}</td>
            <td>${task.status}</td>
            <td>${task.completion_percent}%</td>
            <td><button onclick="deleteTask(${index})">Delete</button></td>
        `;
        taskTable.appendChild(row);
    });

    // Calculate and display average completion percentage
    const avg = tasks.length
        ? tasks.reduce((sum, task) => sum + task.completion_percent, 0) / tasks.length
        : 0;
    avgCompletion.innerHTML = `Average Completion Percentage: <span>${avg.toFixed(2)}%</span>`;
}

// Delete task logic
function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    location.reload();
}
