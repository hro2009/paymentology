import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Task Checklist
            </h1>
            <p className="text-gray-600">
              Manage and track investigation steps for customer support
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <TaskForm />
            <TaskList />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
