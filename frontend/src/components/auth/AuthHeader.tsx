import React from 'react';
import { Heart } from 'lucide-react';

const AuthHeader: React.FC = () => {
  return (
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
  );
};

export default AuthHeader;