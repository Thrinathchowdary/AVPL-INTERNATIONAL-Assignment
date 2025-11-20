import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import TaskForm from '../components/tasks/TaskForm';
import Notification from '../components/common/Notification';
import { taskService } from '../services/taskService';

const EditTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const task = location.state?.task;
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  if (!task) {
    navigate('/dashboard');
    return null;
  }

  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      await taskService.updateTask(task._id, formData);
      setNotification({
        message: 'Task updated successfully!',
        type: 'success'
      });
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || 'Failed to update task',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <main className="main-content">
        <TaskForm task={task} onSubmit={handleSubmit} loading={loading} />
      </main>
    </div>
  );
};

export default EditTask;
