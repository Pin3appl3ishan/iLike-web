import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ProfileCheck } from "@/components/auth/ProfileCheck";
import { useAuth } from "@/context/AuthContext";
import AuthPage from "@/pages/AuthPage";
import HomePage from "@/pages/HomePage";
import ExplorePage from "@/pages/ExplorePage";
import MatchesPage from "@/pages/MatchesPage";
import ChatPage from "@/pages/ChatPage";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import NotificationsPage from "@/pages/NotificationsPage";
import ProfileSetup from "@/components/ProfileSetup";

// Lazy load pages for better performance
const AdminRoutes = lazy(() => import("@/routes/AdminRoutes"));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
  </div>
);

const AppRoutes = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route
          path="/auth"
          element={
            user ? (
              user.isAdmin ? (
                <Navigate to="/admin" replace />
              ) : user.hasCompletedProfile ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/setup-profile" replace />
              )
            ) : (
              <AuthPage />
            )
          }
        />

        {/* Profile setup route (accessible only if profile is incomplete) */}
        <Route
          path="/setup-profile"
          element={
            <ProtectedRoute>
              {user?.isAdmin ? (
                <Navigate to="/admin" replace />
              ) : user?.hasCompletedProfile ? (
                <Navigate to="/home" replace />
              ) : (
                <ProfileSetup />
              )}
            </ProtectedRoute>
          }
        />

        {/* Protected routes that require profile completion */}
        <Route
          element={
            <ProtectedRoute>
              <ProfileCheck>
                <Outlet />
              </ProfileCheck>
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:matchId" element={<ChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Route>

        {/* Admin routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
