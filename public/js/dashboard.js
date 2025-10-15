// Dashboard real-time updates

let refreshInterval;

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  fetchDashboardData();
  
  // Auto-refresh every 2 seconds
  refreshInterval = setInterval(fetchDashboardData, 2000);
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
});

async function fetchDashboardData() {
  try {
    // Fetch all data in parallel
    const [statsResponse, tasksResponse, queueResponse] = await Promise.all([
      fetch('/api/stats'),
      fetch('/api/tasks'),
      fetch('/api/queue/status')
    ]);

    const stats = await statsResponse.json();
    const tasks = await tasksResponse.json();
    const queue = await queueResponse.json();

    updateStats(stats.stats);
    updateTaskLists(tasks.tasks, queue.queue.tasks);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }
}

function updateStats(stats) {
  document.getElementById('totalTasks').textContent = stats.total;
  document.getElementById('pendingTasks').textContent = stats.inQueue;
  document.getElementById('processingTasks').textContent = stats.processing;
  document.getElementById('completedTasks').textContent = stats.completed;
}

function updateTaskLists(allTasks, queuedTasks) {
  // Separate tasks by status
  const processingTasks = allTasks.filter(t => t.status === 'processing');
  const completedTasks = allTasks.filter(t => t.status === 'completed').reverse(); // Most recent first

  // Update queue list
  updateQueueList(queuedTasks);
  
  // Update processing list
  updateProcessingList(processingTasks);
  
  // Update completed list
  updateCompletedList(completedTasks);
}

function updateQueueList(tasks) {
  const queueList = document.getElementById('queueList');
  const queueCount = document.getElementById('queueCount');
  
  queueCount.textContent = `${tasks.length} task${tasks.length !== 1 ? 's' : ''}`;

  if (tasks.length === 0) {
    queueList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <p>No tasks in queue</p>
      </div>
    `;
    return;
  }

  queueList.innerHTML = tasks.map((task, index) => `
    <div class="task-item status-pending">
      <div class="task-header">
        <div class="task-description">
          ${index + 1}. ${escapeHtml(task.description)}
        </div>
        <span class="task-status pending">Pending</span>
      </div>
      <div class="task-meta">
        <span class="task-time">🕐 ${formatTime(task.createdAt)}</span>
        <span>📝 ${formatTaskType(task.type)}</span>
      </div>
    </div>
  `).join('');
}

function updateProcessingList(tasks) {
  const processingList = document.getElementById('processingList');
  const processingCount = document.getElementById('processingCount');
  
  processingCount.textContent = `${tasks.length} task${tasks.length !== 1 ? 's' : ''}`;

  if (tasks.length === 0) {
    processingList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">💤</div>
        <p>No tasks being processed</p>
      </div>
    `;
    return;
  }

  processingList.innerHTML = tasks.map(task => `
    <div class="task-item status-processing">
      <div class="task-header">
        <div class="task-description">
          ⚙️ ${escapeHtml(task.description)}
        </div>
        <span class="task-status processing">Processing</span>
      </div>
      <div class="task-meta">
        <span class="task-time">🕐 Started ${formatTime(task.startedAt)}</span>
        <span>📝 ${formatTaskType(task.type)}</span>
        <span>⏱️ ${getElapsedTime(task.startedAt)}</span>
      </div>
    </div>
  `).join('');
}

function updateCompletedList(tasks) {
  const completedList = document.getElementById('completedList');
  const completedCount = document.getElementById('completedCount');
  
  completedCount.textContent = `${tasks.length} task${tasks.length !== 1 ? 's' : ''}`;

  if (tasks.length === 0) {
    completedList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🎯</div>
        <p>No completed tasks yet</p>
      </div>
    `;
    return;
  }

  // Show only last 10 completed tasks
  const recentTasks = tasks.slice(0, 10);

  completedList.innerHTML = recentTasks.map(task => {
    const responseHtml = task.response ? renderResponse(task.response) : '';
    
    return `
      <div class="task-item status-completed">
        <div class="task-header">
          <div class="task-description">
            ✅ ${escapeHtml(task.description)}
          </div>
          <span class="task-status completed">Completed</span>
        </div>
        <div class="task-meta">
          <span class="task-time">🕐 ${formatTime(task.completedAt)}</span>
          <span>📝 ${formatTaskType(task.type)}</span>
          <span>⚡ ${task.processingTime}ms</span>
        </div>
        ${responseHtml}
      </div>
    `;
  }).join('');
}

function renderResponse(response) {
  if (!response) return '';

  return `
    <div class="task-response">
      <div class="response-summary">📊 ${escapeHtml(response.summary)}</div>
      ${renderResponseData(response.data)}
      ${response.confidence ? `<div style="margin-top: 0.5rem; font-size: 0.875rem; color: #10b981;">✓ Confidence: ${(response.confidence * 100).toFixed(0)}%</div>` : ''}
    </div>
  `;
}

function renderResponseData(data) {
  if (!data) return '';

  let html = '<div class="response-data">';
  
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      html += `<div style="margin-bottom: 0.5rem;"><strong>${formatKey(key)}:</strong></div>`;
      html += '<ul style="margin-left: 1.5rem; margin-bottom: 0.5rem;">';
      value.forEach(item => {
        if (typeof item === 'object') {
          html += `<li>${JSON.stringify(item)}</li>`;
        } else {
          html += `<li>${escapeHtml(String(item))}</li>`;
        }
      });
      html += '</ul>';
    } else if (typeof value === 'object') {
      html += `<div style="margin-bottom: 0.5rem;"><strong>${formatKey(key)}:</strong></div>`;
      html += '<ul style="margin-left: 1.5rem; margin-bottom: 0.5rem;">';
      for (const [k, v] of Object.entries(value)) {
        html += `<li><strong>${formatKey(k)}:</strong> ${escapeHtml(String(v))}</li>`;
      }
      html += '</ul>';
    } else {
      html += `<div style="margin-bottom: 0.25rem;"><strong>${formatKey(key)}:</strong> ${escapeHtml(String(value))}</div>`;
    }
  }
  
  html += '</div>';
  return html;
}

function formatKey(key) {
  return key.replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, str => str.toUpperCase());
}

function formatTaskType(type) {
  return type.replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  
  return date.toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function getElapsedTime(startTime) {
  const start = new Date(startTime);
  const now = new Date();
  const elapsed = Math.floor((now - start) / 1000);
  
  return `${elapsed}s elapsed`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

