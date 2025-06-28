import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const fetchCategories = async (): Promise<string[]> => {
  const snapshot = await getDocs(collection(db, "products"));
  const allProducts = snapshot.docs.map(doc => doc.data());
  const categories = Array.from(new Set(allProducts.map(p => p.category)));
  return categories;
};