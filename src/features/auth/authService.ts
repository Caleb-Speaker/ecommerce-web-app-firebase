import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,} from "firebase/auth";
import {doc, setDoc, getDoc, serverTimestamp,} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { CartItem } from "../cart/cartSlice";

// Register a new user and save to Firestore
export const registerUser = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      name,
      createdAt: serverTimestamp(),
    });

    return user;
  } catch (error: any) {
    console.error("Error registering user:", error.message);
    throw error;
  }
};

// Login existing user
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Error signing out:", error.message);
    throw error;
  }
};

// Save cart to Firestore
export const saveCartForUser = async (uid: string, cart: CartItem[]) => {
  try {
    await setDoc(doc(db, "pendingCarts", uid), {
      uid,
      cart,
      savedAt: serverTimestamp(),
    });
  } catch (error: any) {
    console.error("Error saving cart:", error.message);
    throw error;
  }
};

// Load cart from Firestore
export const loadCartForUser = async (uid: string): Promise<CartItem[]> => {
  try {
    const docRef = doc(db, "pendingCarts", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().cart || [];
    } else {
      return [];
    }
  } catch (error: any) {
    console.error("Error loading cart:", error.message);
    return [];
  }
};