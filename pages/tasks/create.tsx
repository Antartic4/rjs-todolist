import { createTask } from '@/src/utils/api';
import TaskForm from '@/src/components/TaskForm';
import { useRouter } from 'next/router';

const CreateTask = () => {
  const router = useRouter();

  const handleCreate = async (data: { title: string; color: string }) => {
    await createTask(data);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Create Task
        </h1>
        <TaskForm onSubmit={handleCreate} />
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/')}
            className="bg-gray-200 border-black text-black px-6 py-3 rounded-lg shadow hover:bg-gray-300 transition"
          >
            Back to the List
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
