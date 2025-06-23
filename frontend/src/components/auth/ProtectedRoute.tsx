import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  adminOnly = true,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute check:", {
    isAuthenticated,
    isAdmin: user?.isAdmin,
    adminOnly,
    path: location.pathname,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page, but save the current location they were trying to go to
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Check for admin access if required
  if (adminOnly && !user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
