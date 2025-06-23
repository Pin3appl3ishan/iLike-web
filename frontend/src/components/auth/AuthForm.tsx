import { useState } from 'react';
import type { FormEvent } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Sparkles } from 'lucide-react';

export interface FormData {
  name: string;
  email: string;
  password: string;
}

interface AuthFormProps {
  isLogin: boolean;
  formData: FormData;
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  error?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  isLogin,
  formData,
  isLoading,
  onInputChange,
  onSubmit,
  error
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.closest('form');
      if (form) {
        const formEvent = new Event('submit', { cancelable: true, bubbles: true }) as unknown as FormEvent<HTMLFormElement>;
        form.dispatchEvent(formEvent as unknown as Event);
      }
    }
  };

  return (
    <div className="space-y-6">
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
        className="space-y-6"
      >
        {/* Form header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back!' : 'Join iLike'}
          </h2>
          <p className="text-white/70">
            {isLogin ? 'Sign in to continue your journey' : 'Create your account to get started'}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Form fields */}
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
              onChange={onInputChange}
              onKeyPress={handleKeyPress}
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
            onChange={onInputChange}
            onKeyPress={handleKeyPress}
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
            onChange={onInputChange}
            onKeyPress={handleKeyPress}
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
          type="submit"
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
              {isLogin ? 'Sign In' : 'Create Account'}
            </div>
          )}
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
        </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;