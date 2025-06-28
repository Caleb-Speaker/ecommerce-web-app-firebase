import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { saveOrder } from "../services/orderService";
import { Button, Alert, Table } from "react-bootstrap";

const Checkout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleCheckout = async () => {
    if (!currentUser) {
      alert("Please log in to complete your purchase.");
      return;
    }

    try {
      const orderItems = cartItems.map(item => ({
        productId: item.id.toString(), 
        name: item.title,
        quantity: item.count,
        price: item.price,
      }));

      await saveOrder(currentUser.uid, orderItems);
      dispatch(clearCart());
      alert("Checkout complete! Your order has been saved.");
      navigate("/orders");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred while checking out.");
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.count * item.price, 0);

  return (
    <div>
      <h2>Checkout</h2>

      {cartItems.length === 0 ? (
        <Alert variant="info">Your cart is empty.</Alert>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.count}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.count * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h4>Total: ${total.toFixed(2)}</h4>
          <Button variant="primary" onClick={handleCheckout}>
            Complete Purchase
          </Button>
        </>
      )}
    </div>
  );
};

export default Checkout;