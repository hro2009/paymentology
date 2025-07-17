import type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  ApiResponse,
} from '../types/Task';

const API_BASE_URL = '/api';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get all tasks
  async getTasks(): Promise<Task[]> {
    const response = await this.request<Task[]>('/tasks');
    return response.data || [];
  }

  // Get task by ID
  async getTask(id: string): Promise<Task> {
    const response = await this.request<Task>(`/tasks/${id}`);
    return response.data!;
  }

  // Create new task
  async createTask(taskData: CreateTaskRequest): Promise<Task> {
    const response = await this.request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
    return response.data!;
  }

  // Update task
  async updateTask(id: string, taskData: UpdateTaskRequest): Promise<Task> {
    const response = await this.request<Task>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
    return response.data!;
  }

  // Delete task
  async deleteTask(id: string): Promise<void> {
    await this.request(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  // Toggle task status
  async toggleTaskStatus(id: string): Promise<Task> {
    const response = await this.request<Task>(`/tasks/${id}/toggle`, {
      method: 'PATCH',
    });
    return response.data!;
  }

  // Search tasks
  async searchTasks(query: string): Promise<Task[]> {
    const response = await this.request<Task[]>(
      `/tasks/search?q=${encodeURIComponent(query)}`
    );
    return response.data || [];
  }

  // Health check
  async healthCheck(): Promise<{ status: string; message: string }> {
    const response = await this.request<{ status: string; message: string }>(
      '/health'
    );
    return response.data!;
  }
}

export const apiService = new ApiService();
