import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getTasks, updateTask } from '@/src/utils/api';
import TaskForm from '@/src/components/TaskForm';
import { Color, Task } from '@/src/types/task';

const validColors: Color[] = [
  'white',
  'blue',
  'red',
  'green',
  'purple',
  'yellow',
  'orange',
  'teal',
  'pink',
];

const EditTask = () => {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      const response = await getTasks();
      const currentTask = response.data.find((t: Task) => t.id === Number(id));
      if (currentTask) {
        // Validate the color or fallback to a default
        const color = validColors.includes(currentTask.color as Color)
          ? (currentTask.color as Color)
          : 'white';
        setTask({ ...currentTask, color });
      } else {
        setTask(null);
      }
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
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Edit Task
        </h1>
        {task ? (
          <TaskForm initialData={task} onSubmit={handleUpdate} />
        ) : (
          <p className="text-gray-500 text-center">Loading task...</p>
        )}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/')}
            className="bg-gray-200 text-black px-5 py-2 rounded-lg shadow hover:bg-gray-300 transition"
          >
            Back to the List
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
