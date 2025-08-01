# Project Structure

## Frontend Structure

```
frontend/
├── src/
│   ├── assets/          # Static assets (images, fonts)
│   ├── components/      # Reusable components
│   │   ├── admin/      # Admin-specific components
│   │   ├── auth/       # Authentication components
│   │   └── ui/         # UI components (buttons, cards, etc.)
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── layouts/        # Layout components
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   │   ├── admin/     # Admin pages
│   │   └── auth/      # Auth pages
│   ├── routes/        # Route configurations
│   ├── services/      # API service functions
│   └── tests/         # Test files
├── public/            # Public assets
└── package.json       # Project dependencies

## Backend Structure
```

backend/
├── controllers/ # Route controllers
├── middleware/ # Custom middleware
├── models/ # Database models
├── routes/ # API routes
├── socket/ # WebSocket handlers
├── tests/ # Test files
├── uploads/ # File uploads
├── utils/ # Utility functions
└── server.js # Main server file

```

```
