import React from 'react';
import TaskCard from './TaskCard';
import Loader from '../common/Loader';

const TaskList = ({ tasks, loading, onEdit, onDelete, pagination, onPageChange }) => {
  if (loading) {
    return <Loader />;
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No tasks found</h3>
        <p>Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {pagination && pagination.pages > 1 && (
        <div className="pagination">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            « Previous
          </button>

          <div className="pagination-info">
            Page {pagination.page} of {pagination.pages}
            <span className="pagination-total">
              ({pagination.total} total tasks)
            </span>
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
          >
            Next »
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
