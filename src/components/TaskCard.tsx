import React from 'react';

type TaskCardProps = {
  id: number;
  title: string;
  color: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  color,
  completed,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the task "${title}"?`
    );
    if (confirmed) {
      onDelete();
    }
  };

  return (
    <div
      className={`flex justify-between items-center p-6 rounded-lg shadow-md bg-${color}-100 border-l-4 border-${color}-500 hover:shadow-lg transition-transform transform hover:scale-105`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
          className="mr-4 h-6 w-6 accent-${color}-500 rounded-full"
        />
        <span
          className={`text-lg font-medium ${
            completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {title}
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={onEdit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-blue-600 transition"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
