const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

/** Generate a signed JWT for a user */
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

exports.register = async (req, res) => {
  const { name, email, password, bio, avatar } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      bio,
      avatar,
    });

    await newUser.save();
    res.status(201).json(
      {
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
        },
      },
      { message: "User registered successfully" }
    );
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", { email });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

exports.getProfile = async (req, res) => {
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

exports.updateProfile = async (req, res) => {
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

// return all users (excluding the one making request)
exports.getAllUsers = async (req, res) => {
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

exports.likeUser = async (req, res) => {
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

exports.dislikeUser = async (req, res) => {
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
 * Get mutual matches (users you like who also like you back)
 */
exports.getMatches = async (req, res) => {
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
