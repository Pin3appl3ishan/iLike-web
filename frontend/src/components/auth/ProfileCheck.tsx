import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getProfile } from "@/services/profileService";

interface ProfileCheckProps {
  children: React.ReactNode;
}

export const ProfileCheck: React.FC<ProfileCheckProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [isProfileComplete, setIsProfileComplete] = useState<boolean | null>(
    null
  );
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkProfile = async () => {
      console.log("ProfileCheck: Starting profile check", {
        isAuthenticated,
        user,
        location: location.pathname,
      });

      if (!isAuthenticated || !user) {
        console.log("ProfileCheck: No auth or user, skipping check");
        setIsChecking(false);
        return;
      }

      // First check if the user object already has hasCompletedProfile set to true
      if (user.hasCompletedProfile) {
        console.log("ProfileCheck: User has completed profile flag");
        setIsProfileComplete(true);
        setIsChecking(false);
        return;
      }

      try {
        console.log("ProfileCheck: Fetching profile from API");
        const response = await getProfile();
        console.log("ProfileCheck: Profile response", response);

        // Check if we got a successful response with profile data
        const profileComplete =
          response.success && response.data
            ? Boolean(
                response.data.gender &&
                  response.data.interests?.length > 0 &&
                  response.data.age
              )
            : false;

        console.log("ProfileCheck: Profile complete status:", profileComplete);

        // Update the user object in local storage if the profile is complete
        if (profileComplete) {
          const updatedUser = {
            ...user,
            hasCompletedProfile: true,
            profile: response.data,
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setIsProfileComplete(profileComplete);
        } else {
          setIsProfileComplete(false);
        }
      } catch (error) {
        console.error("ProfileCheck: Error checking profile:", error);
        setIsProfileComplete(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkProfile();
  }, [isAuthenticated, user, location.pathname]);

  console.log("ProfileCheck: Current state", {
    isLoading,
    isChecking,
    isAuthenticated,
    isProfileComplete,
    pathname: location.pathname,
  });

  if (isLoading || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    console.log("ProfileCheck: Not authenticated, redirecting to /auth");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If profile is not complete, redirect to profile setup
  if (
    isProfileComplete === false &&
    !location.pathname.startsWith("/setup-profile")
  ) {
    console.log(
      "ProfileCheck: Profile incomplete, redirecting to /setup-profile"
    );
    return <Navigate to="/setup-profile" state={{ from: location }} replace />;
  }

  // If user is on profile setup but profile is already complete, redirect to home
  if (location.pathname.startsWith("/setup-profile") && isProfileComplete) {
    console.log("ProfileCheck: Profile already complete, redirecting to /home");
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};
