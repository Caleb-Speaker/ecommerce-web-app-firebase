import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts, fetchProductsByCategory } from '../api/products';
import { fetchCategories } from '../api/categories';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const {
    data: products,
    isLoading: loadingProducts,
    error,
  } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () =>
      selectedCategory === 'all'
        ? fetchAllProducts()
        : fetchProductsByCategory(selectedCategory),
  });

  const categoryOptions = Array.isArray(categories)
    ? ['all', ...categories]
    : ['all'];

  return (
    <div>
      <h2>Products</h2>

      {loadingCategories ? (
        <Spinner animation="border" />
      ) : (
        <CategoryFilter
          categories={categoryOptions}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      )}

      {loadingProducts && <Spinner animation="border" className="mt-3" />}
      {error && <Alert variant="danger">Failed to load products.</Alert>}

      <Row className="mt-4">
        {Array.isArray(products) &&
          products.map((product: any) => (
            <Col key={product.id} md={4} lg={3} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Home;