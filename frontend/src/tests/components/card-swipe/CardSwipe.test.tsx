import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CardSwipe } from "@/components/ui/card-swipe";

const mockUser = {
  id: "1",
  name: "Test User",
  age: 25,
  bio: "Test bio",
  distance: "5km away",
  interests: ["Music", "Travel", "Food"],
  photos: ["photo1.jpg", "photo2.jpg"],
  location: "Kathmandu",
};

describe("CardSwipe", () => {
  const mockOnLike = vi.fn();
  const mockOnDislike = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders user information correctly", () => {
    render(
      <CardSwipe
        user={mockUser}
        onLike={mockOnLike}
        onDislike={mockOnDislike}
      />
    );

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockUser.age}`)).toBeInTheDocument();
    expect(screen.getByText(mockUser.bio)).toBeInTheDocument();
  });

  it("displays user interests as pills", () => {
    render(
      <CardSwipe
        user={mockUser}
        onLike={mockOnLike}
        onDislike={mockOnDislike}
      />
    );

    mockUser.interests.forEach((interest) => {
      expect(screen.getByText(interest)).toBeInTheDocument();
    });
  });

  it("shows distance information", () => {
    render(
      <CardSwipe
        user={mockUser}
        onLike={mockOnLike}
        onDislike={mockOnDislike}
      />
    );

    expect(screen.getByText(mockUser.distance)).toBeInTheDocument();
  });

  it("handles like button click", () => {
    render(
      <CardSwipe
        user={mockUser}
        onLike={mockOnLike}
        onDislike={mockOnDislike}
      />
    );

    const likeButton = screen.getByRole("button", { name: /like/i });
    fireEvent.click(likeButton);
    expect(mockOnLike).toHaveBeenCalledWith(mockUser.id);
  });

  it("handles dislike button click", () => {
    render(
      <CardSwipe
        user={mockUser}
        onLike={mockOnLike}
        onDislike={mockOnDislike}
      />
    );

    const dislikeButton = screen.getByRole("button", { name: /dislike/i });
    fireEvent.click(dislikeButton);
    expect(mockOnDislike).toHaveBeenCalledWith(mockUser.id);
  });

  it("expands card details on view more click", () => {
    render(
      <CardSwipe
        user={mockUser}
        onLike={mockOnLike}
        onDislike={mockOnDislike}
      />
    );

    const expandButton = screen.getByRole("button", { name: /view more/i });
    fireEvent.click(expandButton);
    expect(screen.getByText("About Me")).toBeInTheDocument();
  });

  it("displays user photos correctly", () => {
    render(
      <CardSwipe
        user={mockUser}
        onLike={mockOnLike}
        onDislike={mockOnDislike}
      />
    );

    mockUser.photos.forEach((photo) => {
      const img = screen.getByAltText(`${mockUser.name}'s photo`);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", photo);
    });
  });

  it("shows loading state when user data is not available", () => {
    render(
      <CardSwipe
        user={undefined}
        onLike={mockOnLike}
        onDislike={mockOnDislike}
      />
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("disables buttons during loading state", () => {
    render(
      <CardSwipe
        user={undefined}
        onLike={mockOnLike}
        onDislike={mockOnDislike}
        isLoading={true}
      />
    );

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });
});
