import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithQueryClient = (component: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};

describe('App', () => {
  it('renders without crashing', () => {
    renderWithQueryClient(<App />);
    expect(
      screen.getByText(/Vite \+ React \+ TanStack Query/i)
    ).toBeInTheDocument();
  });

  it('displays the count button', () => {
    renderWithQueryClient(<App />);
    expect(
      screen.getByRole('button', { name: /count is/i })
    ).toBeInTheDocument();
  });

  it('displays the TanStack Query demo section', () => {
    renderWithQueryClient(<App />);
    expect(screen.getByText(/TanStack Query Demo:/i)).toBeInTheDocument();
  });
});
