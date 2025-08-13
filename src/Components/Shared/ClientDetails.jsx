import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send,
  Bot,
  User,
  MessageSquare,
  AlertTriangle,
  Edit,
} from "lucide-react";

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
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "Sarah Johnson",
    phone: "(555) 123-4567",
    incidentDate: "2025-9-15",
    clientStatus: "On Going",
    gender: "Female",
    managingUser: "John Smith",
    lawyer: "Robert Johnson",
    scheduledNextSend: "2025-9-20",
    clientSentiment: "Positive",
    riskLevel: "High",
    generalCaseInfo: "Client reported back pain after accident.",
    injuriesSustained: "Lower back pain and stiffness.",
    consentToCommunicate: false,
  });
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

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the changes to your backend
    console.log("Updated client data:", editForm);
    setShowEditModal(false);
  };

  const handleInputChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <div className="h-[86vh] bg-gray-900 text-white flex relative">
      {/* Left Sidebar - Client Info */}
      <div className="w-80 bg-gray-800 p-6 mr-4 rounded-xl overflow-y-auto">
        {/* Back Button and Edit Client Button */}
        <div className="flex items-center justify-between space-x-2 ">
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center"
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
        </div>
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
        <div
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center shadow mb-6 w-full mx-auto"
          onClick={() => setShowEditModal(true)}
        >
          <Edit className="w-4 h-4 mr-2" />
          <span>Edit Client</span>
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
          <div className="flex justify-between">
            <span className="text-gray-400">Injury's Sustained:</span>
            <span> Lower back pain and stiffness.</span>
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
        <div className="flex-1 p-6 overflow-y-auto relative">
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
          {!editForm.consentToCommunicate && (
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
                placeholder="Type your response..."
                className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                rows={3}
                disabled={!editForm.consentToCommunicate}
              />
            </div>
            <button
              className="bg-blue-600 p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSendMessage}
              disabled={!editForm.consentToCommunicate}
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

      {/* Edit Client Modal */}
      {showEditModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60 overflow-y-auto"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="relative w-full max-w-4xl p-6 rounded-lg shadow-lg bg-slate-800 mx-4 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between my-6">
              <h2 className="text-xl font-semibold text-blue-400">
                Edit Client Information
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Incident Date
                  </label>
                  <input
                    type="date"
                    value={editForm.incidentDate}
                    onChange={(e) =>
                      handleInputChange("incidentDate", e.target.value)
                    }
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Gender
                  </label>
                  <select
                    value={editForm.gender}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Case Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Client Status
                  </label>
                  <select
                    value={editForm.clientStatus}
                    onChange={(e) =>
                      handleInputChange("clientStatus", e.target.value)
                    }
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="On Going">On Going</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Managing User
                  </label>
                  <input
                    type="text"
                    value={editForm.managingUser}
                    onChange={(e) =>
                      handleInputChange("managingUser", e.target.value)
                    }
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Lawyer
                  </label>
                  <input
                    type="text"
                    value={editForm.lawyer}
                    onChange={(e) =>
                      handleInputChange("lawyer", e.target.value)
                    }
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Scheduled Next Send
                  </label>
                  <input
                    type="date"
                    value={editForm.scheduledNextSend}
                    onChange={(e) =>
                      handleInputChange("scheduledNextSend", e.target.value)
                    }
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Communication Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Client’s consent to communicate
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleInputChange(
                          "consentToCommunicate",
                          !editForm.consentToCommunicate
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        editForm.consentToCommunicate
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          editForm.consentToCommunicate
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                    <span
                      className={`text-sm font-medium ${
                        editForm.consentToCommunicate
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {editForm.consentToCommunicate ? "True" : "False"}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Client Sentiment
                  </label>
                  <select
                    value={editForm.clientSentiment}
                    onChange={(e) =>
                      handleInputChange("clientSentiment", e.target.value)
                    }
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Positive">Positive</option>
                    <option value="Neutral">Neutral</option>
                    <option value="Negative">Negative</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Risk Level
                  </label>
                  <select
                    value={editForm.riskLevel}
                    onChange={(e) =>
                      handleInputChange("riskLevel", e.target.value)
                    }
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              {/* Case Notes */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    General Case Info
                  </label>
                  <textarea
                    value={editForm.generalCaseInfo}
                    onChange={(e) =>
                      handleInputChange("generalCaseInfo", e.target.value)
                    }
                    rows={3}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Injuries Sustained
                  </label>
                  <textarea
                    value={editForm.injuriesSustained}
                    onChange={(e) =>
                      handleInputChange("injuriesSustained", e.target.value)
                    }
                    rows={3}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientDetails;
