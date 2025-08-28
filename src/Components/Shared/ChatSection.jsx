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
function ChatSection() {
  const params = useParams();
  const clientId = params.id;
  const TOKEN = useSelector((state) => state.auth.access);
  const SOCKET_URL = import.meta.env.VITE_CHAT_WS_URL;
  const { data: chatDetails, refetch: refetchChatDetails } =
    useGetChatDetailsQuery(clientId);
  const { data: client, refetch } = useGetClientByIdQuery(clientId);
  const [createChat] = useCreateChatMutation();
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

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
    try {
      await createChat({
        to: client?.phone_number,
        message: trimmed,
      });
    } catch (error) {
      // handle error
    }
    setMessage("");
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatDetails]);
  // Set initial messages only once
  // useEffect(() => {
  //   if (initialMessages && messages.length === 0) {
  //     setMessages(initialMessages);
  //   }
  // }, [initialMessages]);

  // useEffect(() => {
  //   ws.current = new window.WebSocket(WS_URL);
  //   ws.current.onopen = () => {
  //     setSocketReady(true);
  //   };
  //   ws.current.onmessage = (event) => {
  //     try {
  //       const data = JSON.parse(event.data);
  //       console.log(data);
  //       if (data.message) {
  //         setMessages((prev) => [
  //           ...prev,
  //           {
  //             id: data.message.id,
  //             sender: data.message.sender,
  //             content: data.message.content,
  //           },
  //         ]);
  //       }
  //     } catch (err) {
  //       // handle parse error
  //     }
  //   };
  //   ws.current.onerror = (err) => {
  //     setSocketReady(false);
  //   };
  //   ws.current.onclose = () => {
  //     setSocketReady(false);
  //   };
  //   return () => {
  //     ws.current && ws.current.close();
  //   };
  //   // eslint-disable-next-line
  // }, [WS_URL]);

  // const handleSendMessage = () => {
  //   if (!message.trim()) return;
  //   if (!socketReady) return;
  //   const newMsg = {
  //     id: Date.now(),
  //     sender: "firm",
  //     content: message,
  //   };
  //   ws.current.send(JSON.stringify({ message: newMsg }));
  //   setMessage("");
  // };
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
    <div className="flex-1 flex flex-col bg-gray-800 rounded-xl h-[83vh]">
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
      {/* Message Input */}
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
    </div>
  );
}

export default ChatSection;
