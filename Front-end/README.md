# 🚀 ScaleX-Commerce Frontend

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Fast%20Build-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Utility--First-38B2AC?logo=tailwindcss)
![Vitest](https://img.shields.io/badge/Vitest-Testing-green?logo=vitest)
![Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## ✨ Overview

**ScaleX-Commerce Frontend** is a modern, scalable e-commerce UI built with a **feature-driven architecture**.
It provides a seamless shopping experience along with dedicated dashboards for users and sellers.

---

## 🧰 Tech Stack

* ⚛️ React 19
* ⚡ Vite
* 🧭 React Router
* 🎨 Tailwind CSS
* 🔗 Axios
* 🧪 Vitest

---

## 🔥 Features

### 🛍️ Store Experience

* Product listing with dynamic data
* Product detail pages
* Category-based browsing
* Integrated product reviews

### 🛒 Cart & Checkout

* Global cart management (Context API)
* Address management system
* Razorpay payment entry integration

### 🔐 Authentication

* Login / Register flow
* Protected routes
* Role-based access (User / Seller)

### 📊 Dashboards

* 👤 User Dashboard (profile, orders)
* 🏪 Seller Dashboard (product management ready)

### 🧩 Layout System

* Separate layouts for:

  * Main Store
  * User Panel
  * Seller Panel

---

## 🧠 Architecture

### 📌 Feature-Based Structure

```text
features/
  auth/
  product/
  review/
  store/
  user/
  seller/
  payment/
```

* Modular and scalable design
* Clear separation of concerns
* Easy to extend and maintain

---

### 🔀 Routing

Routes are organized feature-wise:

* Store routes
* Product routes
* Auth routes
* User routes
* Seller routes

📍 Main Router: `src/app/router.jsx`

---

### 🌐 State Management

Global state is handled using Context API:

* ProductProvider
* AuthProvider
* LayoutProvider
* CategoryProvider
* CartProvider
* AddressProvider

---

## 📂 Project Structure

```text
Front-end/
  src/
    app/
      App.jsx
      router.jsx
    assets/
    components/
    context/
    core/
    features/
      admin/
      auth/
      payment/
      product/
      review/
      seller/
      store/
      user/
    layout/
      MainLayout.jsx
      SellerLayout.jsx
      UserLayout.jsx
    index.css
    main.jsx
  public/
  index.html
  package.json
  vite.config.js
```

---

## ⚙️ Run Locally

```bash
npm install
npm run dev
```

📍 App runs on:
http://localhost:5173

---

## 🧪 Scripts

* `npm run dev` → Start development server
* `npm run build` → Create production build
* `npm run preview` → Preview production build
* `npm run test` → Run tests
* `npm run test:dev` → Watch mode testing
* `npm run test:coverage` → Coverage report

---

## 📸 Screenshots

> Add screenshots to improve presentation

* Home Page
* Product Page
* Cart Page
* User Dashboard
* Seller Dashboard
* Checkout Page

---

## 🚧 Future Improvements (Next Steps)

### ⚡ Performance

* Lazy loading (code splitting)
* Image optimization (lazy + WebP)
* Memoization (React.memo, useMemo)

### 🧠 State Management

* Migrate to Zustand / Redux Toolkit for scalability


### 🎨 UI/UX

* Skeleton loaders
* Toast notifications
* Better empty states

### 📱 Responsiveness

* Mobile-first improvements
* Dashboard responsiveness

### 🧪 Testing

* Component testing
* Integration testing

### 🧩 Reusability

* Build a design system (buttons, inputs, cards)

### 🚀 SEO & Accessibility

* Meta tags (React Helmet)
* Accessibility improvements (ARIA)

---


⭐ If you like this project, consider giving it a star!
