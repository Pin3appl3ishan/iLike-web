import Profile from '../models/Profile.js';
import User from '../models/user.js';

// @desc    Get current user's profile
// @route   GET /api/profile/me
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id })
      .select('-__v -createdAt -updatedAt');
    
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    
    res.json({ success: true, data: profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create or update user profile
// @route   POST /api/profile/setup
// @access  Private
export const setupProfile = async (req, res) => {
  try {
    const { gender, interests, age, bio } = req.body;
    
    // Validate required fields
    if (!gender || !interests || !age) {
      return res.status(400).json({ 
        success: false, 
        message: 'Gender, interests, and age are required' 
      });
    }

    // Parse interests if it's a string
    let interestsArray = [];
    try {
      interestsArray = typeof interests === 'string' ? JSON.parse(interests) : interests;
      if (!Array.isArray(interestsArray)) {
        throw new Error('Interests must be an array');
      }
    } catch (error) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid interests format. Must be a JSON array of strings' 
      });
    }

    // Prepare profile data
    const profileData = {
      userId: req.user.id,
      gender,
      interests: interestsArray,
      age: parseInt(age, 10),
      bio: bio || '',
      isProfileComplete: true
    };

    // Handle file upload if exists
    if (req.file) {
      profileData.profilePicture = `/uploads/profiles/${req.file.filename}`;
    }

    // Find and update or create profile
    let profile = await Profile.findOne({ userId: req.user.id });
    
    if (profile) {
      // Update existing profile
      profile = await Profile.findOneAndUpdate(
        { userId: req.user.id },
        { $set: profileData },
        { new: true, runValidators: true }
      );
    } else {
      // Create new profile
      profile = new Profile(profileData);
      await profile.save();
    }

    // Update user's profile completion status
    await User.findByIdAndUpdate(req.user.id, { hasCompletedProfile: true });

    res.json({ 
      success: true, 
      message: 'Profile saved successfully',
      data: profile 
    });

  } catch (error) {
    console.error('Error saving profile:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error',
        errors: error.errors 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: 'Server error while saving profile' 
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/profile/update
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const updates = {};
    const allowedUpdates = ['gender', 'interests', 'age', 'bio', 'preferences'];
    
    // Filter allowed updates
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        if (key === 'interests' && typeof req.body[key] === 'string') {
          try {
            updates[key] = JSON.parse(req.body[key]);
          } catch (e) {
            return res.status(400).json({ 
              success: false, 
              message: 'Invalid interests format' 
            });
          }
        } else {
          updates[key] = req.body[key];
        }
      }
    });

    // Handle file upload if exists
    if (req.file) {
      updates.profilePicture = `/uploads/profiles/${req.file.filename}`;
    }

    // Update profile
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ 
        success: false, 
        message: 'Profile not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Profile updated successfully',
      data: profile 
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error',
        errors: error.errors 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: 'Server error while updating profile' 
    });
  }
};
