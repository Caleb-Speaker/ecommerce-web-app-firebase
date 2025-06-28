import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB68s-8ldHC60OaGDT0slX-n1-RHmkPbEM",
  authDomain: "ecommerce-app-fe064.firebaseapp.com",
  projectId: "ecommerce-app-fe064",
  storageBucket: "ecommerce-app-fe064.appspot.com",
  messagingSenderId: "912019002662",
  appId: "1:912019002662:web:7014ec30307a4dab71dde7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);