import { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

// Mock API function for demonstration
const fetchData = async (): Promise<{ message: string }> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { message: 'Data loaded successfully!' };
};

function AppContent() {
  const [count, setCount] = useState(0);

  // Example of TanStack Query usage
  const { data, isLoading, error } = useQuery({
    queryKey: ['example-data'],
    queryFn: fetchData,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Vite + React + TanStack Query
        </h1>

        <div className="space-y-4">
          <button
            onClick={() => setCount(count => count + 1)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Count is {count}
          </button>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">
              Edit <code className="bg-gray-200 px-1 rounded">src/App.tsx</code>{' '}
              and save to test HMR
            </p>

            {/* TanStack Query example */}
            <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">
                TanStack Query Demo:
              </h3>
              {isLoading && <p className="text-blue-600">Loading data...</p>}
              {error && <p className="text-red-600">Error loading data</p>}
              {data && <p className="text-green-700">{data.message}</p>}
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Welcome to the demo app
        </p>
      </div>
    </div>
  );
}

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
