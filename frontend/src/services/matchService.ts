import api from "./api";

export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  distance: string;
  interests: string[];
  photos: string[];
  profilePicture?: string;
  gender?: string;
  location?: {
    type: string;
    coordinates: number[];
  };
  intentions?: string[];
  height?: number;
}

export interface MatchResponse {
  success: boolean;
  message: string;
  isMatch?: boolean;
  match?: {
    id: string;
    user: {
      id: string;
      name: string;
    };
  };
}

export interface PotentialMatchesResponse {
  success: boolean;
  data: User[];
  count: number;
}

// Get potential matches for swiping
export const getPotentialMatches = async (): Promise<User[]> => {
  try {
    const response = await api.get("/matches/potential");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching potential matches:", error);
    throw error;
  }
};

// Like a user
export const likeUser = async (userId: string): Promise<MatchResponse> => {
  try {
    const response = await api.post(`/matches/like/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error liking user:", error);
    throw error;
  }
};

// Dislike a user
export const dislikeUser = async (userId: string): Promise<MatchResponse> => {
  try {
    const response = await api.delete(`/matches/like/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error disliking user:", error);
    throw error;
  }
};

// Get user's matches
export const getMatches = async (): Promise<User[]> => {
  try {
    const response = await api.get("/matches");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching matches:", error);
    throw error;
  }
};

// Get users who liked current user
export const getLikesReceived = async (): Promise<User[]> => {
  try {
    const response = await api.get("/matches/likes");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching likes received:", error);
    throw error;
  }
};

// Get likes sent by current user
export const getLikesSent = async (): Promise<User[]> => {
  try {
    const response = await api.get("/matches/likes-sent");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching likes sent:", error);
    throw error;
  }
};
