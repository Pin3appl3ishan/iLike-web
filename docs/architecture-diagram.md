# System Architecture

## High-Level Architecture Diagram

```mermaid
graph TB
    subgraph Client["Frontend (React)"]
        UI[UI Components]
        RC[React Context]
        RS[React Services]
        WS[WebSocket Client]
    end

    subgraph Server["Backend (Node.js)"]
        API[API Routes]
        MC[Middleware]
        CTRL[Controllers]
        WSS[WebSocket Server]
        AUTH[Auth Service]
    end

    subgraph Database["MongoDB"]
        US[(User Store)]
        PS[(Profile Store)]
        MS[(Match Store)]
        CS[(Chat Store)]
    end

    subgraph External["External Services"]
        S3[AWS S3]
        GEO[Geocoding API]
    end

    %% Frontend Internal Connections
    UI --> RC
    UI --> RS
    UI --> WS
    RC --> RS

    %% Backend Internal Connections
    API --> MC
    MC --> CTRL
    CTRL --> WSS
    CTRL --> AUTH

    %% Frontend to Backend Connections
    RS -->|HTTP| API
    WS -->|WebSocket| WSS

    %% Backend to Database Connections
    CTRL --> US
    CTRL --> PS
    CTRL --> MS
    CTRL --> CS

    %% External Service Connections
    CTRL -->|Image Upload| S3
    CTRL -->|Location Services| GEO

    %% Styling
    classDef frontend fill:#ff9999,stroke:#ff0000,stroke-width:2px
    classDef backend fill:#99ff99,stroke:#00ff00,stroke-width:2px
    classDef database fill:#9999ff,stroke:#0000ff,stroke-width:2px
    classDef external fill:#ffff99,stroke:#ffff00,stroke-width:2px

    class UI,RC,RS,WS frontend
    class API,MC,CTRL,WSS,AUTH backend
    class US,PS,MS,CS database
    class S3,GEO external
```

## Component Description

### Frontend Components

- **UI Components**: React components for user interface
- **React Context**: Global state management
- **React Services**: API integration services
- **WebSocket Client**: Real-time communication client

### Backend Components

- **API Routes**: RESTful API endpoints
- **Middleware**: Request processing and validation
- **Controllers**: Business logic handlers
- **WebSocket Server**: Real-time event handler
- **Auth Service**: Authentication and authorization

### Database

- **User Store**: User account data
- **Profile Store**: User profile information
- **Match Store**: User matches and interactions
- **Chat Store**: Messages and conversations

### External Services

- **AWS S3**: Image storage for profile pictures
- **Geocoding API**: Location services for matching

## Data Flow

1. **Authentication Flow**:

   - Client sends credentials
   - Auth Service validates
   - JWT token returned
   - Token stored in Context

2. **Real-time Communication**:

   - WebSocket connection established
   - Events emitted for matches/messages
   - Real-time updates pushed to clients

3. **Profile Management**:

   - Images uploaded to S3
   - Profile data stored in MongoDB
   - Location data processed via Geocoding API

4. **Matching System**:
   - User preferences checked
   - Location-based filtering
   - Match notifications via WebSocket

## Security Layers

1. **Frontend**:

   - JWT token management
   - Route protection
   - Input validation

2. **Backend**:

   - Authentication middleware
   - Request validation
   - Rate limiting
   - CORS protection

3. **Database**:

   - Encrypted connections
   - Field-level encryption
   - Access control

4. **External Services**:
   - Secure API keys
   - S3 bucket policies
   - HTTPS endpoints
