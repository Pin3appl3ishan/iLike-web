import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/context/AuthProvider";
import { vi } from "vitest";

// Custom render function
function render(ui: React.ReactElement, { route = "/" } = {}) {
  window.history.pushState({}, "Test page", route);

  return rtlRender(
    <BrowserRouter>
      <AuthProvider>{ui}</AuthProvider>
    </BrowserRouter>
  );
}

// Mock auth context for testing
export const mockAuthContext = {
  user: {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    isAdmin: false,
  },
  isAuthenticated: true,
  isLoading: false,
  login: vi.fn(),
  logout: vi.fn(),
  register: vi.fn(),
  updateProfile: vi.fn(),
};

// Mock functions
export const mockFunctions = {
  onLike: vi.fn(),
  onDislike: vi.fn(),
  onToggle: vi.fn(),
  onSubmit: vi.fn(),
};

// Mock data
export const mockData = {
  user: {
    id: "1",
    name: "Test User",
    age: 25,
    bio: "Test bio",
    distance: "5km away",
    interests: ["Music", "Travel", "Food"],
    photos: ["photo1.jpg", "photo2.jpg"],
    location: "Kathmandu",
  },
  message: {
    id: "1",
    content: "Hello there!",
    senderId: "user1",
    timestamp: new Date().toISOString(),
    isSent: true,
  },
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
