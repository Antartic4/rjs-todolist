import React, { useState } from 'react';

type TaskFormProps = {
  initialData?: { title: string; color: string; completed?: boolean };
  onSubmit: (data: {
    title: string;
    color: string;
    completed: boolean;
  }) => void;
};

const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSubmit }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [color, setColor] = useState(initialData?.color || 'white');
  const [completed, setCompleted] = useState(initialData?.completed ?? false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, color, completed });
  };

  const colors = [
    { name: 'White', value: 'white' },
    { name: 'Blue', value: 'blue' },
    { name: 'Red', value: 'red' },
    { name: 'Green', value: 'green' },
    { name: 'Purple', value: 'purple' },
    { name: 'Yellow', value: 'yellow' },
    { name: 'Orange', value: 'orange' },
    { name: 'Teal', value: 'teal' },
    { name: 'Pink', value: 'pink' },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 text-gray-900 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter task title"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Color</label>
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="mt-1 text-gray-900 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          {colors.map((colorOption) => (
            <option key={colorOption.value} value={colorOption.value}>
              {colorOption.name}
            </option>
          ))}
        </select>
      </div>
      {initialData && (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 focus:border-blue-500"
          />
          <label className="text-sm font-medium text-gray-700">
            Mark as Completed
          </label>
        </div>
      )}
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md font-semibold shadow-sm"
      >
        Save Task
      </button>
    </form>
  );
};

export default TaskForm;
