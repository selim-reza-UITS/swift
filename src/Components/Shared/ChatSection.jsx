import React, { useEffect, useRef, useState } from "react";
import { Bot, User, Send } from "lucide-react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAllMessagesQuery } from "../../Redux/api/caseapi";

function ChatSection({ consentToCommunicate }) {
  const token = useSelector((state) => state.auth.access);
  const params = useParams();
  const WS_URL = `ws://10.10.13.20:8001/ws/chat/${params.id}/?token=${token}`;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socketReady, setSocketReady] = useState(false);
  const ws = useRef(null);

  // Fetch all messages initially
  const { data: initialMessages, isLoading: isLoadingMessages } =
    useGetAllMessagesQuery(params.id);

  // Set initial messages only once
  useEffect(() => {
    if (initialMessages && messages.length === 0) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    ws.current = new window.WebSocket(WS_URL);
    ws.current.onopen = () => {
      setSocketReady(true);
    };
    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log(data)
        if (data.message) {
          setMessages((prev) => [
            ...prev,
            {
              id: data.message.id,
              sender: data.message.sender,
              content: data.message.content,
            },
          ]);
        }
      } catch (err) {
        // handle parse error
      }
    };
    ws.current.onerror = (err) => {
      setSocketReady(false);
    };
    ws.current.onclose = () => {
      setSocketReady(false);
    };
    return () => {
      ws.current && ws.current.close();
    };
    // eslint-disable-next-line
  }, [WS_URL]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    if (!socketReady) return;
    const newMsg = {
      id: Date.now(),
      sender: "firm",
      content: message,
    };
    ws.current.send(JSON.stringify({ message: newMsg }));
    setMessage("");
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-800 rounded-xl h-[83vh]">
      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto relative">
        {isLoadingMessages ? (
          <div className="text-center text-gray-400">Loading messages...</div>
        ) : (
          messages.map((msg) =>
            msg.sender === "firm" ? (
              <div className="mb-6" key={msg.id}>
                <div className="flex items-start space-x-3 justify-end">
                  <div className="flex-1 flex justify-end">
                    <div className="bg-blue-600 p-4 rounded-lg max-w-5xl">
                      <p className="text-white">{msg.content}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2 mt-2 text-xs text-gray-500">
                  <span>Firm</span>
                </div>
              </div>
            ) : (
              <div className="mb-6" key={msg.id}>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-700 p-4 rounded-lg w-auto">
                      <p className="text-gray-300">{msg.content}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                      <span>Client</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        )}
        {!consentToCommunicate && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 text-center px-6">
            <p className="text-gray-300 max-w-xl">
              It looks like this client hasn’t completed the consent form. For
              messaging to be enabled, please have them complete the quick
              permission form.
            </p>
          </div>
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
              placeholder={
                socketReady ? "Type your response..." : "Connecting to chat..."
              }
              className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              rows={3}
              disabled={!consentToCommunicate || !socketReady}
            />
          </div>
          <button
            className="bg-blue-600 p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSendMessage}
            disabled={!consentToCommunicate || !socketReady}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatSection;
