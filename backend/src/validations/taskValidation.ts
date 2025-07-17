import { z } from 'zod';
import { TaskStatus } from '../models/Task';

// Create task validation schema
export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters')
    .trim(),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(500, 'Description must be less than 500 characters')
    .trim(),
});

// Update task validation schema
export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title cannot be empty')
    .max(100, 'Title must be less than 100 characters')
    .trim()
    .optional(),
  description: z
    .string()
    .min(1, 'Description cannot be empty')
    .max(500, 'Description must be less than 500 characters')
    .trim()
    .optional(),
  status: z.nativeEnum(TaskStatus).optional(),
});

// Task ID validation schema
export const taskIdSchema = z.object({
  id: z
    .string()
    .min(1, 'Task ID is required')
    .regex(/^\d+$/, 'Task ID must be a number'),
});

// Search query validation schema
export const searchQuerySchema = z.object({
  q: z
    .string()
    .min(1, 'Search query is required')
    .max(50, 'Search query must be less than 50 characters')
    .trim(),
});

// Type inference for request bodies
export type CreateTaskRequest = z.infer<typeof createTaskSchema>;
export type UpdateTaskRequest = z.infer<typeof updateTaskSchema>;
export type TaskIdParams = z.infer<typeof taskIdSchema>;
export type SearchQuery = z.infer<typeof searchQuerySchema>;
