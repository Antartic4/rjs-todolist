import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getTasks, updateTask } from '@/src/utils/api';
import TaskForm from '@/src/components/TaskForm';

type Task = {
  id: number;
  title: string;
  color: string;
  completed: boolean;
};

const EditTask = () => {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      const response = await getTasks();
      const currentTask = response.data.find((t: Task) => t.id === Number(id));
      setTask(currentTask || null);
    };
    if (id) {
      fetchTask();
    }
  }, [id]);

  const handleUpdate = async (data: {
    title: string;
    color: string;
    completed: boolean;
  }) => {
    if (task) {
      await updateTask(Number(id), { ...task, ...data });
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Edit Task
        </h1>
        {task ? (
          <TaskForm initialData={task} onSubmit={handleUpdate} />
        ) : (
          <p className="text-gray-500 text-center">Loading task...</p>
        )}
      </div>
    </div>
  );
};

export default EditTask;
