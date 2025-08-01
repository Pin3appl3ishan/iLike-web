import { useState, useRef } from "react";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { uploadProfilePicture } from "@/services/profileService";

interface ProfilePictureUploadProps {
  currentPictureUrl: string | null;
  onUploadSuccess: (url: string) => void;
}

const ProfilePictureUpload = ({
  currentPictureUrl,
  onUploadSuccess,
}: ProfilePictureUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const newPictureUrl = await uploadProfilePicture(file);
      onUploadSuccess(newPictureUrl);
      toast.success("Profile picture updated successfully");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update profile picture"
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative">
      <div className="aspect-square w-32 h-32 relative rounded-full overflow-hidden border-2 border-gray-200">
        {currentPictureUrl ? (
          <>
            <img
              src={currentPictureUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
            >
              <Camera className="w-6 h-6 text-white" />
            </button>
          </>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-full flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <Camera className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Add Photo</span>
          </button>
        )}
      </div>

      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <Loader2 className="w-6 h-6 text-pink-500 animate-spin" />
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default ProfilePictureUpload;
