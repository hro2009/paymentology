import React, { useState } from 'react';
import { TaskCard } from './TaskCard';
import { SearchBar } from './SearchBar';
import { useTasks, useSearchTasks } from '../hooks/useTasks';
import { TaskStatus } from '../types/Task';
import { ClipboardList, CheckCircle } from 'lucide-react';

export const TaskList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: allTasks,
    isLoading: isLoadingAll,
    error: allTasksError,
  } = useTasks();
  const { data: searchResults, isLoading: isLoadingSearch } =
    useSearchTasks(searchQuery);

  const tasks = searchQuery.trim() ? searchResults : allTasks;
  const isLoading = isLoadingAll || (searchQuery.trim() && isLoadingSearch);

  const todoTasks =
    tasks?.filter(task => task.status === TaskStatus.TODO) || [];
  const doneTasks =
    tasks?.filter(task => task.status === TaskStatus.DONE) || [];

  if (allTasksError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Error loading tasks
            </h3>
            <div className="mt-2 text-sm text-red-700">
              {allTasksError.message ||
                'Failed to load tasks. Please try again.'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="max-w-md">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading tasks...</span>
        </div>
      )}

      {!isLoading && tasks?.length === 0 && (
        <div className="text-center py-8">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No tasks found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery.trim()
              ? `No tasks match "${searchQuery}"`
              : 'Get started by creating a new task.'}
          </p>
        </div>
      )}

      {!isLoading && tasks && tasks.length > 0 && (
        <div className="space-y-6">
          {/* To Do Tasks */}
          <div>
            <div className="flex items-center mb-4">
              <ClipboardList className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">
                To Do ({todoTasks.length})
              </h2>
            </div>
            {todoTasks.length > 0 ? (
              <div className="space-y-4">
                {todoTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg">
                <ClipboardList className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">No tasks to do</p>
              </div>
            )}
          </div>

          {/* Done Tasks */}
          <div>
            <div className="flex items-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">
                Done ({doneTasks.length})
              </h2>
            </div>
            {doneTasks.length > 0 ? (
              <div className="space-y-4">
                {doneTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg">
                <CheckCircle className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">No completed tasks</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
