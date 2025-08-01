# 🚀 iLike Backend API Documentation

Base URL: `http://localhost:5000/api`

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## 👤 USER ROUTES (`/api/users`)

### 🔓 Public Routes (No Auth Required)

#### **POST** `/api/users/register`

**Register a new user**

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "bio": "Optional bio",
  "avatar": "Optional avatar URL"
}
```

**Response:**

```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "isAdmin": false
  },
  "message": "User registered successfully"
}
```

#### **POST** `/api/users/login`

**Login user**

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "isAdmin": false,
    "hasCompletedProfile": false
  }
}
```

### 🔒 Protected Routes (Auth Required)

#### **GET** `/api/users/me`

**Get current user info**

**Response:**

```json
{
  "id": "user-id",
  "name": "John Doe",
  "email": "john@example.com",
  "isAdmin": false,
  "hasCompletedProfile": true
}
```

#### **GET** `/api/users`

**Get all users (Admin only)**

**Response:**

```json
[
  {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "isAdmin": false,
    "hasCompletedProfile": true
  }
]
```

#### **GET** `/api/users/profile/:id`

**Get user profile by ID**

**Response:**

```json
{
  "id": "user-id",
  "name": "John Doe",
  "email": "john@example.com",
  "bio": "User bio",
  "avatar": "avatar-url"
}
```

#### **PUT** `/api/users/profile/:id`

**Update user profile**

**Request Body:**

```json
{
  "name": "John Doe",
  "bio": "Updated bio"
}
```

#### **POST** `/api/users/like/:id`

**Like a user**

**Response:**

```json
{
  "success": true,
  "message": "User liked successfully",
  "isMatch": true
}
```

#### **POST** `/api/users/dislike/:id`

**Dislike a user**

**Response:**

```json
{
  "success": true,
  "message": "User disliked successfully"
}
```

#### **GET** `/api/users/matches`

**Get user's matches**

**Response:**

```json
[
  {
    "id": "match-id",
    "user": {
      "id": "user-id",
      "name": "Jane Doe",
      "email": "jane@example.com"
    },
    "matchedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

## 👤 PROFILE ROUTES (`/api/profile`)

### 🔒 Protected Routes (Auth Required)

#### **GET** `/api/profile/me`

**Get current user's profile**

**Response:**

```json
{
  "userId": "user-id",
  "name": "John Doe",
  "age": 25,
  "gender": "male",
  "bio": "User bio",
  "location": {
    "type": "Point",
    "coordinates": [longitude, latitude]
  },
  "photoUrls": ["url1", "url2"],
  "profilePicture": "profile-pic-url",
  "interests": ["music", "travel"],
  "intentions": ["casual", "serious"],
  "height": 175,
  "preferences": {
    "minAge": 18,
    "maxAge": 35,
    "genders": ["female"],
    "maxDistance": 50
  },
  "isProfileComplete": true
}
```

#### **POST** `/api/profile/setup`

**Setup/Update profile (with file upload)**

**Request Body:** `multipart/form-data`

```
name: "John Doe"
age: 25
gender: "male"
bio: "User bio"
interests: ["music", "travel"]
intentions: ["casual", "serious"]
height: 175
preferences.minAge: 18
preferences.maxAge: 35
preferences.genders: ["female"]
preferences.maxDistance: 50
photos: [file1, file2, ...] (up to 6 images)
```

#### **PUT** `/api/profile/update`

**Update profile (with file upload)**

**Request Body:** `multipart/form-data`

```
name: "John Doe"
age: 25
bio: "Updated bio"
interests: ["music", "travel"]
photos: [file1, file2, ...] (up to 6 images)
```

#### **PUT** `/api/profile/picture`

**Update profile picture**

**Request Body:** `multipart/form-data`

```
profilePicture: [file] (single image)
```

---

## ❤️ MATCH ROUTES (`/api/matches`)

### 🔒 Protected Routes (Auth Required)

#### **GET** `/api/matches/potential`

**Get potential matches for swiping**

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "user-id",
      "name": "Jane Doe",
      "age": 23,
      "gender": "female",
      "location": {
        "type": "Point",
        "coordinates": [longitude, latitude]
      },
      "bio": "User bio",
      "photoUrls": ["url1", "url2"],
      "profilePicture": "profile-pic-url",
      "interests": ["music", "travel"],
      "intentions": ["casual", "serious"],
      "height": 165
    }
  ],
  "count": 1
}
```

#### **POST** `/api/matches/like/:userId`

**Like a user**

**Response:**

```json
{
  "success": true,
  "message": "User liked successfully",
  "isMatch": true,
  "match": {
    "id": "match-id",
    "user": {
      "id": "user-id",
      "name": "Jane Doe"
    }
  }
}
```

#### **DELETE** `/api/matches/like/:userId`

**Dislike/Remove like**

**Response:**

```json
{
  "success": true,
  "message": "Like removed successfully"
}
```

#### **GET** `/api/matches`

**Get user's matches**

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "match-id",
      "user": {
        "id": "user-id",
        "name": "Jane Doe",
        "profilePicture": "profile-pic-url"
      },
      "matchedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### **GET** `/api/matches/likes`

**Get users who liked current user**

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "user-id",
      "name": "Jane Doe",
      "profilePicture": "profile-pic-url",
      "likedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### **GET** `/api/matches/likes-sent`

**Get likes sent by current user**

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "user-id",
      "name": "Jane Doe",
      "profilePicture": "profile-pic-url",
      "likedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## 💬 CHAT ROUTES (`/api/chats`)

### 🔒 Protected Routes (Auth Required)

#### **GET** `/api/chats`

**Get all chats for current user**

**Response:**

```json
[
  {
    "chatId": "chat-id",
    "otherUserId": "other-user-id",
    "otherUserName": "Jane Doe",
    "otherUserProfilePicture": "profile-pic-url",
    "otherUserPhotoUrls": ["url1", "url2"],
    "lastMessageTime": "2024-01-01T00:00:00.000Z",
    "lastMessage": "Hello there!",
    "isLastMessageFromMe": false,
    "unreadCount": 2
  }
]
```

#### **POST** `/api/chats`

**Create a new chat**

**Request Body:**

```json
{
  "participantId": "other-user-id"
}
```

**Response:**

```json
{
  "chatId": "chat-id",
  "participants": ["user-id", "other-user-id"],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### **GET** `/api/chats/:chatId`

**Get chat by ID**

**Response:**

```json
{
  "chatId": "chat-id",
  "participants": ["user-id", "other-user-id"],
  "lastMessage": {
    "content": "Hello there!",
    "senderId": "user-id",
    "timestamp": "2024-01-01T00:00:00.000Z"
  },
  "unreadCounts": {
    "user-id": 0,
    "other-user-id": 2
  }
}
```

#### **GET** `/api/chats/:chatId/messages`

**Get messages for a chat**

**Response:**

```json
[
  {
    "messageId": "message-id",
    "chatId": "chat-id",
    "senderId": "user-id",
    "content": "Hello there!",
    "type": "text",
    "status": "read",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "isFromMe": true
  }
]
```

#### **POST** `/api/chats/:chatId/messages`

**Send a message**

**Request Body:**

```json
{
  "content": "Hello there!",
  "type": "text"
}
```

**Response:**

```json
{
  "messageId": "message-id",
  "chatId": "chat-id",
  "senderId": "user-id",
  "content": "Hello there!",
  "type": "text",
  "status": "sent",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "isFromMe": true
}
```

#### **PUT** `/api/chats/:chatId/read`

**Mark messages as read**

**Response:**

```json
{
  "message": "Messages marked as read"
}
```

#### **DELETE** `/api/chats/:chatId`

**Delete a chat (soft delete)**

**Response:**

```json
{
  "message": "Chat deleted successfully"
}
```

---

## 🔧 Frontend Integration Examples

### **Authentication Service**

```typescript
// authService.ts
import api from "./api";

export const login = async (email: string, password: string) => {
  const response = await api.post("/users/login", { email, password });
  return response.data;
};

export const register = async (userData: any) => {
  const response = await api.post("/users/register", userData);
  return response.data;
};
```

### **Match Service**

```typescript
// matchService.ts
import api from "./api";

export const getPotentialMatches = async () => {
  const response = await api.get("/matches/potential");
  return response.data;
};

export const likeUser = async (userId: string) => {
  const response = await api.post(`/matches/like/${userId}`);
  return response.data;
};
```

### **Chat Service**

```typescript
// chatService.ts
import api from "./api";

export const getChats = async () => {
  const response = await api.get("/chats");
  return response.data;
};

export const sendMessage = async (chatId: string, content: string) => {
  const response = await api.post(`/chats/${chatId}/messages`, { content });
  return response.data;
};
```

### **Profile Service**

```typescript
// profileService.ts
import api from "./api";

export const setupProfile = async (profileData: FormData) => {
  const response = await api.post("/profile/setup", profileData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
```

---

## 🚨 Error Responses

All endpoints return consistent error formats:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP Status Codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

---

## 📝 Notes

1. **File Uploads**: Profile pictures and photos use `multipart/form-data`
2. **Authentication**: Include JWT token in Authorization header for protected routes
3. **Real-time Chat**: Consider implementing Socket.IO for real-time messaging
4. **Pagination**: Some endpoints may need pagination for large datasets
5. **Error Handling**: Always handle API errors gracefully in frontend
