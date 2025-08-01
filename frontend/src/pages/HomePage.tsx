import React from "react";
import { Sparkles, Map } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";

const HomePage: React.FC = () => {
  const matches = [
    {
      id: 1,
      name: "Prasna",
      age: 19,
      image: "👩",
      distance: "2 km away",
      interests: ["Photography", "Travel"],
    },
    {
      id: 2,
      name: "Shreya",
      age: 18,
      image: "🤷‍♀️",
      distance: "5 km away",
      interests: ["Yoga", "Coffee"],
    },
    {
      id: 3,
      name: "Nini",
      age: 20,
      image: "👧",
      distance: "3 km away",
      interests: ["Art", "Music"],
    },
  ];

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Card Section */}
        <div className="lg:col-span-2">
          {/* Welcome Message */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-pink-100 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome back! 👋
                </h2>
                <p className="text-gray-600">
                  Ready to find your perfect match today?
                </p>
              </div>
              <div className="hidden sm:block">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-pink-50 rounded-2xl">
                <div className="text-2xl font-bold text-pink-600">12</div>
                <div className="text-sm text-gray-600">New Matches</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-2xl">
                <div className="text-2xl font-bold text-purple-600">5</div>
                <div className="text-sm text-gray-600">Messages</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-2xl">
                <div className="text-2xl font-bold text-red-600">89%</div>
                <div className="text-sm text-gray-600">Match Rate</div>
              </div>
            </div>
          </div>

          {/* Discovery Cards */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-pink-100 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Discover People Near You
              </h3>
              <button className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 transition-colors">
                <Map className="w-4 h-4" />
                <span className="text-sm font-medium">View All</span>
              </button>
            </div>

            {/* Match Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {matches.map((match) => (
                <div key={match.id} className="group relative">
                  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100">
                    {/* Profile Image */}
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-4xl mb-3">
                        {match.image}
                      </div>
                      <h4 className="text-xl font-semibold text-gray-800">
                        {match.name}, {match.age}
                      </h4>
                      <p className="text-sm text-gray-500">{match.distance}</p>
                    </div>

                    {/* Interests */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {match.interests.map((interest, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-medium"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-2 px-4 rounded-xl transition-colors text-sm font-medium">
                        Pass
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white py-2 px-4 rounded-xl transition-all text-sm font-medium transform hover:scale-105">
                        Like ❤️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Matches */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-pink-100 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                Recent Matches
              </h3>
              <div className="w-5 h-5 text-pink-600">👥</div>
            </div>
            <div className="space-y-3">
              {["Jessica", "Diya", "Anu"].map((name, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 p-2 hover:bg-pink-50 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                    {name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{name}</div>
                    <div className="text-xs text-gray-500">Matched today</div>
                  </div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Messages Preview */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-pink-100 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Messages</h3>
              <div className="w-5 h-5 text-pink-600">💬</div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-pink-50 rounded-xl">
                <div className="font-medium text-gray-800 text-sm">Aarya</div>
                <div className="text-xs text-gray-600">
                  Hey! How's your day going? 😊
                </div>
                <div className="text-xs text-pink-600 mt-1">2 min ago</div>
              </div>
              <div className="p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                <div className="font-medium text-gray-800 text-sm">Poonam</div>
                <div className="text-xs text-gray-600">
                  That coffee place looks amazing!
                </div>
                <div className="text-xs text-gray-400 mt-1">1 hour ago</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded-3xl p-6 text-white shadow-lg">
            <h3 className="text-lg font-bold mb-4">Boost Your Profile</h3>
            <p className="text-pink-100 text-sm mb-4">
              Get 10x more matches with premium features!
            </p>
            <button className="w-full bg-white text-pink-600 py-2 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
