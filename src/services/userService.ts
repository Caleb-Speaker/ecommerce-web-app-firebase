import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export async function getUser(uid: string) {
  const docSnap = await getDoc(doc(db, "users", uid));
  return docSnap.exists() ? docSnap.data() : null;
}

export function updateUser(uid: string, data: any) {
  return updateDoc(doc(db, "users", uid), data);
}

export function deleteUser(uid: string) {
  return deleteDoc(doc(db, "users", uid));
}