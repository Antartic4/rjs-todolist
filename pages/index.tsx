import { useEffect, useState } from 'react';
import Link from 'next/link';
import { deleteTask, getTasks, updateTask } from '@/src/utils/api';
import TaskCard from '@/src/components/TaskCard';
import { Task } from '@/src/types/task';

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getTasks();
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Todo List
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Tasks: {tasks.length} | Completed: {completedTasks}
        </p>
        <div className="text-right mb-6">
          <Link
            href="/tasks/create"
            className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            + Add Task
          </Link>
        </div>
        <div className="grid gap-6">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                {...task}
                onToggle={() => {
                  updateTask(task.id, { ...task, completed: !task.completed });
                  setTasks((prev) =>
                    prev.map((t) =>
                      t.id === task.id
                        ? { ...t, completed: !task.completed }
                        : t
                    )
                  );
                }}
                onDelete={() => {
                  deleteTask(task.id);
                  setTasks((prev) => prev.filter((t) => t.id !== task.id));
                }}
                onEdit={() => (window.location.href = `/tasks/${task.id}`)}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No tasks available. Add a task to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
