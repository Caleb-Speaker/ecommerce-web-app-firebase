import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

const UserProfile: React.FC = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!currentUser) return;
      const docRef = doc(db, "users", currentUser.uid);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        setName(data.name || "");
        setAddress(data.address || "");
      }
      setLoading(false);
    };
    fetchUser();
  }, [currentUser]);

  const handleUpdate = async () => {
    if (!currentUser) return;
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, { name, address });
      setMessage("Profile updated!");
    } catch (err) {
      console.error("Update failed", err);
      setMessage("Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    if (!currentUser) return;

    const password = prompt("Please re-enter your password to confirm account deletion:");

    if (!password) {
      setMessage("Account deletion cancelled.");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(currentUser.email!, password);
      await reauthenticateWithCredential(currentUser, credential);

      await deleteDoc(doc(db, "users", currentUser.uid));
      await deleteUser(currentUser);

      setMessage("Account deleted successfully.");
    } catch (err) {
      console.error("Account deletion failed", err);
      setMessage("Failed to delete account. Make sure your password is correct.");
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <div>
      <h2>User Profile</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={handleUpdate} className="me-2">
          Update Profile
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete Account
        </Button>
      </Form>
    </div>
  );
};

export default UserProfile;