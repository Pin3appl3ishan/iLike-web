import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    // User who initiated the like
    likerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // User who was liked
    likedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Whether this is a mutual match (both users liked each other)
    isMatch: {
      type: Boolean,
      default: false,
    },
    // Timestamp when the like was created
    likedAt: {
      type: Date,
      default: Date.now,
    },
    // Timestamp when it became a match (if applicable)
    matchedAt: {
      type: Date,
    },
    // Whether the like has been seen by the recipient
    isSeen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure unique likes and enable efficient queries
matchSchema.index({ likerId: 1, likedId: 1 }, { unique: true });
matchSchema.index({ likedId: 1, isMatch: 1 });
matchSchema.index({ likerId: 1, isMatch: 1 });

const Match = mongoose.model("Match", matchSchema);

export default Match;
