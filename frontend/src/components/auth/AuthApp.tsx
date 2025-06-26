import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import type { LoginCredentials } from '@/services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthHeader from './AuthHeader';
import AuthForm from './AuthForm';
import AuthToggle from './AuthToggle';

type FormData = LoginCredentials & {
  name: string;
};

const AuthApp: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    
    // Prevent multiple submissions
    if (isLoading) return;
    
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Handle login
        const { email, password } = formData;
        console.log('Attempting login with:', { email });
        
        const { user } = await login({ email, password });
        console.log('Login successful, user:', user);
        
        toast.success('Logged in successfully!');
        
        // Determine redirect path
        let redirectPath = '/';
        if (user?.isAdmin) {
          redirectPath = '/admin/dashboard';  // Changed to match the admin route structure
        } else {
          redirectPath = from === '/' ? '/home' : from;
        }
        
        console.log('Redirecting to:', redirectPath);
        navigate(redirectPath, { replace: true });
      } else {
        // Handle registration
        const { name, email, password } = formData;
        await register({ name, email, password });
        toast.success('Account created successfully!');
        navigate('/home', { replace: true });
      }
    } catch (err) {
      console.error('Authentication error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
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