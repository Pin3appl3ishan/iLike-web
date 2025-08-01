# API Routes Documentation

## Authentication Routes

```
POST /api/auth/register     # Register new user
POST /api/auth/login        # Login user
POST /api/auth/logout       # Logout user
GET  /api/auth/verify      # Verify JWT token
```

## User Routes

```
GET    /api/users/profile          # Get user profile
PUT    /api/users/profile          # Update user profile
POST   /api/users/photos           # Upload profile photos
DELETE /api/users/photos/:photoId  # Delete profile photo
PUT    /api/users/preferences      # Update user preferences
```

## Match Routes

```
GET    /api/matches               # Get user matches
POST   /api/matches/like/:userId  # Like a user
POST   /api/matches/pass/:userId  # Pass a user
DELETE /api/matches/:matchId      # Unmatch with user
```

## Chat Routes

```
GET    /api/chat/conversations           # Get user conversations
GET    /api/chat/messages/:chatId        # Get chat messages
POST   /api/chat/messages                # Send new message
PUT    /api/chat/messages/:messageId     # Update message (read status)
DELETE /api/chat/messages/:messageId     # Delete message
```

## Admin Routes

```
GET    /api/admin/stats              # Get platform statistics
GET    /api/admin/users              # Get all users
GET    /api/admin/users/:userId      # Get specific user details
PUT    /api/admin/users/:userId      # Update user status
GET    /api/admin/reports            # Get all reports
PUT    /api/admin/reports/:reportId  # Update report status
```

## WebSocket Events

```
connection          # User connects
disconnect         # User disconnects
join              # Join chat room
message           # New message
typing            # User typing
read              # Message read
match             # New match
```

## Response Formats

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```
