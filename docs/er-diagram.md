erDiagram
    USER {
        string id
        string name
        string email
        string password
        boolean isAdmin
        boolean isActive
        datetime createdAt
        datetime lastActive
    }

    PROFILE {
        string id
        string userId
        int age
        string gender
        string bio
        string photos
        float height
        string interests
        string intentions
        string preferences
        string location
    }

    MATCH {
        string id
        string userId1
        string userId2
        datetime matchedAt
        boolean isActive
    }

    CHAT {
        string id
        string matchId
        datetime createdAt
        datetime lastMessageAt
    }

    MESSAGE {
        string id
        string chatId
        string senderId
        string content
        boolean isRead
        datetime createdAt
    }

    REPORT {
        string id
        string reporterId
        string reportedId
        string reason
        string status
        string details
        datetime createdAt
    }

    USER ||--o{ PROFILE : "has"
    USER ||--o{ MATCH : "participates"
    USER ||--o{ MESSAGE : "sends"
    USER ||--o{ REPORT : "reports"
    MATCH ||--|| CHAT : "has"
    CHAT ||--o{ MESSAGE : "contains"
