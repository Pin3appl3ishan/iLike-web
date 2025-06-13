import React, { useState } from 'react';
import AuthHeader from './AuthHeader';
import AuthForm from './AuthForm';
import AuthToggle from './AuthToggle';
import { useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const AuthApp: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    navigate('/home');
    return;
    
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      // Replace with your actual API call
      console.log(`${isLogin ? 'Login' : 'Signup'} attempt:`, payload);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success handling - replace with your logic
      alert(`${isLogin ? 'Login' : 'Signup'} successful!`);
      
      // Reset form or redirect
      setFormData({ name: '', email: '', password: '' });
      
    } catch (error) {
      console.error('Auth error:', error);
      alert('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
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
        <AuthHeader />
        
        {/* Auth form card */}
        <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
          <AuthForm
            isLogin={isLogin}
            formData={formData}
            isLoading={isLoading}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />
          
          <AuthToggle
            isLogin={isLogin}
            onToggle={toggleAuthMode}
          />
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
};

export default AuthApp;