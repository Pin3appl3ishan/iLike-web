import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import HomePage from '../pages/HomePage';

const AppRoutes: React.FC = () => {
  return (
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={< HomePage/>} />
        <Route path="/" element={<Navigate to="/auth" replace />} />
   
      </Routes>
  );
};

export default AppRoutes;

