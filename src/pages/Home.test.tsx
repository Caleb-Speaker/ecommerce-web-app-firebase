import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('../firebaseConfig');

const queryClient = new QueryClient();

describe('Home Page Integration with Redux', () => {
  it('adds item to cart and updates cart count', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    );

    // Find and click "Add to Cart" button
    const addToCartButtons = await screen.findAllByText(/Add to Cart/i);
    fireEvent.click(addToCartButtons[0]);

    // Wait for cart counter to appear (combined Cart(1) text)
    await waitFor(() => {
      expect(
        screen.getByText((content, element) => {
          return element?.textContent?.replace(/\s/g, '') === 'Cart(1)';
        })
      ).toBeInTheDocument();
    });
  });
});