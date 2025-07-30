# 🍔 Gofood – Online Food Ordering App
Gofood is a full-stack online food ordering application that allows users to browse a menu, manage their cart, place orders, and securely authenticate themselves. It is inspired by apps like Swiggy and Zomato and built using the MERN (MongoDB, Express.js, React, Node.js) stack.

---

## 🚀 Features

- 👨‍🍳 Browse food items by category
- 🛒 Add/remove items from cart
- 🔐 Secure authentication using JWT
- 📦 Place and view orders
- 🧾 Responsive UI with React
- ☁️ Cloud deployment with MongoDB Atlas, Render, and Vercel

---

## 🛠️ Tech Stack

### 🔷 Frontend
- React.js
- React Router
- Bootstrap 5
- Context API + LocalStorage (for cart management)

### 🔶 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- bcrypt for password hashing
- JWT for authentication


---

## 📂 Project Structure

Gofood/
├── backend/
│ ├── models/ # Mongoose schemas (User, FoodItem, Order)
│ ├── routes/ # API routes (auth, food, orders)
│ ├── middleware/ # JWT token validation
│ ├── index.js # Entry point and DB connection
├── frontend/
│ ├── components/ # UI components (Navbar, Cards, Cart)
│ ├── screens/ # Pages (Home, Login, Signup)
│ ├── App.js # Route definitions
│ ├── index.js # React DOM entry

yaml
Copy
Edit

---

## ⚙️ Installation & Setup

### 🔁 Prerequisites
- Node.js and npm
- MongoDB Atlas (for database)
- Vercel or Render account (optional, for deployment)

---

### 🧪 1. Clone the Repository
```bash
git clone https://github.com/Divya090103/Gofood.git
cd Gofood
🖥️ 2. Run the Backend
bash
Copy
Edit
cd backend
npm install
Create a .env file:

bash
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Start the server:

bash
Copy
Edit
npm start
Server runs at: http://localhost:5000

🌐 3. Run the Frontend
bash
Copy
Edit
cd ../frontend
npm install
npm start
App runs at: http://localhost:3000

Made with ❤️ by Divya Agarwal
GitHub | LinkedIn | LeetCode
