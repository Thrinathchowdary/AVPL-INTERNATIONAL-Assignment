import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import TaskList from '../components/tasks/TaskList';
import TaskFilter from '../components/tasks/TaskFilter';
import Notification from '../components/common/Notification';
import { taskService } from '../services/taskService';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: '',
    search: ''
  });
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchStats();
    // eslint-disable-next-line
  }, [filters]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTasks(filters);
      setTasks(response.data.tasks);
      setPagination(response.pagination);
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || 'Failed to fetch tasks',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await taskService.getTaskStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters({
      ...filters,
      ...newFilters,
      page: 1
    });
  };

  const handlePageChange = (page) => {
    setFilters({
      ...filters,
      page
    });
  };

  const handleEdit = (task) => {
    navigate('/edit-task', { state: { task } });
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskService.deleteTask(taskId);
      setNotification({
        message: 'Task deleted successfully',
        type: 'success'
      });
      fetchTasks();
      fetchStats();
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || 'Failed to delete task',
        type: 'error'
      });
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
        <div className="dashboard-header">
          <div>
            <h1 className="page-title">
              {isAdmin ? '🔐 Admin Dashboard' : '📊 My Dashboard'}
            </h1>
            <p className="page-subtitle">
              {isAdmin ? 'Manage all tasks in the system' : 'Manage your personal tasks'}
            </p>
          </div>
          <button
            onClick={() => navigate('/create-task')}
            className="btn btn-primary"
          >
            ➕ Create Task
          </button>
        </div>

        <div className="dashboard-content">
          <aside className="sidebar">
            <TaskFilter onFilterChange={handleFilterChange} stats={stats} />
          </aside>

          <section className="content-area">
            <TaskList
              tasks={tasks}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
