import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserOrders, Order } from "../services/orderService";
import { Alert, Card, Spinner } from "react-bootstrap";

const OrderHistory: React.FC = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;

    if (!currentUser) {
      setError("You must be logged in to view past orders.");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const userOrders = await getUserOrders(currentUser.uid);
        setOrders(userOrders);
      } catch {
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser, authLoading]);

  if (authLoading || loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!orders.length) return <Alert variant="info">No past orders found.</Alert>;

  return (
    <div>
      <h2 className="mb-4">Your Order History</h2>
      {orders.map((order) => (
        <Card key={order.id} className="mb-3">
          <Card.Body>
            <Card.Title>
              Order on {order.createdAt.toDate().toLocaleString()}
            </Card.Title>
            <Card.Text>
              <strong>Total:</strong> ${order.total.toFixed(2)}
            </Card.Text>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.quantity} x {item.name} @ ${item.price}
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default OrderHistory;