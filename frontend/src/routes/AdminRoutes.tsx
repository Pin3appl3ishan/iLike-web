import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/pages/admin/Dashboard";
import Users from "@/pages/admin/Users";
import Reports from "@/pages/admin/Reports";
import Settings from "@/pages/admin/Settings";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="users" element={<Users />} />
      <Route path="reports" element={<Reports />} />
      <Route path="settings" element={<Settings />} />
    </Routes>
  );
};

export default AdminRoutes;
