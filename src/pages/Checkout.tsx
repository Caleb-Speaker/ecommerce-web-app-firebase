import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { CartItem } from '../features/cart/types';
import { clearCart, removeFromCart } from '../features/cart/cartSlice';

const Checkout: React.FC = () => {
  const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handleCheckout = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not logged in');

      const order = {
        uid: user.uid,
        createdAt: serverTimestamp(),
        items: cartItems.map((item) => ({
          productId: item.id,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
        })),
        total: totalPrice,
      };

      await addDoc(collection(db, 'orders'), order);

      dispatch(clearCart());
      navigate('/orders');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to complete checkout. Please try again.');
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
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
                <th>Actions</th> {}
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>
                    <img src={item.image} alt={item.title} height="50" />
                  </td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.quantity * item.price).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5} className="text-end fw-bold">
                  Grand Total:
                </td>
                <td className="fw-bold">${totalPrice.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          <div className="text-end">
            <button onClick={handleCheckout} className="btn btn-success">
              Confirm Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;