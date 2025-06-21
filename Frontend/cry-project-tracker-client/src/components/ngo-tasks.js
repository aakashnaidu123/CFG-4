const API_URL = 'http://localhost:3000'; // Change to your actual backend URL
const token = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', () => {
  fetchTasks();
});

async function fetchTasks() {
  try {
    const response = await fetch(`${API_URL}/api/tasks/due`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const tasks = await response.json();
    displayTasks(tasks);
  } catch (error) {
    alert('Failed to load tasks: ' + error.message);
  }
}

function displayTasks(tasks) {
  const tbody = document.querySelector('#taskTable tbody');
  tbody.innerHTML = '';

  tasks.forEach(task => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${task.title}</td>
      <td>${task.description}</td>
      <td>${new Date(task.dueDate).toLocaleDateString()}</td>
      <td>${task.status}</td>
      <td>
        <select id="status-${task.id}">
          <option value="">--Select--</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Overdue">Overdue</option>
        </select>
        <button onclick="updateStatus(${task.id})">Update</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

async function updateStatus(taskId) {
  const status = document.getElementById(`status-${taskId}`).value;
  if (!status) {
    alert('Please select a status');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/tasks/${taskId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });

    const result = await response.json();
    if (response.ok) {
      alert('Status updated!');
      fetchTasks();
    } else {
      alert('Error: ' + result.error);
    }
  } catch (error) {
    alert('Failed to update: ' + error.message);
  }
}
