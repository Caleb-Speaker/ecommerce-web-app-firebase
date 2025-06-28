import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

// Fetch all products
export const fetchAllProducts = async () => {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Fetch products by category
export const fetchProductsByCategory = async (category: string) => {
  const q = query(collection(db, "products"), where("category", "==", category));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};