import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock AuthContext
vi.mock("@/context/AuthContext", () => ({
  AuthContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
  useAuth: () => ({
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
  }),
}));

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock ResizeObserver
class MockResizeObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: MockResizeObserver,
});

// Mock URL.createObjectURL
Object.defineProperty(URL, "createObjectURL", {
  writable: true,
  value: vi.fn(),
});

// Mock URL.revokeObjectURL
Object.defineProperty(URL, "revokeObjectURL", {
  writable: true,
  value: vi.fn(),
});
