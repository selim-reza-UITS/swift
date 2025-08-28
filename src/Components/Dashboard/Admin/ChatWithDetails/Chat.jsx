import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Send, MessageSquare, AlertTriangle } from "lucide-react";
import { useSelector } from "react-redux";
import {
  useCreateChatMutation,
  useGetChatDetailsQuery,
  useGetClientByIdQuery,
  useGetMicroInsightsQuery,
  useUpdateClientStatusMutation,
} from "../../../../Redux/feature/Admin/admin";
import { set } from "react-hook-form";
import dayjs from "dayjs";
import avatar from "../../../../assets/5856.jpg";
import avatar2 from "../../../../assets/43873.jpg";
const Chat = () => {
  const params = useParams();
  const clientId = params.id;
  const navigate = useNavigate();
  const { data: chatDetails, refetch: refetchChatDetails } =
    useGetChatDetailsQuery(clientId);
  console.log("Chat Details:", chatDetails);
  const { data: client, refetch } = useGetClientByIdQuery(clientId);
  const { data: microInsights } = useGetMicroInsightsQuery(clientId);
  const SOCKET_URL = import.meta.env.VITE_CHAT_WS_URL; // ws://yourserver/ws/chat
  const TOKEN = useSelector((state) => state.auth.access);
  const [createChat] = useCreateChatMutation();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateClientStatusMutation();

  const [showClientInsights, setShowClientInsights] = useState(false);

  // WebSocket connection
  useEffect(() => {
    if (!TOKEN) return;
    const socket = new WebSocket(`${SOCKET_URL}${clientId}/?token=${TOKEN}`);
    setSocket(socket);
    socket.onopen = () => {
      console.log("Connected to chat WebSocket server");
    };
    socket.onmessage = (event) => {
      refetchChatDetails();
      const data = JSON.parse(event.data);
      console.log("Received message:", event);
    };
    socket.onclose = () => {
      console.log("Disconnected from chat WebSocket server");
    };
  }, [TOKEN]);

  const handleSendMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed || !socket) return; // ✅ use socket state
    try {
      const res = await createChat({
        to: client?.phone_number,
        message: trimmed,
      });
      console.log("Message sent response:", res);
    } catch (error) {
      console.error("Error creating chat:", error);
    }

    setMessage("");
  };
  // 🔹 Add ref for auto-scroll
  const messagesEndRef = useRef(null);

  // 🔹 Auto scroll when chatDetails changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatDetails]);

  const handleToggleStatus = async () => {
    if (!client) return;

    const newPaused = !client.is_paused;
    const newActive = !newPaused;

    try {
      await updateStatus({
        id: client.id,
        is_paused: newPaused,
        is_active: newActive,
      }).unwrap();

      await refetch();

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

  return (
    <div className="w-full lg:w-2/3 bg-[#0f172a] text-white flex flex-col rounded-md h-[700px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 mr-3 bg-blue-600 rounded-full">
            <MessageSquare className="w-4 h-4" />
          </div>
          <h1 className="text-xl font-semibold">{client?.full_name || ""}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowClientInsights(true)}
            className="px-3 py-1 text-xs bg-gray-700 rounded"
          >
            Client Summary
          </button>
          <button
            className={`px-3 py-1 text-sm rounded ${
              client?.concern_level === "High"
                ? "bg-red-600 text-white"
                : client?.concern_level === "Medium"
                ? "bg-yellow-600 text-black"
                : "bg-green-600 text-white"
            }`}
          >
            {client?.concern_level || ""}
          </button>

          <button
            onClick={handleToggleStatus}
            disabled={isUpdating}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              client?.is_paused ? "bg-red-600" : "bg-green-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                client?.is_paused ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {chatDetails?.map((msg) => {
          const isClient = msg.sender === "client";
          const isFirm = msg.sender === "firm";
          const isAi = msg.sender === "ai";

          return (
            <div
              key={msg.id}
              className={`flex ${
                isClient ? "justify-start" : "justify-end"
              } items-end`}
            >
              {isClient && (
                <img
                  src={avatar}
                  alt="Client"
                  className="w-8 h-8 mr-2 rounded-full"
                />
              )}

              <div
                className={`p-3 rounded-lg max-w-[70%] break-words ${
                  isClient
                    ? "bg-gray-700 text-gray-300"
                    : "bg-blue-600 text-white"
                }`}
              >
                <p>{msg.content}</p>
                <span className="block mt-1 text-xs text-gray-400">
                  {dayjs(msg.received_at).format("hh:mm A")}
                </span>
              </div>

              {!isClient && (
                <img
                  src={avatar2}
                  alt={isFirm ? "Firm" : "AI"}
                  className="w-8 h-8 ml-2 rounded-full"
                />
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center p-4 space-x-3 bg-gray-800 border-t border-gray-700">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 text-white bg-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <button
          className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700"
          onClick={handleSendMessage}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Client Insights Modal */}
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
                <div className="bg-[#342C38] border-l-4 border-[#EF4444] p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="mb-2 text-gray-200">
                        {microInsights.most_recent_micro_insight}
                      </p>
                      <span className="text-sm text-gray-400">
                        May 10, 2025 - Concern
                      </span>
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
