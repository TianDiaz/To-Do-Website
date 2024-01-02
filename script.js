
    document.addEventListener('DOMContentLoaded', function () {
            const todoForm = document.getElementById('todoForm');
            const taskInput = document.getElementById('taskInput');
            const taskList = document.getElementById('taskList');

            todoForm.addEventListener('submit', function (event) {
                event.preventDefault();
                const taskText = sentenceCase(taskInput.value);
                addTaskWithState(taskText);
                saveTasksToLocalStorage();
                taskInput.value = '';
            });

            function deleteTask(btn) {
                const listItem = btn.closest('.task-item');
                listItem.remove();
            }

            function toggleStrikethrough(taskItem) {
                const span = taskItem.querySelector('span');
                span.style.textDecoration = taskItem.querySelector('.task-checkbox').checked ? 'line-through' : 'none';
            }

            function saveTasksToLocalStorage() {
                const tasks = [];
                const taskItems = document.querySelectorAll('.task-item');
                taskItems.forEach(function (taskItem) {
                    tasks.push({
                        text: taskItem.querySelector('span').innerText,
                        checked: taskItem.querySelector('.task-checkbox').checked,
                    });
                });
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }

            function loadTasksFromLocalStorage() {
                const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                tasks.forEach(function (task) {
                    addTaskWithState(task.text, task.checked);
                });
            }

            function addTaskWithState(taskText, isChecked) {
                const li = document.createElement('li');
                li.className = 'task-item';
                li.innerHTML = `
                    <input type="checkbox" class="task-checkbox" ${isChecked ? 'checked' : ''}>
                    <span style="text-decoration: ${isChecked ? 'line-through' : 'none'}">${taskText}</span>
                    <button class="delete-btn">Delete</button>
                `;
                taskList.appendChild(li);

                li.querySelector('.delete-btn').addEventListener('click', function () {
                    deleteTask(li);
                    saveTasksToLocalStorage();
                });

                // Add event listener for the checkbox to toggle strikethrough
                li.querySelector('.task-checkbox').addEventListener('change', function () {
                    toggleStrikethrough(li);
                    saveTasksToLocalStorage();
                });
            }

            function sentenceCase(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }
            

            loadTasksFromLocalStorage();
        });
