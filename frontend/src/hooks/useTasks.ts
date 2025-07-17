import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';
import type { CreateTaskRequest, UpdateTaskRequest } from '../types/Task';

// Query keys
export const taskKeys = {
  all: ['tasks'] as const,
  lists: () => [...taskKeys.all, 'list'] as const,
  list: (filters: string) => [...taskKeys.lists(), { filters }] as const,
  details: () => [...taskKeys.all, 'detail'] as const,
  detail: (id: string) => [...taskKeys.details(), id] as const,
};

// Get all tasks
export const useTasks = () => {
  return useQuery({
    queryKey: taskKeys.lists(),
    queryFn: () => apiService.getTasks(),
  });
};

// Get task by ID
export const useTask = (id: string) => {
  return useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: () => apiService.getTask(id),
    enabled: !!id,
  });
};

// Search tasks
export const useSearchTasks = (query: string) => {
  return useQuery({
    queryKey: taskKeys.list(query),
    queryFn: () => apiService.searchTasks(query),
    enabled: !!query.trim(),
  });
};

// Create task
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskData: CreateTaskRequest) =>
      apiService.createTask(taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
};

// Update task
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      taskData,
    }: {
      id: string;
      taskData: UpdateTaskRequest;
    }) => apiService.updateTask(id, taskData),
    onSuccess: updatedTask => {
      // Update the specific task in cache
      queryClient.setQueryData(taskKeys.detail(updatedTask.id), updatedTask);
      // Invalidate and refetch tasks list
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
};

// Delete task
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiService.deleteTask(id),
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: taskKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
};

// Toggle task status
export const useToggleTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiService.toggleTaskStatus(id),
    onSuccess: updatedTask => {
      queryClient.setQueryData(taskKeys.detail(updatedTask.id), updatedTask);
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
};
