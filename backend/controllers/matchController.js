import Match from "../models/Match.js";
import Profile from "../models/Profile.js";
import User from "../models/user.js";

// @desc    Get potential matches for a user
// @route   GET /api/matches/potential
// @access  Private
export const getPotentialMatches = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    // Get current user's profile and preferences
    const currentProfile = await Profile.findOne({ userId: currentUserId });
    if (!currentProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found. Please complete your profile first.",
      });
    }

    // Get users that the current user has already liked or been liked by
    const existingInteractions = await Match.find({
      $or: [{ likerId: currentUserId }, { likedId: currentUserId }],
    });

    const excludedUserIds = existingInteractions.map((interaction) =>
      interaction.likerId.equals(currentUserId)
        ? interaction.likedId
        : interaction.likerId
    );
    excludedUserIds.push(currentUserId); // Exclude self

    // Build query based on preferences
    const query = {
      userId: { $nin: excludedUserIds },
      isProfileComplete: true,
      age: {
        $gte: currentProfile.preferences.minAge,
        $lte: currentProfile.preferences.maxAge,
      },
    };

    // Add gender preference if specified
    if (
      currentProfile.preferences.genders &&
      currentProfile.preferences.genders.length > 0
    ) {
      query.gender = { $in: currentProfile.preferences.genders };
    }

    // Get potential matches
    const potentialMatches = await Profile.find(query)
      .populate("userId", "name email")
      .limit(20) // Limit results for performance
      .sort({ createdAt: -1 });

    // Transform the data for frontend
    const matches = potentialMatches.map((profile) => ({
      id: profile.userId._id,
      name: profile.name,
      age: profile.age,
      gender: profile.gender,
      location: profile.location,
      bio: profile.bio,
      photoUrls: profile.photoUrls,
      profilePicture: profile.profilePicture,
      interests: profile.interests,
      intentions: profile.intentions,
      height: profile.height,
    }));

    res.status(200).json({
      success: true,
      data: matches,
      count: matches.length,
    });
  } catch (error) {
    console.error("Error getting potential matches:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching potential matches",
    });
  }
};

// @desc    Like a user
// @route   POST /api/matches/like/:userId
// @access  Private
export const likeUser = async (req, res) => {
  try {
    const likerId = req.user._id;
    const likedId = req.params.userId;

    // Validate that the user exists and has completed profile
    const likedProfile = await Profile.findOne({
      userId: likedId,
      isProfileComplete: true,
    });

    if (!likedProfile) {
      return res.status(404).json({
        success: false,
        message: "User not found or profile incomplete",
      });
    }

    // Check if already liked
    const existingLike = await Match.findOne({
      likerId,
      likedId,
    });

    if (existingLike) {
      return res.status(400).json({
        success: false,
        message: "You have already liked this user",
      });
    }

    // Create the like
    const newLike = new Match({
      likerId,
      likedId,
    });

    await newLike.save();

    // Check if this creates a mutual match
    const mutualLike = await Match.findOne({
      likerId: likedId,
      likedId: likerId,
    });

    let isMatch = false;
    if (mutualLike) {
      // Update both records to mark as match
      await Match.findByIdAndUpdate(newLike._id, {
        isMatch: true,
        matchedAt: new Date(),
      });
      await Match.findByIdAndUpdate(mutualLike._id, {
        isMatch: true,
        matchedAt: new Date(),
      });
      isMatch = true;
    }

    res.status(200).json({
      success: true,
      message: isMatch ? "It's a match! 🎉" : "Like sent successfully",
      isMatch,
      matchId: isMatch ? newLike._id : null,
    });
  } catch (error) {
    console.error("Error liking user:", error);
    res.status(500).json({
      success: false,
      message: "Error processing like",
    });
  }
};

// @desc    Dislike a user (remove like if exists)
// @route   DELETE /api/matches/like/:userId
// @access  Private
export const dislikeUser = async (req, res) => {
  try {
    const likerId = req.user._id;
    const likedId = req.params.userId;

    // Remove the like
    const deletedLike = await Match.findOneAndDelete({
      likerId,
      likedId,
    });

    if (!deletedLike) {
      return res.status(404).json({
        success: false,
        message: "No like found to remove",
      });
    }

    // If it was a match, also update the mutual like
    if (deletedLike.isMatch) {
      await Match.findOneAndUpdate(
        { likerId: likedId, likedId: likerId },
        { isMatch: false, matchedAt: null }
      );
    }

    res.status(200).json({
      success: true,
      message: "Dislike processed successfully",
    });
  } catch (error) {
    console.error("Error disliking user:", error);
    res.status(500).json({
      success: false,
      message: "Error processing dislike",
    });
  }
};

// @desc    Get user's matches
// @route   GET /api/matches
// @access  Private
export const getMatches = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    // Get all matches for the current user
    const matches = await Match.find({
      $or: [
        { likerId: currentUserId, isMatch: true },
        { likedId: currentUserId, isMatch: true },
      ],
    }).populate([
      {
        path: "likerId",
        select: "name email",
        populate: {
          path: "userId",
          model: "Profile",
          select: "name age gender location photoUrls bio interests",
        },
      },
      {
        path: "likedId",
        select: "name email",
        populate: {
          path: "userId",
          model: "Profile",
          select: "name age gender location photoUrls bio interests",
        },
      },
    ]);

    // Transform the data to show the other user in each match
    const transformedMatches = matches.map((match) => {
      const isLiker = match.likerId._id.equals(currentUserId);
      const otherUser = isLiker ? match.likedId : match.likerId;

      return {
        matchId: match._id,
        matchedAt: match.matchedAt,
        user: {
          id: otherUser._id,
          name: otherUser.name,
          age: otherUser.userId?.age,
          gender: otherUser.userId?.gender,
          location: otherUser.userId?.location,
          photoUrls: otherUser.userId?.photoUrls || [],
          profilePicture: otherUser.userId?.profilePicture,
          bio: otherUser.userId?.bio,
          interests: otherUser.userId?.interests || [],
        },
      };
    });

    res.status(200).json({
      success: true,
      data: transformedMatches,
      count: transformedMatches.length,
    });
  } catch (error) {
    console.error("Error getting matches:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching matches",
    });
  }
};

// @desc    Get user's likes (people who liked them)
// @route   GET /api/matches/likes
// @access  Private
export const getLikes = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    // Get likes where current user is the one being liked
    const likes = await Match.find({
      likedId: currentUserId,
      isMatch: false, // Only show unrequited likes
    }).populate({
      path: "likerId",
      select: "name email",
      populate: {
        path: "userId",
        model: "Profile",
        select: "name age gender location photoUrls bio interests",
      },
    });

    // Transform the data
    const transformedLikes = likes.map((like) => ({
      likeId: like._id,
      likedAt: like.likedAt,
      user: {
        id: like.likerId._id,
        name: like.likerId.name,
        age: like.likerId.userId?.age,
        gender: like.likerId.userId?.gender,
        location: like.likerId.userId?.location,
        photoUrls: like.likerId.userId?.photoUrls || [],
        profilePicture: like.likerId.userId?.profilePicture,
        bio: like.likerId.userId?.bio,
        interests: like.likerId.userId?.interests || [],
      },
    }));

    res.status(200).json({
      success: true,
      data: transformedLikes,
      count: transformedLikes.length,
    });
  } catch (error) {
    console.error("Error getting likes:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching likes",
    });
  }
};

// @desc    Get likes sent by current user
// @route   GET /api/matches/likes-sent
// @access  Private
export const getLikesSent = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    // Get likes where current user is the one who liked
    const likesSent = await Match.find({
      likerId: currentUserId,
      isMatch: false, // Only show unrequited likes
    }).populate({
      path: "likedId",
      select: "name email",
      populate: {
        path: "userId",
        model: "Profile",
        select: "name age gender location photoUrls bio interests",
      },
    });

    // Transform the data
    const transformedLikesSent = likesSent.map((like) => ({
      likeId: like._id,
      likedAt: like.likedAt,
      user: {
        id: like.likedId._id,
        name: like.likedId.name,
        age: like.likedId.userId?.age,
        gender: like.likedId.userId?.gender,
        location: like.likedId.userId?.location,
        photoUrls: like.likedId.userId?.photoUrls || [],
        profilePicture: like.likedId.userId?.profilePicture,
        bio: like.likedId.userId?.bio,
        interests: like.likedId.userId?.interests || [],
      },
    }));

    res.status(200).json({
      success: true,
      data: transformedLikesSent,
      count: transformedLikesSent.length,
    });
  } catch (error) {
    console.error("Error getting likes sent:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching likes sent",
    });
  }
};
