# 🛒 E-commerce Web App with Firebase

This is a full-featured e-commerce web application built with **React + TypeScript**, powered by **Firebase** for authentication, database, and hosting.

---

## 🚀 Features

### 🔐 Firebase Authentication
- User registration & login (email/password)
- Authentication state management using `onAuthStateChanged`
- Secure logout and session handling
- Reauthentication for sensitive actions like account deletion

### 👤 User Profile Management
- Firestore `users/{uid}` document
- View & update profile (name, address)
- Delete account (removes both Firebase Auth user and Firestore doc)

### 🛍️ Product Management (Firestore)
- All product data stored in Firestore `products` collection
- Public product listing
- Admin functionality (create, update, delete products)

### 🛒 Shopping Cart & Checkout
- Local cart state with ability to checkout
- Order is stored in Firestore under `orders/{orderId}` with user UID, items, and total

### 📦 Order History
- Authenticated users can view past orders
- Displays date, total, and list of items in each order

---

## 🔧 Tech Stack

- **React + TypeScript**
- **React Bootstrap** for UI
- **React Router** for routing
- **Firebase**:
  - Authentication
  - Firestore Database
  - Firebase Rules for secure access control

---

## 🔐 Firestore Security Rules

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users can access only their own profile
    match /users/{userId} {
      allow read, update, delete: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }

    // Orders
    match /orders/{orderId} {
      allow read: if request.auth != null && request.auth.uid == resource.data.uid;
      allow write: if request.auth != null && request.auth.uid == request.resource.data.uid;
    }

    // Pending Carts
    match /pendingCarts/{cartId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
    }

    // Products
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 🛠️ Project Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/Caleb-Speaker/ecommerce-web-app-firebase.git
   cd ecommerce-web-app-firebase
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the app**
   ```bash
   npm start
   ```

---

## 📁 Project Structure

```
src/
├── components/
│   └── ShoppingCart.tsx, ProductCard.tsx
├── context/
│   └── AuthContext.tsx
├── features/
│   └── auth/ (Login, Register, Logout)
├── pages/
│   └── Home.tsx, Checkout.tsx, OrderHistory.tsx, UserProfile.tsx
├── services/
│   └── productService.ts, orderService.ts, userService.ts
├── App.tsx
└── firebaseConfig.ts
```

---

## 📄 Authors

Caleb Speaker