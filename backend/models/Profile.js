import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Non-binary', 'Other'],
    required: true
  },
  interests: [{
    type: String,
    required: true
  }],
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 100
  },
  bio: {
    type: String,
    maxlength: 500
  },
  profilePicture: {
    type: String, // URL to the image
    default: ''
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  preferences: {
    minAge: {
      type: Number,
      default: 18,
      min: 18
    },
    maxAge: {
      type: Number,
      default: 100,
      max: 100
    },
    genders: [{
      type: String,
      enum: ['Male', 'Female', 'Non-binary', 'Other']
    }],
    maxDistance: {
      type: Number,
      default: 50 // in kilometers
    }
  },
  isProfileComplete: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for geospatial queries
profileSchema.index({ location: '2dsphere' });

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
