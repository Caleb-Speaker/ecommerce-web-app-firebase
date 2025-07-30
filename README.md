# E-Commerce Web App

A modern React + TypeScript e-commerce application with Firebase authentication, Firestore database, and full testing & CI/CD integration.

## 🚀 Live Demo

**🌐 [Visit the Live Site](https://ecommerce-web-app-firebase-a5xc294n8-caleb-speakers-projects.vercel.app/)**

---

## 🧪 Testing

This project uses **Jest** and **React Testing Library** with full Test-Driven Development (TDD) support.

### 🔹 Unit Tests

**Component Rendering and Interaction**

- `CategoryFilter.test.tsx`: Verifies correct rendering and interaction with category buttons.
- `ProductCard.test.tsx`: Ensures product details are rendered and button interactions are handled properly.

### 🔹 Integration Test

**Home Page + Redux + Cart Functionality**

- `Home.test.tsx`: Simulates adding a product to cart from the home page using mocked API data.
- `App.test.tsx`: Asserts overall app integration including cart badge updates and navbar brand rendering.

### 🔹 Test Utility

- `test-utils.tsx`: Provides a custom render wrapper with Redux, React Query, and mocked Firebase AuthContext for reliable test isolation.

### ✅ Run All Tests

```bash
npm test -- --watchAll=false
```

---

## ⚙️ CI/CD with GitHub Actions & Vercel

### ✅ Continuous Integration (CI)

A GitHub Actions workflow located in `.github/workflows/main.yml` handles CI:

- **Triggered on**: Every push to the `main` branch.
- **Steps:**
  - Install dependencies
  - Lint and build the app
  - Run all tests with `npm test`
  - Fails the build if any test fails

### 🚀 Continuous Deployment (CD)

- **Deployment platform**: [Vercel](https://vercel.com)
- **Configured via** GitHub Actions using the Vercel CLI.
- **Environment Secrets** (configured in your GitHub repo → Settings → Secrets and variables):
  - `VERCEL_TOKEN`
  - `VERCEL_ORG_ID`
  - `VERCEL_PROJECT_ID`

- **CD Flow**:
  - Deploys to Vercel **only if** tests pass on `main`.

---

## 📦 Tech Stack

- **Frontend**: React, TypeScript, Redux Toolkit, React Query, React Bootstrap
- **Backend**: Firebase (Auth + Firestore)
- **Testing**: Jest, React Testing Library
- **CI/CD**: GitHub Actions + Vercel

---

## 📝 License

Caleb James Speaker