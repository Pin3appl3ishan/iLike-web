import api from './api';

export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  isAdmin?: boolean;
  // Add other user properties as needed
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends Omit<User, '_id'> {
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  // Register a new user
  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/users/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/users/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Logout user
  logout(): void {
    localStorage.removeItem('token');
    // Redirect to login page or home page
    window.location.href = '/login';
  },

  // Get current user profile
  async getProfile(userId: string): Promise<User> {
    const response = await api.get<User>(`/users/profile/${userId}`);
    return response.data;
  },

  // Update user profile
  async updateProfile(userId: string, userData: Partial<User>): Promise<User> {
    const response = await api.put<User>(`/users/profile/${userId}`, userData);
    return response.data;
  },

  // Get all users (for admin)
  async getAllUsers(): Promise<User[]> {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  // Like a user
  async likeUser(userId: string, targetUserId: string): Promise<void> {
    await api.post(`/users/like/${targetUserId}`, { userId });
  },

  // Dislike a user
  async dislikeUser(userId: string, targetUserId: string): Promise<void> {
    await api.post(`/users/dislike/${targetUserId}`, { userId });
  },

  // Get user matches
  async getMatches(userId: string): Promise<User[]> {
    const response = await api.get<User[]>(`/users/matches?userId=${userId}`);
    return response.data;
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  // Get auth token
  getToken(): string | null {
    return localStorage.getItem('token');
  },
};
