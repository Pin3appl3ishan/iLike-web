import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import {
  Send,
  MoreVertical,
  Phone,
  Video,
  Image as ImageIcon,
  Search,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

// Import images from assets
import image1 from "@/assets/1.jpg";
import image2 from "@/assets/2.jpg";
import image3 from "@/assets/3.jpg";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: "text" | "image";
  isOwn: boolean;
}

interface Conversation {
  id: string;
  matchId: string;
  matchName: string;
  matchPhoto: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
}

const ChatPage: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock conversations data
  const mockConversations: Conversation[] = [
    {
      id: "1",
      matchId: "1",
      matchName: "Sarah Chen",
      matchPhoto: image1,
      lastMessage: "Hey! I loved your hiking photos! 🏔️",
      lastMessageTime: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: "2",
      matchId: "2",
      matchName: "Emma Wilson",
      matchPhoto: image2,
      lastMessage: "Want to grab coffee sometime? ☕",
      lastMessageTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: "3",
      matchId: "3",
      matchName: "Jessica Lee",
      matchPhoto: image3,
      lastMessage: "Your art is amazing! 🎨",
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      unreadCount: 1,
      isOnline: true,
    },
    {
      id: "4",
      matchId: "4",
      matchName: "Maya Rodriguez",
      matchPhoto: image1,
      lastMessage: "Thanks for the recommendation! 📚",
      lastMessageTime: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: "5",
      matchId: "5",
      matchName: "Sophia Kim",
      matchPhoto: image2,
      lastMessage: "Great workout today! 💪",
      lastMessageTime: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      unreadCount: 3,
      isOnline: true,
    },
  ];

  // Mock messages data
  const mockMessages: Message[] = [
    {
      id: "1",
      senderId: "1",
      senderName: "Sarah Chen",
      content: "Hey! I loved your hiking photos! 🏔️",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      type: "text",
      isOwn: false,
    },
    {
      id: "2",
      senderId: "current",
      senderName: "You",
      content:
        "Thank you! I love hiking too. Have you been to any good trails recently?",
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      type: "text",
      isOwn: true,
    },
    {
      id: "3",
      senderId: "1",
      senderName: "Sarah Chen",
      content:
        "Yes! I just hiked Mount Tam last weekend. The views were incredible!",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: "text",
      isOwn: false,
    },
    {
      id: "4",
      senderId: "1",
      senderName: "Sarah Chen",
      content: "Would you like to see some photos?",
      timestamp: new Date(Date.now() - 4 * 60 * 1000),
      type: "text",
      isOwn: false,
    },
  ];

  useEffect(() => {
    // Load conversations
    setConversations(mockConversations);

    // If matchId is provided, select that conversation
    if (matchId) {
      const conversation = mockConversations.find((c) => c.matchId === matchId);
      if (conversation) {
        setSelectedConversation(conversation);
        setMessages(mockMessages);
      }
    }

    setLoading(false);
  }, [matchId]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatConversationTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      return formatTime(date);
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: "current",
      senderName: "You",
      content: newMessage,
      timestamp: new Date(),
      type: "text",
      isOwn: true,
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Simulate reply after 2 seconds
    setTimeout(() => {
      const replies = [
        "That's awesome! 😊",
        "I totally agree!",
        "Thanks for sharing!",
        "That sounds great!",
        "I'd love to hear more about that!",
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedConversation.matchId,
        senderName: selectedConversation.matchName,
        content: randomReply,
        timestamp: new Date(),
        type: "text",
        isOwn: false,
      };

      setMessages((prev) => [...prev, replyMessage]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setMessages(mockMessages); // In real app, fetch messages for this conversation
    // Update URL without page reload
    navigate(`/chat/${conversation.matchId}`);
  };

  const filteredConversations = conversations.filter((conversation) =>
    conversation.matchName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-red-50">
        <Navbar onLogout={() => {}} />
        <main className="h-[calc(100vh-80px)] p-0">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading conversations...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-red-50">
      <Navbar onLogout={() => {}} />
      <main className="h-[calc(100vh-80px)] p-0">
        <div className="h-full bg-gray-50">
          {/* Chat Container - Full Screen */}
          <div className="flex h-full bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Sidebar - Conversations List */}
            <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <h1 className="text-xl font-bold text-gray-800">Messages</h1>
              </div>

              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    {searchQuery
                      ? "No conversations found"
                      : "No conversations yet"}
                  </div>
                ) : (
                  filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => selectConversation(conversation)}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 ${
                        selectedConversation?.id === conversation.id
                          ? "bg-pink-50 border-pink-200"
                          : ""
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={conversation.matchPhoto}
                            alt={conversation.matchName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          {conversation.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-800 truncate">
                              {conversation.matchName}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {formatConversationTime(
                                conversation.lastMessageTime
                              )}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate mt-1">
                            {conversation.lastMessage}
                          </p>
                        </div>

                        {conversation.unreadCount > 0 && (
                          <div className="bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="bg-white border-b border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={selectedConversation.matchPhoto}
                          alt={selectedConversation.matchName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {selectedConversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h2 className="font-semibold text-gray-800">
                          {selectedConversation.matchName}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {selectedConversation.isOnline ? "Online" : "Offline"}
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                          <Phone className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                          <Video className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.isOwn ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.isOwn
                              ? "bg-gradient-to-r from-pink-500 to-red-500 text-white"
                              : "bg-white text-gray-800 shadow-sm"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.isOwn ? "text-pink-100" : "text-gray-500"
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="bg-white border-t border-gray-200 p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                        <ImageIcon className="w-5 h-5" />
                      </button>

                      <div className="flex-1 relative">
                        <textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type a message..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          rows={1}
                          style={{ minHeight: "44px", maxHeight: "120px" }}
                        />
                      </div>

                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="p-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full hover:from-pink-600 hover:to-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* Empty State - No conversation selected */
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="text-6xl mb-4">💬</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-gray-600">
                      Choose a conversation from the sidebar to start chatting
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
