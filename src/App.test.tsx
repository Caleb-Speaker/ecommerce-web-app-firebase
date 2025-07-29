import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('../firebaseConfig');

const queryClient = new QueryClient();

test('renders App without crashing', () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {}
        <App />
      </QueryClientProvider>
    </Provider>
  );

  expect(screen.getByText(/E-Commerce/i)).toBeInTheDocument();
});