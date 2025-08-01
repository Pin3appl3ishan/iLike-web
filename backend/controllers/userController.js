import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

/** Generate a signed JWT for a user */
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      hasCompletedProfile: user.hasCompletedProfile || false,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const register = async (req, res) => {
  const { name, email, password, bio, avatar } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      bio: bio || "",
      avatar: avatar || "",
      hasCompletedProfile: false,
    });

    await newUser.save();

    // Generate token
    const token = generateToken(newUser);

    // Return response
    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin || false,
      },
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

export const login = async (req, res) => {
  console.log("Login request received:", {
    body: req.body,
    headers: req.headers,
  });

  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    console.error("Missing email or password");
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
      received: { email: !!email, password: !!password },
    });
  }

  try {
    console.log("Looking for user with email:", email);
    const user = await User.findOne({ email });

    if (!user) {
      console.error("User not found for email:", email);
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    console.log("User found, checking password...");
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.error("Password does not match for user:", email);
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    console.log("Authentication successful, generating token...");
    const token = generateToken(user);

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin || false,
      hasCompletedProfile: user.hasCompletedProfile || false,
      profile: user.profile || null,
    };

    console.log("Login successful for user:", userResponse.email);
    res.status(200).json({
      success: true,
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message,
    });
  }
};

// @desc    Get current user's profile
// @route   GET /api/users/me
// @access  Private
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching current user profile" });
  }
};

// @desc    Get user profile by ID
// @route   GET /api/users/profile/:id
// @access  Private
export const getProfile = async (req, res) => {
  const targetId = req.params.id || req.userId; // from the verifyToken middleware
  try {
    const user = await User.findById(targetId).select("-password"); // exclude password from the response

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user profile" });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile/:id
// @access  Private
export const updateProfile = async (req, res) => {
  console.log("📤 Update profile hit");
  try {
    const updates = req.body;
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).select("-password");
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating user profile" });
  }
};

// @desc    Get all users (excluding the current user)
// @route   GET /api/users
// @access  Private
export const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user?.id; // from the verifyToken
    const users = await User.find({ _id: { $ne: currentUserId } }).select(
      "-password"
    ); // exclude the current user
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

/**
 * Helper function to handle like/dislike logic
 */
const updateLikeRelationship = async (currentUserId, targetUserId, action) => {
  const currentUser = await User.findById(currentUserId);
  const targetUser = await User.findById(targetUserId);

  if (!targetUser) throw new Error("Target user not found");

  const alreadyLiked = currentUser.likes.includes(targetUserId);

  if (action === "like" && !alreadyLiked) {
    currentUser.likes.push(targetUserId);
    targetUser.followers.push(currentUserId);
  } else if (action === "dislike" && alreadyLiked) {
    currentUser.likes.pull(targetUserId);
    targetUser.followers.pull(currentUserId);
  }

  await currentUser.save();
  await targetUser.save();
};

// @desc    Like a user
// @route   POST /api/users/like/:id
// @access  Private
export const likeUser = async (req, res) => {
  try {
    if (req.userId === req.params.id) {
      return res.status(400).json({ message: "You can't like yourself" });
    }

    await updateLikeRelationship(req.userId, req.params.id, "like");

    res.status(200).json({
      message: "User liked successfully",
    });
  } catch (error) {
    console.error("🔥 Error in likeUser:", error.message);
    res.status(500).json({ error: "Error liking user" });
  }
};

// @desc    Dislike a user
// @route   POST /api/users/dislike/:id
// @access  Private
export const dislikeUser = async (req, res) => {
  try {
    if (req.userId === req.params.id) {
      return res.status(400).json({ message: "You can't dislike yourself" });
    }

    await updateLikeRelationship(req.userId, req.params.id, "dislike");

    res.status(200).json({
      message: "User disliked successfully",
    });
  } catch (error) {
    console.error("🔥 Error in dislikeUser:", error.message);
    res.status(500).json({ error: "Error disliking user" });
  }
};

/**
 * @desc    Get mutual matches (users you like who also like you back)
 * @route   GET /api/users/matches
 * @access  Private
 */
export const getMatches = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId); // assuming req.userId is available in req.user.id

    if (!currentUser)
      return res.status(404).json({ message: "User not found" });

    const matchedUsers = await User.find({
      _id: { $in: currentUser.likes }, // matches are mutual followers
      likes: req.userId,
    }).select("-password");

    if (matchedUsers.length === 0) {
      return res.status(404).json({ message: "No matches found" });
    }

    res.status(200).json(matchedUsers);
  } catch (error) {
    console.error("🔥 Error in getMatches:", error.message);
    res.status(500).json({ error: "Error fetching matches" });
  }
};
