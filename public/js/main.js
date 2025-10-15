// Task submission page logic

const taskForm = document.getElementById('taskForm');
const submitBtn = document.getElementById('submitBtn');
const notification = document.getElementById('notification');

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(taskForm);
  const data = {
    description: formData.get('description'),
    type: formData.get('type')
  };

  // Disable button and show loading
  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').style.display = 'none';
  submitBtn.querySelector('.btn-loader').style.display = 'inline';
  hideNotification();

  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      showNotification('success', `✅ Task submitted successfully! Task ID: ${result.task.id.substring(0, 8)}...`);
      taskForm.reset();
      
      // Suggest going to dashboard
      setTimeout(() => {
        showNotification('success', '📊 View your task progress on the <a href="/dashboard" style="color: #065f46; text-decoration: underline;">Dashboard</a>');
      }, 2000);
    } else {
      showNotification('error', `❌ Error: ${result.error}`);
    }
  } catch (error) {
    console.error('Error submitting task:', error);
    showNotification('error', '❌ Failed to submit task. Please try again.');
  } finally {
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').style.display = 'inline';
    submitBtn.querySelector('.btn-loader').style.display = 'none';
  }
});

function showNotification(type, message) {
  notification.className = `notification ${type}`;
  notification.innerHTML = message;
  notification.style.display = 'block';
}

function hideNotification() {
  notification.style.display = 'none';
}

