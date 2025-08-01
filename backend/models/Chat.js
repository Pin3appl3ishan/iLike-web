import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    // Unique identifier for the chat
    chatId: {
      type: String,
      required: true,
      unique: true,
    },
    // Array of user IDs participating in the chat
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    // Last message in the chat for preview
    lastMessage: {
      content: String,
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
    // Unread message counts for each participant
    unreadCounts: {
      type: Map,
      of: Number,
      default: new Map(),
    },
    // Whether the chat is active
    isActive: {
      type: Boolean,
      default: true,
    },
    // Timestamp when chat was created
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // Timestamp when chat was last updated
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Generate chatId based on participants (sorted to ensure consistency)
chatSchema.pre("save", function (next) {
  if (!this.chatId) {
    const sortedParticipants = this.participants
      .map((p) => p.toString())
      .sort();
    this.chatId = sortedParticipants.join("_");
  }
  next();
});

// Index for efficient queries
chatSchema.index({ participants: 1 });
chatSchema.index({ chatId: 1 });
chatSchema.index({ "lastMessage.timestamp": -1 });

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
