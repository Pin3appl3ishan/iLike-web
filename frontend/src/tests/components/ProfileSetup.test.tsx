import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProfileSetup from "../../components/ProfileSetup";

describe("ProfileSetup Component", () => {
  it("should render profile setup form", () => {
    render(<ProfileSetup />);

    expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /bio/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /save|continue/i })
    ).toBeInTheDocument();
  });

  it("should handle form submission with valid data", async () => {
    const mockSubmit = vi.fn();
    render(<ProfileSetup onSubmit={mockSubmit} />);

    const nameInput = screen.getByRole("textbox", { name: /name/i });
    const bioInput = screen.getByRole("textbox", { name: /bio/i });
    const dobInput = screen.getByLabelText(/date of birth/i);
    const submitButton = screen.getByRole("button", { name: /save|continue/i });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(bioInput, { target: { value: "Test bio" } });
    fireEvent.change(dobInput, { target: { value: "1990-01-01" } });
    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith({
      name: "John Doe",
      bio: "Test bio",
      dateOfBirth: "1990-01-01",
    });
  });

  it("should validate required fields", () => {
    render(<ProfileSetup />);

    const submitButton = screen.getByRole("button", { name: /save|continue/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/bio is required/i)).toBeInTheDocument();
    expect(screen.getByText(/date of birth is required/i)).toBeInTheDocument();
  });

  it("should validate age requirement", () => {
    render(<ProfileSetup />);

    const dobInput = screen.getByLabelText(/date of birth/i);
    const submitButton = screen.getByRole("button", { name: /save|continue/i });

    // Set date to less than 18 years ago
    const today = new Date();
    const invalidDate = new Date(today.setFullYear(today.getFullYear() - 17));
    fireEvent.change(dobInput, {
      target: { value: invalidDate.toISOString().split("T")[0] },
    });
    fireEvent.click(submitButton);

    expect(
      screen.getByText(/must be at least 18 years old/i)
    ).toBeInTheDocument();
  });

  it("should handle bio character limit", () => {
    render(<ProfileSetup />);

    const bioInput = screen.getByRole("textbox", { name: /bio/i });
    const longBio = "a".repeat(501); // Assuming 500 char limit

    fireEvent.change(bioInput, { target: { value: longBio } });

    expect(
      screen.getByText(/bio cannot exceed 500 characters/i)
    ).toBeInTheDocument();
  });
});
