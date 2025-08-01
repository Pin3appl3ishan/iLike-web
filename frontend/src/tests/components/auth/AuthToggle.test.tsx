import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AuthToggle from "@/components/auth/AuthToggle";

describe("AuthToggle Component", () => {
  it("should render login mode by default", () => {
    render(<AuthToggle isLogin={true} onToggle={() => {}} />);
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent(/sign up/i);
  });

  it("should render register mode correctly", () => {
    render(<AuthToggle isLogin={false} onToggle={() => {}} />);
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent(/sign in/i);
  });

  it("should call onToggle when clicked", () => {
    const mockToggle = vi.fn();
    render(<AuthToggle isLogin={true} onToggle={mockToggle} />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockToggle).toHaveBeenCalled();
  });

  it("should have correct button styling", () => {
    render(<AuthToggle isLogin={true} onToggle={() => {}} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "text-white",
      "font-semibold",
      "hover:text-pink-200",
      "transition-colors",
      "duration-300",
      "underline",
      "decoration-2",
      "underline-offset-4",
      "decoration-pink-300",
      "hover:decoration-pink-200"
    );
  });

  it("should have correct text color for message", () => {
    render(<AuthToggle isLogin={true} onToggle={() => {}} />);
    const message = screen.getByText(/don't have an account/i);
    expect(message).toHaveClass("text-white/70");
  });
});
