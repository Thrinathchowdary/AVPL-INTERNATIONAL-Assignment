import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import TaskForm from '../components/tasks/TaskForm';
import Notification from '../components/common/Notification';
import { taskService } from '../services/taskService';

const CreateTask = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      await taskService.createTask(formData);
      setNotification({
        message: 'Task created successfully!',
        type: 'success'
      });
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || 'Failed to create task',
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
        <TaskForm onSubmit={handleSubmit} loading={loading} />
      </main>
    </div>
  );
};

export default CreateTask;
