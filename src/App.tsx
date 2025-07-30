import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import CheckoutPage from './pages/Checkout';
import OrdersPage from './pages/OrderHistory';
import UserProfile from './pages/UserProfile';
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient();

export const AppContent = () => {
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" expand="lg">
        {/* Testable brand link */}
        <Navbar.Brand as={Link} to="/" className="fw-bold" data-testid="brand-link">
          E-Commerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/checkout">Checkout</Nav.Link>
            <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;