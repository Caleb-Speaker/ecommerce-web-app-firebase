import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const mockProduct = {
  id: '1',
  title: 'Test Product',
  price: 9.99,
  description: 'Test description',
  category: 'Test category',
  image: 'test.jpg',
};

describe('ProductCard', () => {
  test('renders product title and price', () => {
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$9.99')).toBeInTheDocument();
  });

  test('renders Add to Cart button', () => {
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });
});