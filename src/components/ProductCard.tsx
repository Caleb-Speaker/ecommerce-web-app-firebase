import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { CartItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating?: { rate: number; count: number };
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      count: 1,
    };
    dispatch(addToCart(cartItem));
  };

  const isLong = product.description.length > 100;
  const descriptionText = expanded
    ? product.description
    : product.description.slice(0, 100) + (isLong ? "..." : "");

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={product.image} alt={product.title} style={{ height: 200, objectFit: "contain" }} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">${product.price.toFixed(2)}</Card.Subtitle>
        <Card.Text>
          {descriptionText}
          {isLong && (
            <Button
              variant="link"
              size="sm"
              onClick={() => setExpanded(prev => !prev)}
              style={{ paddingLeft: 0 }}
            >
              {expanded ? "Read Less" : "Read More"}
            </Button>
          )}
        </Card.Text>
        <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;