import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChatMessage } from "@/components/chat/ChatMessage";

describe("ChatMessage Component", () => {
  const mockSentMessage = {
    id: "1",
    content: "Hello there!",
    senderId: "user1",
    timestamp: new Date().toISOString(),
    isSent: true,
  };

  const mockReceivedMessage = {
    id: "2",
    content: "Hi! How are you?",
    senderId: "user2",
    timestamp: new Date().toISOString(),
    isSent: false,
  };

  it("renders sent message correctly", () => {
    render(<ChatMessage message={mockSentMessage} />);
    expect(screen.getByText(mockSentMessage.content)).toBeInTheDocument();
    expect(screen.getByTestId("message-container")).toHaveClass("justify-end");
  });

  it("renders received message correctly", () => {
    render(<ChatMessage message={mockReceivedMessage} />);
    expect(screen.getByText(mockReceivedMessage.content)).toBeInTheDocument();
    expect(screen.getByTestId("message-container")).toHaveClass(
      "justify-start"
    );
  });

  it("applies correct styles for sent message", () => {
    render(<ChatMessage message={mockSentMessage} />);
    const messageContent = screen.getByText(mockSentMessage.content);
    expect(messageContent).toHaveClass("bg-pink-500", "text-white");
  });

  it("applies correct styles for received message", () => {
    render(<ChatMessage message={mockReceivedMessage} />);
    const messageContent = screen.getByText(mockReceivedMessage.content);
    expect(messageContent).toHaveClass("bg-gray-200", "text-gray-800");
  });

  it("displays sender avatar for received messages", () => {
    render(<ChatMessage message={mockReceivedMessage} />);
    const avatar = screen.getByAltText("sender avatar");
    expect(avatar).toBeInTheDocument();
  });

  it("formats timestamp correctly", () => {
    const date = new Date();
    const message = { ...mockSentMessage, timestamp: date.toISOString() };
    render(<ChatMessage message={message} />);

    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    expect(screen.getByText(formattedTime)).toBeInTheDocument();
  });

  it("handles long messages without breaking layout", () => {
    const longMessage = {
      ...mockSentMessage,
      content:
        "This is a very long message that should wrap properly without breaking the chat layout. It should maintain proper spacing and alignment.",
    };
    render(<ChatMessage message={longMessage} />);
    expect(screen.getByText(longMessage.content)).toBeInTheDocument();
  });

  it("handles emoji in messages", () => {
    const messageWithEmoji = {
      ...mockSentMessage,
      content: "Hello! 👋 How are you? 😊",
    };
    render(<ChatMessage message={messageWithEmoji} />);
    expect(screen.getByText(messageWithEmoji.content)).toBeInTheDocument();
  });
});
