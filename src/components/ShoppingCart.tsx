import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeFromCart, clearCart } from "../features/cart/cartSlice";
import { Button, Table } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { saveOrder } from "../services/orderService";

const ShoppingCart = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleRemove = (id: string | number) => {
    dispatch(removeFromCart(id.toString()));
  };

  const handleCompletePurchase = async () => {
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
      alert("Purchase complete!");
      navigate("/orders");
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("An error occurred while saving your order.");
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.count * item.price, 0);

  return (
    <div>
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
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: any) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} alt={item.title} width="50" />
                  </td>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>{item.count}</td>
                  <td>${(item.count * item.price).toFixed(2)}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleRemove(item.id)}>
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
            <Button variant="success" onClick={handleCompletePurchase}>
              Complete Purchase
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;