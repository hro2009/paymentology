import React from 'react';
import type { Task } from '../types/Task';
import { TaskStatus } from '../types/Task';
import { useToggleTaskStatus, useDeleteTask } from '../hooks/useTasks';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const toggleTaskStatus = useToggleTaskStatus();
  const deleteTask = useDeleteTask();

  const handleToggleStatus = () => {
    toggleTaskStatus.mutate(task.id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask.mutate(task.id);
    }
  };

  const isDone = task.status === TaskStatus.DONE;

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
        isDone ? 'border-green-500' : 'border-blue-500'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3
            className={`text-lg font-semibold mb-2 ${
              isDone ? 'line-through text-gray-600' : 'text-gray-900'
            }`}
          >
            {task.title}
          </h3>
          <p
            className={`text-sm mb-3 ${
              isDone ? 'text-gray-500' : 'text-gray-700'
            }`}
          >
            {task.description}
          </p>
          <div className="flex items-center text-xs text-gray-500 space-x-4">
            <span>
              Created: {new Date(task.createdAt).toLocaleDateString()}
            </span>
            <span>
              Updated: {new Date(task.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={handleToggleStatus}
            disabled={toggleTaskStatus.isPending}
            className={`p-2 rounded-full transition-colors ${
              isDone
                ? 'text-green-600 hover:bg-green-50'
                : 'text-blue-600 hover:bg-blue-50'
            } disabled:opacity-50`}
            title={isDone ? 'Mark as To Do' : 'Mark as Done'}
          >
            {toggleTaskStatus.isPending ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
            ) : isDone ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={handleDelete}
            disabled={deleteTask.isPending}
            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
            title="Delete task"
          >
            {deleteTask.isPending ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
