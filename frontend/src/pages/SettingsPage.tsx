import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import {
  User,
  Shield,
  Bell,
  Moon,
  Globe,
  Lock,
  Eye,
  Smartphone,
  Palette,
  LogOut,
  Trash2,
  Download,
  HelpCircle,
  Settings as SettingsIcon,
} from "lucide-react";
import { toast } from "react-toastify";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    // Account Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,

    // Privacy Settings
    profileVisibility: "public",
    showOnlineStatus: true,
    showLastSeen: false,
    allowMessagesFrom: "matches",

    // App Settings
    darkMode: false,
    language: "English",
    autoPlayVideos: true,
    soundEffects: true,

    // Discovery Settings
    showMeTo: "everyone",
    ageRange: { min: 18, max: 50 },
    maxDistance: 50,
  });

  const handleSettingChange = (
    key: string,
    value: string | number | boolean | object
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    toast.success("Setting updated!");
  };

  const handleLogout = () => {
    toast.info("Logout functionality coming soon!");
  };

  const handleDeleteAccount = () => {
    toast.warning("Account deletion requires confirmation!");
  };

  const SettingItem = ({
    icon: Icon,
    title,
    subtitle,
    children,
    danger = false,
  }: {
    icon: React.ElementType;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    danger?: boolean;
  }) => (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border ${
        danger ? "border-red-200 bg-red-50" : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-lg ${
            danger ? "bg-red-100 text-red-600" : "bg-pink-100 text-pink-600"
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3
            className={`font-medium ${
              danger ? "text-red-800" : "text-gray-800"
            }`}
          >
            {title}
          </h3>
          {subtitle && (
            <p
              className={`text-sm ${danger ? "text-red-600" : "text-gray-600"}`}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  );

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <SettingsIcon className="w-8 h-8 text-pink-500" />
            <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          </div>
          <p className="text-gray-600">
            Manage your account preferences and privacy
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-pink-500" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Account Settings
                </h2>
              </div>

              <div className="space-y-4">
                <SettingItem
                  icon={Bell}
                  title="Email Notifications"
                  subtitle="Receive updates via email"
                >
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) =>
                        handleSettingChange(
                          "emailNotifications",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                  </label>
                </SettingItem>

                <SettingItem
                  icon={Smartphone}
                  title="Push Notifications"
                  subtitle="Get notified on your device"
                >
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.pushNotifications}
                      onChange={(e) =>
                        handleSettingChange(
                          "pushNotifications",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                  </label>
                </SettingItem>

                <SettingItem
                  icon={Bell}
                  title="SMS Notifications"
                  subtitle="Receive text messages"
                >
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.smsNotifications}
                      onChange={(e) =>
                        handleSettingChange(
                          "smsNotifications",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                  </label>
                </SettingItem>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-pink-500" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Privacy Settings
                </h2>
              </div>

              <div className="space-y-4">
                <SettingItem
                  icon={Eye}
                  title="Profile Visibility"
                  subtitle="Who can see your profile"
                >
                  <select
                    value={settings.profileVisibility}
                    onChange={(e) =>
                      handleSettingChange("profileVisibility", e.target.value)
                    }
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="public">Public</option>
                    <option value="friends">Friends Only</option>
                    <option value="private">Private</option>
                  </select>
                </SettingItem>

                <SettingItem
                  icon={Globe}
                  title="Show Online Status"
                  subtitle="Let others see when you're online"
                >
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.showOnlineStatus}
                      onChange={(e) =>
                        handleSettingChange(
                          "showOnlineStatus",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                  </label>
                </SettingItem>

                <SettingItem
                  icon={Lock}
                  title="Allow Messages From"
                  subtitle="Control who can message you"
                >
                  <select
                    value={settings.allowMessagesFrom}
                    onChange={(e) =>
                      handleSettingChange("allowMessagesFrom", e.target.value)
                    }
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="everyone">Everyone</option>
                    <option value="matches">Matches Only</option>
                    <option value="friends">Friends Only</option>
                  </select>
                </SettingItem>
              </div>
            </div>

            {/* Discovery Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Globe className="w-5 h-5 text-pink-500" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Discovery Settings
                </h2>
              </div>

              <div className="space-y-4">
                <SettingItem
                  icon={User}
                  title="Show Me To"
                  subtitle="Who can discover your profile"
                >
                  <select
                    value={settings.showMeTo}
                    onChange={(e) =>
                      handleSettingChange("showMeTo", e.target.value)
                    }
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="everyone">Everyone</option>
                    <option value="women">Women Only</option>
                    <option value="men">Men Only</option>
                    <option value="matches">Matches Only</option>
                  </select>
                </SettingItem>

                <SettingItem
                  icon={User}
                  title="Age Range"
                  subtitle={`${settings.ageRange.min} - ${settings.ageRange.max} years`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="18"
                      max="80"
                      value={settings.ageRange.min}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          ageRange: {
                            ...prev.ageRange,
                            min: parseInt(e.target.value),
                          },
                        }))
                      }
                      className="w-20"
                    />
                    <span className="text-sm text-gray-600">to</span>
                    <input
                      type="range"
                      min="18"
                      max="80"
                      value={settings.ageRange.max}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          ageRange: {
                            ...prev.ageRange,
                            max: parseInt(e.target.value),
                          },
                        }))
                      }
                      className="w-20"
                    />
                  </div>
                </SettingItem>

                <SettingItem
                  icon={Globe}
                  title="Maximum Distance"
                  subtitle={`${settings.maxDistance} km`}
                >
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={settings.maxDistance}
                    onChange={(e) =>
                      handleSettingChange(
                        "maxDistance",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-32"
                  />
                </SettingItem>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions & App Settings */}
          <div className="space-y-6">
            {/* App Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Palette className="w-5 h-5 text-pink-500" />
                <h2 className="text-xl font-semibold text-gray-800">
                  App Settings
                </h2>
              </div>

              <div className="space-y-4">
                <SettingItem
                  icon={Moon}
                  title="Dark Mode"
                  subtitle="Switch to dark theme"
                >
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.darkMode}
                      onChange={(e) =>
                        handleSettingChange("darkMode", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                  </label>
                </SettingItem>

                <SettingItem
                  icon={Globe}
                  title="Language"
                  subtitle="Choose your language"
                >
                  <select
                    value={settings.language}
                    onChange={(e) =>
                      handleSettingChange("language", e.target.value)
                    }
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </SettingItem>

                <SettingItem
                  icon={Smartphone}
                  title="Auto-play Videos"
                  subtitle="Play videos automatically"
                >
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoPlayVideos}
                      onChange={(e) =>
                        handleSettingChange("autoPlayVideos", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                  </label>
                </SettingItem>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Quick Actions
              </h2>

              <div className="space-y-4">
                <button
                  onClick={() => toast.info("Help center coming soon!")}
                  className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <HelpCircle className="w-5 h-5 text-blue-500" />
                  <span>Help & Support</span>
                </button>

                <button
                  onClick={() => toast.info("Data export coming soon!")}
                  className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Download className="w-5 h-5 text-green-500" />
                  <span>Export Data</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5 text-orange-500" />
                  <span>Logout</span>
                </button>

                <button
                  onClick={handleDeleteAccount}
                  className="w-full flex items-center gap-3 p-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
