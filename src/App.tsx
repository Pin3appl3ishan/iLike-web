import { useState } from "react";
import { Heart, Eye, EyeOff, Mail, Lock, User, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <HomePage />;
      <AuthApp />;
    </>
  );
}

export default App;

function AuthApp() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Simulate API call - replace with your actual backend endpoints
    // const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      // Replace this with your actual API call
      console.log(`${isLogin ? "Login" : "Signup"} attempt:`, payload);

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Demo success message
      alert(
        `${
          isLogin ? "Login" : "Signup"
        } successful! Ready for backend integration.`
      );
      navigate("/home");
    } catch (error) {
      console.error("Auth error:", error);
      alert("Authentication failed. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-red-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4 border border-white/30">
            <Heart className="w-10 h-10 text-white fill-current animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            iLike
          </h1>
          <p className="text-white/80 text-lg font-light">
            Find your perfect match
          </p>
        </div>

        {/* Auth form card */}
        <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
          {/* Form header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {isLogin ? "Welcome Back!" : "Join iLike"}
            </h2>
            <p className="text-white/70">
              {isLogin
                ? "Sign in to continue your journey"
                : "Create your account to get started"}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Name field (signup only) */}
            {!isLogin && (
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-white/50 group-focus-within:text-white transition-colors" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  required={!isLogin}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 backdrop-blur-sm"
                />
              </div>
            )}

            {/* Email field */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-white/50 group-focus-within:text-white transition-colors" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                required
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            {/* Password field */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-white/50 group-focus-within:text-white transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
                className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 backdrop-blur-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-white/50 hover:text-white transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-white/50 hover:text-white transition-colors" />
                )}
              </button>
            </div>

            {/* Submit button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-2xl hover:from-pink-600 hover:to-red-600 focus:outline-none focus:ring-4 focus:ring-white/20 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg relative overflow-hidden group"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  {isLogin ? "Sign In" : "Create Account"}
                </div>
              )}
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
            </button>
          </div>

          {/* Toggle auth mode */}
          <div className="text-center mt-6">
            <p className="text-white/70 mb-2">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              onClick={toggleAuthMode}
              className="text-white font-semibold hover:text-pink-200 transition-colors duration-300 underline decoration-2 underline-offset-4 decoration-pink-300 hover:decoration-pink-200"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>

        {/* Demo info */}
        {/* <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            🎬 Sprint 1 Demo - Ready for backend integration
          </p>
        </div> */}
      </div>
    </div>
  );
}
