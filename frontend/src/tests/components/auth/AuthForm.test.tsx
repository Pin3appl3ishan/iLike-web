import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AuthForm from "@/components/auth/AuthForm";

describe("AuthForm Component", () => {
  const defaultProps = {
    isLogin: true,
    formData: {
      name: "",
      email: "",
      password: "",
    },
    isLoading: false,
    onInputChange: vi.fn(),
    onSubmit: vi.fn(),
  };

  it("should render login form by default", () => {
    render(<AuthForm {...defaultProps} />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/full name/i)).not.toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it("should render registration form when not in login mode", () => {
    render(<AuthForm {...defaultProps} isLogin={false} />);
    expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/create account/i)).toBeInTheDocument();
  });

  it("should handle input changes", () => {
    const onInputChange = vi.fn();
    render(<AuthForm {...defaultProps} onInputChange={onInputChange} />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com", name: "email" },
    });

    expect(onInputChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "test@example.com",
          name: "email",
        }),
      })
    );
  });

  it("should handle form submission", () => {
    const onSubmit = vi.fn();
    render(<AuthForm {...defaultProps} onSubmit={onSubmit} />);

    fireEvent.submit(screen.getByRole("form"));
    expect(onSubmit).toHaveBeenCalled();
  });

  it("should show loading state", () => {
    render(<AuthForm {...defaultProps} isLoading={true} />);
    expect(screen.getByText(/processing/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should toggle password visibility", () => {
    render(<AuthForm {...defaultProps} />);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(screen.getByRole("button", { name: "" })); // Password toggle button
    expect(passwordInput).toHaveAttribute("type", "text");
  });

  it("should show error message when provided", () => {
    const error = "Invalid credentials";
    render(<AuthForm {...defaultProps} error={error} />);
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it("should handle Enter key press", () => {
    const onSubmit = vi.fn();
    render(<AuthForm {...defaultProps} onSubmit={onSubmit} />);

    fireEvent.keyPress(screen.getByPlaceholderText(/email/i), {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(onSubmit).toHaveBeenCalled();
  });
});
