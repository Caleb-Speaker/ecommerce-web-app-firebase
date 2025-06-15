import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart, clearCart } from '../features/cart/cartSlice';
import { Button, Table, Image, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.count * item.price, 0).toFixed(2);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    dispatch(clearCart());
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return <Alert variant="info">Your cart is empty.</Alert>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Count</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td><Image src={item.image} style={{ height: '50px' }} /></td>
              <td>{item.title}</td>
              <td>{item.count}</td>
              <td>${(item.count * item.price).toFixed(2)}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleRemove(item.id)}>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h4>Total Items: {totalItems}</h4>
      <h4>Total Price: ${totalPrice}</h4>
      <Button variant="success" onClick={handleCheckout}>Checkout</Button>
    </div>
  );
};

export default ShoppingCart;