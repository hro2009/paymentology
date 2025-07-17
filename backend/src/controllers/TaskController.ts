import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';
import {
  CreateTaskRequest,
  UpdateTaskRequest,
} from '../validations/taskValidation';

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  // GET /tasks - Get all tasks
  getAllTasks = (req: Request, res: Response): void => {
    try {
      const tasks = this.taskService.getAllTasks();
      res.status(200).json({
        success: true,
        data: tasks,
        count: tasks.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve tasks',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  // GET /tasks/:id - Get task by ID
  getTaskById = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const task = this.taskService.getTaskById(id);

      if (!task) {
        res.status(404).json({
          success: false,
          message: 'Task not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve task',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  // POST /tasks - Create a new task
  createTask = (req: Request, res: Response): void => {
    try {
      const taskData: CreateTaskRequest = req.body;
      const newTask = this.taskService.createTask(taskData);

      res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: newTask,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to create task',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  // PUT /tasks/:id - Update a task
  updateTask = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const updateData: UpdateTaskRequest = req.body;

      const updatedTask = this.taskService.updateTask(id, updateData);

      if (!updatedTask) {
        res.status(404).json({
          success: false,
          message: 'Task not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: updatedTask,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update task',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  // DELETE /tasks/:id - Delete a task
  deleteTask = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const deleted = this.taskService.deleteTask(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Task not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Task deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete task',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  // PATCH /tasks/:id/toggle - Toggle task status
  toggleTaskStatus = (req: Request, res: Response): void => {
    try {
      const { id } = req.params;
      const updatedTask = this.taskService.toggleTaskStatus(id);

      if (!updatedTask) {
        res.status(404).json({
          success: false,
          message: 'Task not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Task status toggled successfully',
        data: updatedTask,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to toggle task status',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  // GET /tasks/search?q=searchTerm - Search tasks by title
  searchTasks = (req: Request, res: Response): void => {
    try {
      const { q } = req.query as { q: string };
      const tasks = this.taskService.searchTasksByTitle(q);

      res.status(200).json({
        success: true,
        data: tasks,
        count: tasks.length,
        searchTerm: q,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to search tasks',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };
}
