import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { validate } from '../middleware/validationMiddleware';
import {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
  searchQuerySchema,
} from '../validations/taskValidation';

const router = Router();
const taskController = new TaskController();

// GET /tasks - Get all tasks
router.get('/', taskController.getAllTasks);

// GET /tasks/search - Search tasks by title
router.get(
  '/search',
  validate(searchQuerySchema, 'query'),
  taskController.searchTasks
);

// GET /tasks/:id - Get task by ID
router.get(
  '/:id',
  validate(taskIdSchema, 'params'),
  taskController.getTaskById
);

// POST /tasks - Create a new task
router.post('/', validate(createTaskSchema, 'body'), taskController.createTask);

// PUT /tasks/:id - Update a task
router.put(
  '/:id',
  validate(updateTaskSchema, 'body'),
  taskController.updateTask
);

// PATCH /tasks/:id/toggle - Toggle task status
router.patch(
  '/:id/toggle',
  validate(taskIdSchema, 'params'),
  taskController.toggleTaskStatus
);

// DELETE /tasks/:id - Delete a task
router.delete(
  '/:id',
  validate(taskIdSchema, 'params'),
  taskController.deleteTask
);

export default router;
