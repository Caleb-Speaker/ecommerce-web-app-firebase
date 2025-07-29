import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav, Badge } from 'react-bootstrap';
import { Provider, useSelector } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from './pages/Home';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import UserProfile from './pages/UserProfile';
import ShoppingCart from './components/ShoppingCart';

import { store, RootState } from './redux/store';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  const queryClient = new QueryClient();

  // Access cart items from Redux
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <div>
              <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                  <Navbar.Brand as={Link} to="/">E-Commerce</Navbar.Brand>
                  <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/checkout">Checkout</Nav.Link>
                    <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
                    <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                    <Nav.Link as={Link} to="/cart">
                      Cart{' '}
                      {cartCount > 0 && (
                        <Badge bg="light" text="dark">
                          ({cartCount})
                        </Badge>
                      )}
                    </Nav.Link>
                  </Nav>
                </Container>
              </Navbar>

              <Container className="mt-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/orders" element={<OrderHistory />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/cart" element={<ShoppingCart />} />
                </Routes>
              </Container>
            </div>
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;