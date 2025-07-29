import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { CartItem } from "../features/cart/types";
import { removeFromCart, clearCart } from "../features/cart/cartSlice";

const ShoppingCart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = async () => {
    try {
      const orderItems = cartItems.map((item: CartItem) => ({
        productId: item.id.toString(),
        name: item.title,
        quantity: item.quantity,
        price: item.price,
      }));

      console.log("Order placed:", orderItems);
      alert("Order placed successfully!");
      handleClearCart();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred during checkout.");
    }
  };

  const total = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity * item.price, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: CartItem) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} alt={item.title} width="50" />
                    {item.title}
                  </td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleRemove(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={handleCheckout}>Checkout</button>
          <button onClick={handleClearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;