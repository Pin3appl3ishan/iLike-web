import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/admin/Dashboard';
import Users from '@/pages/admin/Users';
import Reports from '@/pages/admin/Reports';
import Settings from '@/pages/admin/Settings';

// This would be replaced with actual auth check
const isAuthenticated = true;
const isAdmin = true;

const AdminRoutes = () => {
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Routes>
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="users" element={<Users />} />
      <Route path="reports" element={<Reports />} />
      <Route path="settings" element={<Settings />} />
      <Route index element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
