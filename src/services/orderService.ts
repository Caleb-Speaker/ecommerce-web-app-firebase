import { db } from "../firebaseConfig";
import { collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore";

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  createdAt: Timestamp;
  items: OrderItem[];
  total: number;
  uid: string;
}

export const saveOrder = async (uid: string, items: OrderItem[]) => {
  const order = {
    uid,
    items,
    createdAt: Timestamp.now(),
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };

  console.log("Saving order:", order);

  await addDoc(collection(db, "orders"), order);
};

export const getUserOrders = async (uid: string): Promise<Order[]> => {
  console.log("Fetching orders for UID:", uid);

  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  console.log("Query returned:", querySnapshot.docs.length, "orders");

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    console.log("Order doc:", data);
    return {
      id: doc.id,
      uid: data.uid,
      createdAt: data.createdAt,
      items: data.items,
      total: data.total,
    };
  });
};