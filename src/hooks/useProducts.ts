// src/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts, fetchProductsByCategory } from '../api/products';

export const useProducts = (category: string) => {
  const queryKey = category === 'all' ? ['products'] : ['products', category];

  const queryFn = category === 'all'
    ? fetchAllProducts
    : () => fetchProductsByCategory(category);

  return useQuery({ queryKey, queryFn });
};