import React from 'react';
import { useAuth } from '../../context/AuthContext';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const { user, isAdmin } = useAuth();
  const isOwner = task.createdBy._id === user.id;
  const canEdit = isOwner;
  const canDelete = isOwner || isAdmin;

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'in-progress':
        return 'status-progress';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`task-status ${getStatusClass(task.status)}`}>
          {task.status}
        </span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <div className="task-author">
          <span className="author-avatar">
            {task.createdBy.name.charAt(0).toUpperCase()}
          </span>
          <span className="author-name">{task.createdBy.name}</span>
        </div>
        <span className="task-date">{formatDate(task.createdAt)}</span>
      </div>

      <div className="task-actions">
        {canEdit && (
          <button
            onClick={() => onEdit(task)}
            className="btn btn-secondary btn-sm"
          >
            ✏️ Edit
          </button>
        )}
        {canDelete && (
          <button
            onClick={() => onDelete(task._id)}
            className="btn btn-danger btn-sm"
          >
            🗑️ Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
