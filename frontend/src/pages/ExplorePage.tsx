import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { CardSwipe } from "@/components/ui/card-swipe";
import { likeUser, dislikeUser } from "@/services/matchService";
import type { User } from "@/services/matchService";

// Import images from assets
import image1 from "@/assets/1.jpg";
import image2 from "@/assets/2.jpg";
import image3 from "@/assets/3.jpg";
import image4 from "@/assets/4.jpg";
import image5 from "@/assets/5.jpg";
import image6 from "@/assets/6.jpg";

const ExplorePage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [matchFound, setMatchFound] = useState(false);
  const [matchedUser, setMatchedUser] = useState<User | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  // Load potential matches from API
  useEffect(() => {
    const loadPotentialMatches = async () => {
      try {
        setLoading(true);

        // For now, always use mock data to see the UI
        console.log("Using mock data for development");
        throw new Error("Using mock data");

        // Uncomment below when backend is ready
        // const potentialUsers = await getPotentialMatches();
        // if (!potentialUsers || potentialUsers.length === 0) {
        //   console.log("No potential matches found, using fallback data");
        //   throw new Error("No matches available");
        // }
        // setUsers(potentialUsers);
      } catch (error) {
        console.error("Error loading potential matches:", error);
        // Fallback to mock data if API fails
        const mockUsers: User[] = [
          {
            id: "1",
            name: "Sarah",
            age: 24,
            bio: "Love hiking and coffee ☕️ Adventure seeker who enjoys exploring new places and trying different cuisines.",
            distance: "2 km away",
            interests: ["Hiking", "Coffee", "Photography", "Travel"],
            photos: [image1, image2, image3, image4, image5, image6],
          },
          {
            id: "2",
            name: "Emma",
            age: 26,
            bio: "Adventure seeker and foodie 🍕 Always looking for the next exciting experience and delicious meal.",
            distance: "5 km away",
            interests: ["Travel", "Food", "Yoga", "Cooking"],
            photos: [image1, image2, image3, image4],
          },
          {
            id: "3",
            name: "Jessica",
            age: 23,
            bio: "Artist and nature lover 🌿 Creative soul who finds inspiration in the beauty of the natural world.",
            distance: "3 km away",
            interests: ["Art", "Nature", "Music", "Painting"],
            photos: [image1, image2, image3, image4, image5],
          },
          {
            id: "4",
            name: "Maya",
            age: 25,
            bio: "Bookworm and tea enthusiast 📚 Passionate about literature and the perfect cup of tea.",
            distance: "4 km away",
            interests: ["Reading", "Tea", "Writing", "Poetry"],
            photos: [image1, image2, image3],
          },
          {
            id: "5",
            name: "Sophia",
            age: 27,
            bio: "Fitness enthusiast and wellness advocate 💪 Helping others achieve their health goals.",
            distance: "1 km away",
            interests: ["Fitness", "Wellness", "Nutrition", "Meditation"],
            photos: [image1, image2, image3, image4, image5],
          },
          {
            id: "6",
            name: "Isabella",
            age: 24,
            bio: "Tech geek and coffee addict ☕️ Building the future one line of code at a time.",
            distance: "6 km away",
            interests: ["Technology", "Coffee", "Coding", "Gaming"],
            photos: [image1, image2, image3],
          },
          {
            id: "7",
            name: "Olivia",
            age: 26,
            bio: "Animal lover and volunteer 🐕 Making the world a better place for furry friends.",
            distance: "3 km away",
            interests: ["Animals", "Volunteering", "Nature", "Photography"],
            photos: [image1, image2, image3, image4],
          },
          {
            id: "8",
            name: "Ava",
            age: 25,
            bio: "Music lover and festival goer 🎵 Life is better with good music and great vibes.",
            distance: "7 km away",
            interests: ["Music", "Festivals", "Dancing", "Concerts"],
            photos: [image1, image2, image3, image4, image5, image6],
          },
        ];
        setUsers(mockUsers);
      } finally {
        setLoading(false);
      }
    };

    loadPotentialMatches();
  }, []);

  const handleLike = async (userId: string) => {
    const user = users[currentUserIndex];
    if (!user) return;

    console.log("Liked user:", user.name);

    try {
      const response = await likeUser(userId);
      if (response.isMatch) {
        setMatchFound(true);
        setMatchedUser(user);
      }
    } catch (error) {
      console.error("Error liking user:", error);
      // For demo, simulate a match if API fails
      if (Math.random() > 0.7) {
        setMatchFound(true);
        setMatchedUser(user);
      }
    }

    // Move to next user
    moveToNextUser();
  };

  const enableDemoMode = () => {
    setDemoMode(true);
    // In demo mode, always trigger a match after 2-3 likes
    if (currentUserIndex >= 2) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      setMatchFound(true);
      setMatchedUser(randomUser);
    }
  };

  const handleDislike = async (userId: string) => {
    const user = users[currentUserIndex];
    if (!user) return;

    console.log("Disliked user:", user.name);

    try {
      await dislikeUser(userId);
    } catch (error) {
      console.error("Error disliking user:", error);
    }

    // Move to next user
    moveToNextUser();
  };

  const moveToNextUser = () => {
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    }
  };

  const handleMatchClose = () => {
    setMatchFound(false);
    setMatchedUser(null);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Finding potential matches...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (users.length === 0) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No more profiles
            </h3>
            <p className="text-gray-600">Check back later for new matches!</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Get current user
  const currentUser = users[currentUserIndex];

  // Convert user photos to images format for CardSwipe
  const userImages = currentUser.photos.map((photo, index) => ({
    src: photo,
    alt: `${currentUser.name} photo ${index + 1}`,
  }));

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        {/* Demo Mode Button */}
        {!demoMode && (
          <div className="mb-4 text-center">
            <button
              onClick={enableDemoMode}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              🎬 Enable Demo Mode (Guaranteed Match)
            </button>
          </div>
        )}

        {/* Card Swipe Component */}
        <CardSwipe
          images={userImages}
          autoplayDelay={1500}
          slideShadows={false}
          userName={currentUser.name}
          userAge={currentUser.age}
          userHobbies={currentUser.interests}
          userBio={currentUser.bio}
          userDistance={currentUser.distance}
          onLike={() => handleLike(currentUser.id)}
          onDislike={() => handleDislike(currentUser.id)}
        />

        {/* Match Found Modal */}
        {matchFound && matchedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                It's a Match!
              </h2>
              <p className="text-gray-600 mb-6">
                You and {matchedUser.name} liked each other!
              </p>

              <div className="flex space-x-4">
                <button
                  onClick={handleMatchClose}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Keep Swiping
                </button>
                <button
                  onClick={() => {
                    handleMatchClose();
                    // Navigate to chat with the matched user using React Router
                    navigate(`/chat/${matchedUser.id}`);
                  }}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 px-6 rounded-xl font-medium hover:from-pink-600 hover:to-red-600 transition-colors"
                >
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-pink-50 rounded-2xl">
            <div className="text-2xl font-bold text-pink-600">
              {users.length}
            </div>
            <div className="text-sm text-gray-600">Profiles</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-2xl">
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-sm text-gray-600">Likes Sent</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-2xl">
            <div className="text-2xl font-bold text-red-600">3</div>
            <div className="text-sm text-gray-600">Matches</div>
          </div>
        </div> */}
      </div>
    </MainLayout>
  );
};

export default ExplorePage;
