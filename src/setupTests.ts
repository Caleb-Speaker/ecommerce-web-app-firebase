import '@testing-library/jest-dom';

// Mock Firebase Auth
jest.mock('firebase/auth', () => ({
  getAuth: () => ({}),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback(null); // simulate logged-out
    return jest.fn(); // returns a mock unsubscribe
  }),
}));

// Mock Firebase Firestore
jest.mock('firebase/firestore', () => ({
  getFirestore: () => ({}),
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
}));

// Mock Firebase config
jest.mock('./firebaseConfig', () => ({
  auth: {},
  db: {},
}));