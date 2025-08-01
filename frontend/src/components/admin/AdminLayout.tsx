import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white fill-current" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                  iLike Admin
                </h1>
              </div>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-6">
                <Link
                  to="/admin/dashboard"
                  className={`font-medium transition-colors ${
                    isActiveLink("/admin/dashboard")
                      ? "text-pink-600 border-b-2 border-pink-600 pb-1"
                      : "text-gray-600 hover:text-pink-600"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/users"
                  className={`font-medium transition-colors ${
                    isActiveLink("/admin/users")
                      ? "text-pink-600 border-b-2 border-pink-600 pb-1"
                      : "text-gray-600 hover:text-pink-600"
                  }`}
                >
                  Users
                </Link>
                <Link
                  to="/admin/reports"
                  className={`font-medium transition-colors ${
                    isActiveLink("/admin/reports")
                      ? "text-pink-600 border-b-2 border-pink-600 pb-1"
                      : "text-gray-600 hover:text-pink-600"
                  }`}
                >
                  Reports
                </Link>
                <Link
                  to="/admin/settings"
                  className={`font-medium transition-colors ${
                    isActiveLink("/admin/settings")
                      ? "text-pink-600 border-b-2 border-pink-600 pb-1"
                      : "text-gray-600 hover:text-pink-600"
                  }`}
                >
                  Settings
                </Link>
              </nav>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
