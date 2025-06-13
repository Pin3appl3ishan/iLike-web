# iLike
A modern, full-stack dating app.

## ✨ Overview
iLike is a sleek, modern dating app designed for swipe-based discovery, chat, and meaningful connections. The app features clean UI, smooth navigation, and robust API services.

## Stack	Technologies
Mobile App	Flutter (Material 2, Custom Theming, Google Fonts, Native Splash)
Web Frontend	React + TypeScript + Tailwind CSS
Backend API	Node.js + Express + MongoDB (MongoDB Atlas or Compass)
Auth	JWT (planned Firebase for chat/auth integration)
Real-Time Chat	Socket.io or Firebase (upcoming)



## 🌐 API Routes
### ✅ Auth Routes
POST /api/auth/register – Register new user

POST /api/auth/login – Authenticate and return JWT

### 📄 User Routes
GET /api/users/:id – Get a user's public profile

PUT /api/users/:id – Update a user's profile

GET /api/users – Get all users (supports swipe feed filtering)

### ❤️ Interaction Routes
POST /api/interactions/like/:id – Like another user

POST /api/interactions/dislike/:id – Dislike another user (optional)

GET /api/interactions/matches/:id – Get matched users (mutual likes)

### 🗂 Recommended Folder Structure
## 📦 Backend (/backend)

backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── interactionController.js
│   ├── models/
│   │   ├── userModel.js
│   │   └── matchModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── interactionRoutes.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── config/
│   │   └── db.js
│   └── app.js
├── .env
├── package.json
└── README.md

### 📦 Web Frontend (/frontend)

frontend/
├── src/
│   ├── components/
│   │   ├── AuthApp.tsx
│   │   ├── UserCard.tsx
│   │   └── NavBar.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Dashboard.tsx
│   ├── services/
│   │   └── api.ts
│   ├── hooks/
│   └── App.tsx
├── tailwind.config.js
├── vite.config.ts
├── package.json
└── README.md

## 🚀 How to Run
Mobile App (Flutter)
flutter pub get
flutter run

Web Frontend (React)
cd frontend
npm install
npm run dev

Backend API (Node.js + Express)
cd backend
npm install
npm run dev

📄 License
MIT License – feel free to fork, modify, and contribute!