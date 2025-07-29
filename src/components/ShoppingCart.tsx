import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { CartItem } from '../features/cart/types';
import { removeFromCart, clearCart } from '../features/cart/cartSlice';
import { Table, Button, Image, Container } from 'react-bootstrap';

const ShoppingCart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <Container className="mt-4">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: CartItem) => (
                <tr key={item.id}>
                  <td>
                    <Image src={item.image} alt={item.title} width={50} rounded />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4>Total: ${total.toFixed(2)}</h4>
          <div className="d-flex gap-2">
            <Button variant="secondary" onClick={() => dispatch(clearCart())}>
              Clear Cart
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default ShoppingCart;