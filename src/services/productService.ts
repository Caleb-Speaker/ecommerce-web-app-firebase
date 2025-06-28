import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

const productsRef = collection(db, "products");

export function createProduct(data: any) {
  return addDoc(productsRef, data);
}

export async function getProducts() {
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export function updateProduct(id: string, data: any) {
  return updateDoc(doc(productsRef, id), data);
}

export function deleteProduct(id: string) {
  return deleteDoc(doc(productsRef, id));
}