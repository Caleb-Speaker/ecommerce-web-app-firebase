import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { CartItem } from '../features/cart/types';

const Checkout: React.FC = () => {
  const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleCheckout = () => {
    // Placeholder for checkout logic
    alert('Checkout complete!');
  };

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Item</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: CartItem) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>
                    <img
                      src={item.image || item.image || 'https://via.placeholder.com/50'}
                      alt={item.title}
                      width="50"
                    />
                  </td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} className="text-end fw-bold">
                  Grand Total:
                </td>
                <td className="fw-bold">${totalPrice.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <div className="text-end">
            <button className="btn btn-success" onClick={handleCheckout}>
              Complete Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;