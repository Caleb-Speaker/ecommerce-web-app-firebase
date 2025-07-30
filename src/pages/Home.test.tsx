import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './Home';
import { store } from '../redux/store';

jest.mock('../api/products', () => ({
  fetchAllProducts: () =>
    Promise.resolve([
      {
        id: '1',
        title: 'Test Product',
        price: 20,
        description: 'A test item',
        category: 'electronics',
        image: 'test.jpg',
      },
    ]),
  fetchProductsByCategory: jest.fn(),
}));

const queryClient = new QueryClient();

describe('Home Page Integration with Redux', () => {
  test('adds item to cart via Add to Cart button', async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    );

    const addToCartButtons = await screen.findAllByRole('button', {
      name: /Add to Cart/i,
    });
    expect(addToCartButtons.length).toBeGreaterThan(0);

    fireEvent.click(addToCartButtons[0]);

    // No badge check here — it's handled in App.test.tsx
  });
});