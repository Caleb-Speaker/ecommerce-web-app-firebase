import { Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <Alert variant="success">
        <h2>Checkout Complete 🎉</h2>
        <p>Your cart has been cleared. Thank you for shopping!</p>
      </Alert>
      <Button variant="primary" onClick={() => navigate('/')}>Return to Home</Button>
    </div>
  );
};

export default Checkout;