import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts, fetchProductsByCategory } from "../api/products";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import { Row, Col, Spinner, Alert } from "react-bootstrap";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const {
    data: products,
    isLoading: loadingProducts,
    error,
  } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () =>
      selectedCategory === "all"
        ? fetchAllProducts()
        : fetchProductsByCategory(selectedCategory),
  });
  
  const categoryOptions = ["all", "electronics", "clothing", "accessories", "home"];

  return (
    <div>
      <h2>Products</h2>

      <CategoryFilter
        categories={categoryOptions}
        selected={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {loadingProducts && <Spinner animation="border" className="mt-3" />}
      {error && <Alert variant="danger">Failed to load products.</Alert>}

      <Row className="mt-4">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product: any) => (
            <Col key={product.id} md={4} lg={3} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info">No products found.</Alert>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Home;