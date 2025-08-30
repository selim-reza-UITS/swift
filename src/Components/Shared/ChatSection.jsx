import React, { useEffect, useRef, useState } from "react";
import { Bot, User, Send } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAllMessagesQuery } from "../../Redux/api/caseapi";
import {
  useCreateChatMutation,
  useGetChatDetailsQuery,
  useGetClientByIdQuery,
  useGetMicroInsightsQuery,
  useUpdateClientStatusMutation,
} from "../../Redux/feature/Admin/admin";
import dayjs from "dayjs";
import avatar from "../../assets/5856.jpg";
import avatar2 from "../../assets/43873.jpg";
import Loader from "../../Redux/feature/Shared/Loader";
function ChatSection() {
  const chatAreaRef = useRef(null);
  const params = useParams();
  const clientId = params.id;
  const TOKEN = useSelector((state) => state.auth.access);
  const SOCKET_URL = import.meta.env.VITE_CHAT_WS_URL;
  const {
    data: chatDetails,
    refetch: refetchChatDetails,
    isLoading,
  } = useGetChatDetailsQuery(clientId);
  
  const { data: client, refetch } = useGetClientByIdQuery(clientId);
  const [createChat] = useCreateChatMutation();
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  console.log(client);
  // WebSocket connection
  useEffect(() => {
    if (!TOKEN) return;
    const socket = new window.WebSocket(
      `${SOCKET_URL}${clientId}/?token=${TOKEN}`
    );
    setSocket(socket);
    socket.onopen = () => {
      // Connected
    };
    socket.onmessage = (event) => {
      refetchChatDetails();
    };
    socket.onclose = () => {
      // Disconnected
    };
    return () => socket.close();
  }, [TOKEN, clientId, SOCKET_URL, refetchChatDetails]);

  const handleSendMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed || !socket) return;
    console.log("hello");
    try {
      await createChat({
        to: client?.phone_number,
        message: trimmed,
      });
    } catch (error) {
      console.log(error);
    }
    setMessage("");
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatDetails]);

  // Always force scroll to top if consent is false
  useEffect(() => {
    if (chatAreaRef.current && !client?.consent_to_communicate) {
      chatAreaRef.current.scrollTop = 0;
    }
  }, [client?.consent_to_communicate, chatDetails]);

  return (
    <div className="flex-1 flex flex-col bg-gray-800 rounded-xl h-[83vh]">
      {/* Messages */}
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`flex-1 p-6 space-y-4 relative ${
            client?.consent_to_communicate
              ? "overflow-y-auto"
              : "overflow-hidden"
          }`}
          ref={chatAreaRef}
        >
          {!client.consent_to_communicate && (
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center bg-gray-900 bg-opacity-80">
              <p className="max-w-xl text-gray-300">
                It looks like this client hasn’t completed the consent form. For
                messaging to be enabled, please have them complete the quick
                permission form.
              </p>
            </div>
          )}
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
      )}

      {/* Input */}
      <div className="flex items-center p-4 space-x-3 bg-gray-800 border-t border-gray-700">
        <textarea
          disabled={!client.consent_to_communicate}
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
      <style>{`
        .chat-area-wrapper { position: relative; }
        .consent-overlay {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          position: absolute;
          border-radius: 0.75rem;
          margin: 0 auto;
        }
        @media (min-width: 640px) {
          .chat-area-wrapper {
            max-width: 100%;
          }
          .consent-overlay {
            left: unset;
            right: unset;
          }
        }
      `}</style>
    </div>
  );
}

export default ChatSection;
