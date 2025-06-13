import React from 'react';

interface AuthToggleProps {
  isLogin: boolean;
  onToggle: () => void;
}

const AuthToggle: React.FC<AuthToggleProps> = ({ isLogin, onToggle }) => {
  return (
    <div className="text-center mt-6">
      <p className="text-white/70 mb-2">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
      </p>
      <button
        onClick={onToggle}
        className="text-white font-semibold hover:text-pink-200 transition-colors duration-300 underline decoration-2 underline-offset-4 decoration-pink-300 hover:decoration-pink-200"
      >
        {isLogin ? 'Sign Up' : 'Sign In'}
      </button>
    </div>
  );
};

export default AuthToggle;