import { Task, CreateTaskRequest, UpdateTaskRequest, TaskStatus } from '../models/Task';

export class TaskService {
    private tasks: Task[] = [];
    private nextId: number = 1;

    // Get all tasks
    getAllTasks(): Task[] {
        return [...this.tasks];
    }

    // Get task by ID
    getTaskById(id: string): Task | null {
        return this.tasks.find(task => task.id === id) || null;
    }

    // Create a new task
    createTask(taskData: CreateTaskRequest): Task {
        const now = new Date();
        const newTask: Task = {
            id: this.nextId.toString(),
            title: taskData.title,
            description: taskData.description,
            status: TaskStatus.TODO,
            createdAt: now,
            updatedAt: now
        };

        this.tasks.push(newTask);
        this.nextId++;

        return newTask;
    }

    // Update an existing task
    updateTask(id: string, taskData: UpdateTaskRequest): Task | null {
        const taskIndex = this.tasks.findIndex(task => task.id === id);

        if (taskIndex === -1) {
            return null;
        }

        const updatedTask: Task = {
            ...this.tasks[taskIndex],
            ...taskData,
            updatedAt: new Date()
        };

        this.tasks[taskIndex] = updatedTask;
        return updatedTask;
    }

    // Delete a task
    deleteTask(id: string): boolean {
        const taskIndex = this.tasks.findIndex(task => task.id === id);

        if (taskIndex === -1) {
            return false;
        }

        this.tasks.splice(taskIndex, 1);
        return true;
    }

    // Toggle task status
    toggleTaskStatus(id: string): Task | null {
        const task = this.getTaskById(id);

        if (!task) {
            return null;
        }

        const newStatus: TaskStatus = task.status === TaskStatus.TODO ? TaskStatus.DONE : TaskStatus.TODO;
        return this.updateTask(id, { status: newStatus });
    }

    // Search tasks by title
    searchTasksByTitle(searchTerm: string): Task[] {
        const lowerSearchTerm = searchTerm.toLowerCase();
        return this.tasks.filter(task =>
            task.title.toLowerCase().includes(lowerSearchTerm)
        );
    }
} 