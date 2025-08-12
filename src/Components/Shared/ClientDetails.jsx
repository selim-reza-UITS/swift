import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Bot, User, MessageSquare, AlertTriangle } from "lucide-react";

function ClientDetails() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "Hi Sarah! This is your weekly check-in from Arviso. How are you feeling this week? Any new symptoms or concerns about your injury?",
      time: "2 hours ago",
    },
    {
      from: "user",
      text: "Hi! I've been having more pain in my back lately, especially when I try to sleep. Should I be worried?",
      time: "1 hour ago",
    },
    {
      from: "admin",
      text: "It’s best to see a doctor or healthcare professional to get it checked, especially if it’s affecting your sleep or daily activities.",
      time: "1 hour ago",
    },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showClientInsights, setShowClientInsights] = useState(false);
  const navigate = useNavigate();
  console.log(openModal);

  const handleSendMessage = () => {
    const trimmed = message.trim();
    if (trimmed === "") return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { from: "admin", text: trimmed, time: "Just now" },
    ]);
    setMessage("");
  };
  return (
    <div className="h-[86vh] bg-gray-900 text-white flex relative">
      {/* Back Button */}
      <button
        className="absolute top-2 left-2 z-50 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center shadow"
        onClick={() => navigate(-1)}
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        Back
      </button>
      {/* Left Sidebar - Client Info */}
      <div className="w-80 bg-gray-800 p-6 mr-4 rounded-xl">
        {/* Client Profile */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mr-4">
            <User className="w-8 h-8 text-gray-300" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Sarah Johnson</h2>
            <p className="text-gray-400 text-center">(555) 123-4567</p>
          </div>
        </div>

        {/* Case Details */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between">
            <span className="text-gray-400">Incident Date:</span>
            <span>2025-9-15</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Client Status:</span>
            <span className="bg-blue-600 px-2 py-1 rounded text-sm">
              On Going
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Gender:</span>
            <span>Female</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Managing User(s):</span>
            <span>John Smith</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Lawyer:</span>
            <span>Robert Johnson</span>
          </div>
        </div>

        {/* Communication Status */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Communication Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Scheduled Next Send:</span>
              <span className="bg-blue-600 px-2 py-1 rounded text-sm">
                2025-9-20
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Client Sentiment:</span>
              <span className="text-green-400">Positive</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Risk Level:</span>
              <span className="text-red-400">High</span>
            </div>
          </div>
        </div>

        {/* Case Notes */}
        <div>
          <h3 className="text-lg font-semibold mb-4">General Case Info</h3>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-300 text-sm">
              Client reported back pain after accident.
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold my-4">Injury's Sustained:</h3>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-300 text-sm">
              Lower back pain and stiffness.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-gray-800 rounded-xl">
        {/* Header */}
        <div className=" p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Sarah Johnson</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4 relative">
            <button
              className="border px-3 py-1 rounded text-sm inline-block hover:bg-gray-700 transition-colors"
              onClick={() => setShowClientInsights(true)}
            >
              Client Summary
            </button>
            <span className="bg-yellow-600 px-3 py-1 rounded text-sm inline-block">
              Medium Risk
            </span>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isPaused ? "bg-red-600" : "bg-green-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isPaused ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span
                  className={`text-sm font-medium ${
                    isPaused ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {isPaused ? "Paused" : "Active"}
                </span>
              </div>
            </div>
            {/* {openModal && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
                onClick={() => setOpenModal(false)}
                tabIndex={-1}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setOpenModal(false);
                }}
              >
                <div
                  className="absolute top-12 right-10 w-64 bg-gray-800 border border-gray-700 rounded-lg p-4 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center space-x-3 text-left p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                      <Pause className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400">
                        Pause Communications
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto">
          {messages.map((msg, idx) =>
            msg.from === "user" ? (
              <div className="mb-6" key={idx}>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-700 p-4 rounded-lg w-auto">
                      <p className="text-gray-300">{msg.text}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                      <span>AI Assistant</span>
                      <span>•</span>
                      <span>{msg.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-6" key={idx}>
                <div className="flex items-start space-x-3 justify-end">
                  <div className="flex-1 flex justify-end">
                    <div className="bg-blue-600 p-4 rounded-lg max-w-5xl">
                      <p className="text-white">{msg.text}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2 mt-2 text-xs text-gray-500">
                  <span>Sarah Johnson</span>
                  <span>•</span>
                  <span>{msg.time}</span>
                </div>
              </div>
            )
          )}
        </div>

        {/* Message Input */}
        <div className="bg-gray-800 p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Type your response..."
                className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <button
              className="bg-blue-600 p-3 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleSendMessage}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Client Insights Popup */}
      {showClientInsights && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60"
          onClick={() => setShowClientInsights(false)}
        >
          <div
            className="relative w-full max-w-2xl p-6 rounded-lg shadow-lg bg-slate-800 mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-blue-400">
                Client Insights
              </h2>
              <button
                onClick={() => setShowClientInsights(false)}
                className="text-gray-400 hover:text-white text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {/* First Alert */}
              <div className="bg-[#342C38] border-l-4 border-[#EF4444] p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-gray-200 mb-2">
                      Client missed 2 previous appointments. Expressed
                      frustration about case speed during automated check-in.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">
                        May 10, 2025 - Concern
                      </span>
                      {/* <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm transition-colors">
                        Action Required
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Alert */}
              <div className="bg-[#342C38] border-l-4 border-[#EF4444] p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-gray-200 mb-2">
                      Client asked a question about medical records. Message
                      flagged for review.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">
                        May 18, 2025 - Flagged Message
                      </span>
                      {/* <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm transition-colors">
                        Action Required
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientDetails;
