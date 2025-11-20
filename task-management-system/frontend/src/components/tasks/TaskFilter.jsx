import React, { useState } from 'react';

const TaskFilter = ({ onFilterChange, stats }) => {
  const [filters, setFilters] = useState({
    status: '',
    search: ''
  });

  const handleChange = (e) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { status: '', search: '' };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="task-filter">
      <div className="filter-header">
        <h3>Filter Tasks</h3>
        {(filters.status || filters.search) && (
          <button onClick={clearFilters} className="btn-clear-filters">
            Clear Filters
          </button>
        )}
      </div>

      {stats && (
        <div className="stats-cards">
          <div className="stat-card stat-total">
            <span className="stat-icon">📊</span>
            <div className="stat-info">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Total Tasks</span>
            </div>
          </div>
          <div className="stat-card stat-pending">
            <span className="stat-icon">⏳</span>
            <div className="stat-info">
              <span className="stat-value">{stats.pending}</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>
          <div className="stat-card stat-progress">
            <span className="stat-icon">🔄</span>
            <div className="stat-info">
              <span className="stat-value">{stats['in-progress']}</span>
              <span className="stat-label">In Progress</span>
            </div>
          </div>
          <div className="stat-card stat-completed">
            <span className="stat-icon">✓</span>
            <div className="stat-info">
              <span className="stat-value">{stats.completed}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </div>
      )}

      <div className="filter-controls">
        <div className="form-group">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            id="search"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search tasks..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleChange}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
