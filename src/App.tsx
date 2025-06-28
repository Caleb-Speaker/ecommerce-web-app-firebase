import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import ShoppingCart from './components/ShoppingCart';
import LoginForm from '../src/features/auth/LoginForm';
import RegisterForm from '../src/features/auth/RegisterForm';
import LogoutButton from '../src/features/auth/LogoutButton';
import OrderHistory from './pages/OrderHistory';
import UserProfile from './pages/UserProfile';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { currentUser } = useAuth();

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">My Store</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
            {currentUser && (
              <>
                <Nav.Link as={Link} to="/orders">My Orders</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link> {}
              </>
            )}
          </Nav>
          <Nav>
            {currentUser ? (
              <>
                <Navbar.Text className="me-3">
                  Signed in as: {currentUser.displayName || currentUser.email}
                </Navbar.Text>
                <LogoutButton />
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/profile" element={<UserProfile />} /> {}
        </Routes>
      </Container>
    </Router>
  );
};

export default App;