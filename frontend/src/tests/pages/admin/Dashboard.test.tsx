import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AdminDashboard from "@/pages/admin/Dashboard";
import { toast } from "react-toastify";

// Mock the AuthContext
vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    user: {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      isAdmin: true,
    },
    isAuthenticated: true,
  }),
}));

// Mock react-toastify
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    info: vi.fn(),
  },
}));

describe("Admin Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderDashboard = () => {
    return render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );
  };

  it("renders dashboard title", () => {
    renderDashboard();
    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
    expect(
      screen.getByText("Monitor and manage your dating platform")
    ).toBeInTheDocument();
  });

  it("displays all stat cards", () => {
    renderDashboard();
    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("Active Users")).toBeInTheDocument();
    expect(screen.getByText("Total Matches")).toBeInTheDocument();
    expect(screen.getByText("Messages Sent")).toBeInTheDocument();
  });

  it("shows recent user list", () => {
    renderDashboard();
    expect(screen.getByText("Recent Users")).toBeInTheDocument();
    const userTable = screen.getByRole("table");
    expect(userTable).toBeInTheDocument();
  });

  it("displays user status badges correctly", () => {
    renderDashboard();
    const statusBadges = screen.getAllByText(/active|suspended|pending/i);
    expect(statusBadges.length).toBeGreaterThan(0);
  });

  it("shows user actions buttons", () => {
    renderDashboard();
    expect(screen.getAllByTitle("View Profile")).toHaveLength(5);
    expect(screen.getAllByTitle("Approve User")).toHaveLength(5);
    expect(screen.getAllByTitle("Suspend User")).toHaveLength(5);
  });

  it("handles user action clicks", () => {
    renderDashboard();
    const viewButton = screen.getAllByTitle("View Profile")[0];
    fireEvent.click(viewButton);
    expect(toast.success).toHaveBeenCalledWith(expect.stringContaining("View"));
  });

  it("displays quick actions section", () => {
    renderDashboard();
    expect(screen.getByText("Quick Actions")).toBeInTheDocument();
    expect(screen.getByText("Manage Users")).toBeInTheDocument();
    expect(screen.getByText("View Reports")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Security")).toBeInTheDocument();
  });

  it("shows system status", () => {
    renderDashboard();
    expect(screen.getByText("System Status")).toBeInTheDocument();
    expect(screen.getByText("API Status")).toBeInTheDocument();
    expect(screen.getByText("Database")).toBeInTheDocument();
    expect(screen.getByText("Notifications")).toBeInTheDocument();
  });

  it("handles refresh click", () => {
    renderDashboard();
    const refreshButton = screen.getByText("Refresh");
    fireEvent.click(refreshButton);
    expect(toast.info).toHaveBeenCalledWith("Refreshing data...");
  });

  it("displays platform stats correctly", () => {
    renderDashboard();
    expect(screen.getByText("Platform Stats")).toBeInTheDocument();
    expect(screen.getByText("New Users Today")).toBeInTheDocument();
    expect(screen.getByText("Reports Today")).toBeInTheDocument();
    expect(screen.getByText("Average Age")).toBeInTheDocument();
    expect(screen.getByText("Top Location")).toBeInTheDocument();
  });

  it("shows correct navigation links", () => {
    renderDashboard();
    const viewAllButton = screen.getByText("View All");
    expect(viewAllButton).toBeInTheDocument();
    fireEvent.click(viewAllButton);
    expect(toast.info).toHaveBeenCalledWith("View all users page coming soon!");
  });
});
