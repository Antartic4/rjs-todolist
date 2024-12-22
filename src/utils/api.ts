import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const getTasks = async () => await api.get('/tasks');

export const createTask = async (data: { title: string; color: string }) =>
  await api.post('/tasks', data);

export const updateTask = async (
  id: number,
  data: { title: string; color: string; completed: boolean }
) => await api.put(`/tasks/${id}`, data);

export const deleteTask = async (id: number) =>
  await api.delete(`/tasks/${id}`);
