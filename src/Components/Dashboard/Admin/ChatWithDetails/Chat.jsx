import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaPaperPlane } from "react-icons/fa";
import { User, Bot, AlertTriangle, Send, MessageSquare } from "lucide-react"; // Adjust imports according to your icons
import {
  useGetAllLawyerQuery,
  useGetAllUserQuery,
} from "../../../../Redux/api/intakeapi";
import { useClientOptOutMutation } from "../../../../Redux/api/caseapi";
import {
  useGetClientByIdQuery,
  useGetMicroInsightsQuery,
  useUpdateClientStatusMutation,
} from "../../../../Redux/feature/Admin/admin";

const Chat = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: client, isLoading, refetch } = useGetClientByIdQuery(params.id);
  const { data: lawyersData } = useGetAllLawyerQuery();
  const { data: usersData } = useGetAllUserQuery();
  const [isPaused, setIsPaused] = useState(client?.isPaused);
  const [isActive, setIsActive] = useState(client?.isActive);
  const { data: microInsights } = useGetMicroInsightsQuery(params.id);
  console.log("Micro Insights Data:", microInsights);

  const [updateStatus,  { isLoading: isUpdating }] = useUpdateClientStatusMutation();

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

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    managingUsers: [],
    managingUsersIds: [],
    gender: "Female",
    dateOfIncident: "2024/01/15",
    lawyerName: "",
    injuriesSustained: "Lower back pain and stiffness.",
    generalCaseInfo: "Client reported back pain after accident.",
    consentToCommunicate: false,
    sentiment: "Positive",
    status: "",
    scheduledTime: "",
    concernLevel: "High",
  });

  const managingRef = useRef(null);
  const [isManagingOpen, setIsManagingOpen] = useState(false);
const handleToggle = async () => {
    if (!client) return;

    const newPaused = !client.is_paused;
    const newActive = !newPaused;

    try {
      await updateStatus({
        id: client.id,
        is_paused: newPaused,
        is_active: newActive,
      }).unwrap();

      await refetch(); // ✅ server থেকে fresh data আনবে

      Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: newPaused ? "Client Paused" : "Client Active",
        background: "#1f2937",
        color: "#f9fafb",
        confirmButtonColor: "#8B5CF6",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.data?.message || "Something went wrong",
        background: "#1f2937",
        color: "#f9fafb",
        confirmButtonColor: "#8B5CF6",
      });
    }
  };

  // Close managing dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (managingRef.current && !managingRef.current.contains(event.target)) {
        setIsManagingOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    const raw = e.target.value || "";
    const digits = raw.replace(/\D/g, "").slice(0, 10);
    let formatted = "";
    if (digits.length === 0) formatted = "";
    else if (digits.length < 4) formatted = `(${digits}`;
    else if (digits.length < 7)
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    else
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(
        6,
        10
      )}`;
    setFormData((prev) => ({ ...prev, phoneNumber: formatted }));
  };

  const [showClientInsights, setShowClientInsights] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Sending message
  const handleSendMessage = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { from: "admin", text: trimmed, time: "Just now" },
    ]);
    setMessage("");
  };

  // Update client info

  return (
    <div className="w-full lg:w-2/3 bg-[#0f172a] text-white flex flex-col rounded-md h-[700px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 mr-3 bg-blue-600 rounded-full">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">
              {" "}
              {client?.full_name || ""}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowClientInsights(true)}
            className="px-3 py-1 text-xs bg-gray-700 rounded"
          >
            Client Summary
          </button>
          <button
            className={`px-3 py-1 text-sm rounded poppins ${
              client?.concern_level === "High"
                ? "bg-red-600 text-white"
                : client?.concern_level === "Medium"
                ? "bg-yellow-600 text-black"
                : "bg-green-600 text-white"
            }`}
          >
            {client?.concern_level || ""}
          </button>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-3">
      <button
        onClick={handleToggle}
        disabled={isUpdating}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          client?.is_paused ? "bg-red-600" : "bg-green-600"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            client?.is_paused ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>

      <span
        className={`text-sm font-medium ${
          client?.is_paused ? "text-red-400" : "text-green-400"
        }`}
      >
        {client?.is_paused ? "Paused" : "Active"}
      </span>
    </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="relative flex-1 p-6 overflow-y-auto h-[600px]">
        {messages.map((msg, idx) => (
          <div className="mb-6" key={idx}>
            {msg.from === "user" ? (
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="w-auto p-4 bg-gray-700 rounded-lg">
                    <p className="text-gray-300">{msg.text}</p>
                  </div>
                  <div className="flex items-center mt-2 space-x-2 text-xs text-gray-500">
                    <span>AI Assistant</span>
                    <span>•</span>
                    <span>{msg.time}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-end space-x-3">
                <div className="flex justify-end flex-1">
                  <div className="max-w-5xl p-4 bg-blue-600 rounded-lg">
                    <p className="text-white">{msg.text}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center w-8 h-8 bg-gray-600 rounded-full">
                  <User className="w-4 h-4" />
                </div>
              </div>
            )}
            {msg.from !== "user" && (
              <div className="flex items-center justify-end mt-2 space-x-2 text-xs text-gray-500">
                <span>{formData.fullName || "Client"}</span>
                <span>•</span>
                <span>{msg.time}</span>
              </div>
            )}
          </div>
        ))}
        {!formData.consentToCommunicate && (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center bg-gray-900 bg-opacity-80">
            <p className="max-w-xl text-gray-300">
              This client hasn’t completed the consent form. Messaging is
              disabled.
            </p>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-gray-800 border-t border-gray-700">
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
              className="w-full p-3 text-white placeholder-gray-400 bg-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              rows={3}
              disabled={!formData.consentToCommunicate}
            />
          </div>
          <button
            className="p-3 transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSendMessage}
            disabled={!formData.consentToCommunicate}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Client Insights */}
      {showClientInsights && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60"
          onClick={() => setShowClientInsights(false)}
        >
          <div
            className="relative w-full max-w-2xl p-6 mx-4 rounded-lg shadow-lg bg-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-blue-400">
                Client Insights
              </h2>
              <button
                onClick={() => setShowClientInsights(false)}
                className="text-2xl font-bold text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {!microInsights ? (
                <p>No insights found for this client.</p>
              ) : (
                <div className="space-y-4">
                  <div className="bg-[#342C38] border-l-4 border-[#EF4444] p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="mb-2 text-gray-200">
                          {microInsights.most_recent_micro_insight}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">
                            May 10, 2025 - Concern
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
