import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

interface ProductProps {
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: { rate: number; count: number };
  };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        count: 1,
      })
    );
  };

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="h-100 d-flex flex-column">
      <Card.Img
        variant="top"
        src={product.image}
        style={{ height: '200px', objectFit: 'contain' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{product.category}</Card.Subtitle>

        <Card.Text>
          {expanded ? product.description : `${product.description.slice(0, 80)}...`}
          {product.description.length > 80 && (
            <Button variant="link" onClick={toggleDescription} size="sm" className="ps-1">
              {expanded ? 'Show Less' : 'Read More'}
            </Button>
          )}
        </Card.Text>

        <Card.Text>
          <strong>${product.price}</strong> | ⭐ {product.rating.rate}
        </Card.Text>

        <div className="mt-auto">
          <Button variant="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;