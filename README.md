# iLike - Modern Dating App Platform

A full-stack dating application built with **React + TypeScript** frontend and **Node.js + Express + MongoDB** backend, featuring real-time chat capabilities with Socket.IO.

![iLike Platform](https://img.shields.io/badge/Platform-Dating%20App-blue)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-61dafb)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933)
![Database](https://img.shields.io/badge/Database-MongoDB-47a248)
![Real-time](https://img.shields.io/badge/Real--time-Socket.IO-010101)

## 🚀 Features

### 💕 Core Dating Features

- **User Authentication & Authorization** - Secure JWT-based authentication
- **Profile Management** - Complete user profiles with photos and preferences
- **Smart Matching Algorithm** - Location and preference-based matching
- **Like/Dislike System** - Swipe-based interaction like popular dating apps
- **Match Notifications** - Real-time notifications when users match
- **User Discovery** - Explore potential matches with advanced filtering

### 💬 Real-Time Chat System

- **Instant Messaging** - Real-time chat with Socket.IO
- **Typing Indicators** - See when someone is typing
- **Read Receipts** - Know when messages are read
- **Message Status** - Sent, delivered, read tracking
- **Chat History** - Persistent message storage
- **Online Status** - Real-time user availability

### 🎨 Modern UI/UX

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Material Design** - Clean, modern interface
- **Dark/Light Themes** - User preference support
- **Smooth Animations** - Engaging user experience
- **Accessibility** - WCAG compliant design

### 🔒 Security & Performance

- **JWT Authentication** - Secure token-based auth
- **Input Validation** - Comprehensive data validation
- **Error Handling** - Graceful error management
- **Rate Limiting** - API protection
- **Image Upload** - Secure file handling
- **CORS Configuration** - Cross-origin security

## 🏗️ Architecture

### Frontend (React + TypeScript)

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── context/       # React context providers
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API service layer
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
```

### Backend (Node.js + Express)

```
backend/
├── controllers/       # Request handlers
├── models/           # MongoDB schemas
├── routes/           # API route definitions
├── middleware/       # Custom middleware
├── socket/           # Socket.IO real-time logic
├── uploads/          # File upload storage
└── tests/            # Test files
```

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time communication

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Socket.IO** - Real-time bidirectional communication
- **JWT** - Authentication tokens
- **Multer** - File upload handling
- **Jest** - Testing framework

### DevOps & Tools

- **Git** - Version control
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing
- **Postman** - API testing

## 📦 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Pin3appl3ishan/ilike-web.git
cd ilike-web
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables
# Edit .env with your MongoDB URI, JWT secret, etc.

# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables
# Edit .env with your backend API URL

# Start development server
npm run dev
```

### 4. Database Setup

```bash
# Ensure MongoDB is running
mongod

# The application will automatically create collections
# when you first register a user
```

## 🔧 Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ilike

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

# CORS
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000

# App Configuration
VITE_APP_NAME=iLike
VITE_APP_VERSION=1.0.0
```

## 📚 API Documentation

### Authentication Endpoints

```http
POST /api/users/register    # Register new user
POST /api/users/login       # User login
GET  /api/users/profile     # Get user profile
PUT  /api/users/profile     # Update user profile
POST /api/users/logout      # User logout
```

### Profile Endpoints

```http
GET  /api/profile           # Get user profile
POST /api/profile           # Create profile
PUT  /api/profile           # Update profile
POST /api/profile/photo     # Upload profile photo
```

### Matching Endpoints

```http
GET  /api/matches/potential # Get potential matches
POST /api/matches/like      # Like a user
POST /api/matches/dislike   # Dislike a user
GET  /api/matches/matches   # Get mutual matches
GET  /api/matches/likes     # Get received likes
GET  /api/matches/likes-sent # Get sent likes
```

### Chat Endpoints

```http
GET  /api/chats             # Get all chats
POST /api/chats             # Create new chat
GET  /api/chats/:chatId     # Get specific chat
GET  /api/chats/:chatId/messages # Get chat messages
POST /api/chats/:chatId/messages # Send message
PUT  /api/chats/:chatId/read # Mark messages as read
DELETE /api/chats/:chatId   # Delete chat
```

### Socket.IO Events

```javascript
// Client to Server
socket.emit("join_chat", chatId);
socket.emit("leave_chat", chatId);
socket.emit("typing_start", { chatId });
socket.emit("typing_stop", { chatId });
socket.emit("send_message", { chatId, content, type });
socket.emit("mark_read", { chatId });

// Server to Client
socket.on("new_message", messageData);
socket.on("message_sent", messageData);
socket.on("user_typing", { userId, chatId, isTyping });
socket.on("messages_read", { chatId, readBy, timestamp });
socket.on("chat_updated", chatData);
```

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Frontend Tests

```bash
cd frontend

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🚀 Deployment

### Backend Deployment (Heroku)

```bash
# Add Heroku remote
heroku git:remote -a your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📱 Mobile App Integration

This web platform is designed to work seamlessly with the companion Flutter mobile app:

- **Shared Backend** - Same API endpoints and Socket.IO server
- **Real-time Sync** - Messages and matches sync across platforms
- **Unified Authentication** - Single sign-on across web and mobile
- **Consistent UX** - Similar user experience on all platforms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests
- Use conventional commit messages
- Update documentation for new features
- Ensure responsive design
- Test on multiple browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Developer** - React & TypeScript expertise
- **Backend Developer** - Node.js & MongoDB expertise
- **UI/UX Designer** - Modern, accessible design
- **DevOps Engineer** - Deployment & infrastructure

## 📞 Support

- **Email**: support@ilike-app.com
- **Documentation**: [docs.ilike-app.com](https://docs.ilike-app.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/ilike-web/issues)

## 🎯 Roadmap

### Phase 1 (Current)

- ✅ User authentication
- ✅ Profile management
- ✅ Basic matching
- ✅ Real-time chat
- ✅ Web frontend

### Phase 2 (Next)

- 🔄 Advanced matching algorithm
- 🔄 Video calling
- 🔄 Push notifications
- 🔄 Analytics dashboard

### Phase 3 (Future)

- 📋 AI-powered recommendations
- 📋 Group events
- 📋 Premium features
- 📋 Multi-language support

---

**Built with ❤️ for modern dating experiences**
