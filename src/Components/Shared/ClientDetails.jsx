import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Send,
  Bot,
  User,
  MessageSquare,
  AlertTriangle,
  Edit,
} from "lucide-react";
import { useGetClientByIdQuery } from "../../Redux/api/intakeapi";
import {
  useClientOptOutMutation,
  useGetAllLawyerQuery,
  useGetAllUserQuery,
  useGetMicroInsightsQuery,
  useUpdateClientMutation,
} from "../../Redux/api/caseapi";
import Swal from "sweetalert2";

function ClientDetails() {
  const params = useParams(); // Get the clientId from URL parameters
  const { data: lawyersData } = useGetAllLawyerQuery();
  const { data: usersData } = useGetAllUserQuery();
  const {
    data: clientData,
    refetch,
    isLoading,
    error,
  } = useGetClientByIdQuery(params.id);
  const [clientOptOut] = useClientOptOutMutation();

  const { data: microInsights } = useGetMicroInsightsQuery(params.id);
  console.log("microInsights", microInsights);
  const [updateClient, { isLoading: isUpdating, error: updateError }] =
    useUpdateClientMutation();
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
  // console.log(clientData);

  // Lawyer options mapping
  const lawyerOptions = Array.isArray(lawyersData)
    ? lawyersData
        .map((l) => ({ id: l?.id, name: l?.name }))
        .filter((x) => x.id && x.name)
    : [];

  // Managing users options mapping
  const managingUserOptions = Array.isArray(usersData)
    ? usersData
        .map((u) => ({ id: u?.id, name: u?.name }))
        .filter((x) => x.id && x.name)
    : [];
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    managingUsers: [],
    managingUsersIds: [],
    gender: "Female", // Default gender
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

  useEffect(() => {
    if (clientData) {
      setFormData({
        fullName: clientData?.full_name || "",
        phoneNumber: clientData?.phone_number || "",
        managingUsers:
          clientData?.managing_users?.map((user) => user.name) || [], // Pre-select managing users here
        managingUsersIds:
          clientData?.managing_users?.map((user) => user.id) || [], // Pre-select managing users here
        gender: clientData?.gender || "Female", // Set gender from clientData or default to Female
        dateOfIncident: clientData?.date_of_incident || "2024/01/15",
        lawyerName: clientData?.lawyer?.id || "",
        injuriesSustained:
          clientData?.injuries_sustained || "Lower back pain and stiffness.",
        generalCaseInfo:
          clientData?.general_case_info ||
          "Client reported back pain after accident.",
        consentToCommunicate: clientData?.consent_to_communicate || false,
        sentiment: clientData?.sentiment || "Positive",
        concernLevel: clientData?.concern_level || "High",
        scheduledTime: clientData?.scheduled_time || "",
      });
    }
  }, [clientData]);
  const managingRef = useRef(null);
  const [isManagingOpen, setIsManagingOpen] = useState(false);

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (e) => {
    const raw = e.target.value || "";
    const digits = raw.replace(/\D/g, "").slice(0, 10);
    let formatted = "";
    if (digits.length === 0) {
      formatted = "";
    } else if (digits.length < 4) {
      formatted = `(${digits}`;
    } else if (digits.length < 7) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(
        6,
        10
      )}`;
    }
    setFormData((prev) => ({ ...prev, phoneNumber: formatted }));
  };

  const [isPaused, setIsPaused] = useState(false);
  const [showClientInsights, setShowClientInsights] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const navigate = useNavigate();

  // Handling message send
  const handleSendMessage = () => {
    const trimmed = message.trim();
    if (trimmed === "") return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { from: "admin", text: trimmed, time: "Just now" },
    ]);
    setMessage("");
  };

  // Handling the client info update
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setShowEditModal(false);
  };
  // Update client data (send back to parent)
  const handleUpdate = async () => {
    const userIds = usersData
      .filter((user) => formData.managingUsers.includes(user.name)) // Filter based on user names
      .map((user) => user.id); // Map the filtered users to their IDs

    formData.managingUsers = userIds;
    const payload = {
      id: params.id, // Send the client ID with the payload
      full_name: formData.fullName,
      gender: formData.gender?.toLowerCase(), // Convert gender to lowercase (if required by backend)
      lawyer: formData.lawyerName, // Assuming lawyerName is directly the ID, not an object
      phone_number: formData.phoneNumber.replace(/\D/g, ""), // Clean phone number
      injuries_sustained: formData.injuriesSustained,
      sentiment: formData.sentiment?.toLowerCase(),
      status: formData.status,
      concern_level: formData.concernLevel?.toLowerCase(),
      general_case_info: formData.generalCaseInfo,
      date_of_incident: formData.dateOfIncident,
      managing_users: formData.managingUsers, // This should now be an array of user IDs
      consentToCommunicate: false,
    };
    console.log(payload);

    try {
      const response = await updateClient(payload);
      console.log(response.data);
      refetch();
      if (response?.data) {
        Swal.fire({
          title: "Updated Successfully!",
          text: "Client information has been updated.",
          icon: "success",
          background: "#1f2937",
          color: "#ffffff",
          confirmButtonColor: "#6366F1",
        });
      } else {
        Swal.fire({
          title: "Update Failed",
          text: "There was an issue updating the client.",
          icon: "error",
          background: "#1f2937",
          color: "#ffffff",
          confirmButtonColor: "#6366F1",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An error occurred while updating the client.",
        icon: "error",
        background: "#1f2937",
        color: "#ffffff",
        confirmButtonColor: "#6366F1",
      });
    }
  };

  // Loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading client details.</div>;

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
            <h2 className="text-xl font-semibold">{clientData?.full_name}</h2>
            <p className="text-gray-400 text-center">
              {clientData?.phone_number}
            </p>
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
            <span>{clientData?.date_of_incident}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Client Status:</span>
            <span className="bg-blue-600 px-2 py-1 rounded text-sm">
              {clientData?.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Gender:</span>
            <span>{clientData?.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Managing User(s):</span>
            <span>
              {clientData?.managing_users.map((user) => user.name).join(", ")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Lawyer:</span>
            <span>{clientData?.lawyer?.name}n</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Injury's Sustained:</span>
            <span> {clientData?.injuries_sustained}</span>
          </div>
        </div>

        {/* Communication Status */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Communication Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Scheduled Next Send:</span>
              <span className="bg-blue-600 px-2 py-1 rounded text-sm">
                {
                  new Date(clientData?.scheduled_time)
                    .toISOString()
                    .split("T")[0]
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Client Sentiment:</span>
              <span className="text-green-400">{clientData?.sentiment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Risk Level:</span>
              <span className="text-red-400">{clientData?.concern_level}</span>
            </div>
          </div>
        </div>

        {/* Case Notes */}
        <div>
          <h3 className="text-lg font-semibold mb-4">General Case Info</h3>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-300 text-sm">
              {clientData?.general_case_info}
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
          {!formData.consentToCommunicate && (
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
                disabled={!formData.consentToCommunicate}
              />
            </div>
            <button
              className="bg-blue-600 p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSendMessage}
              disabled={!formData.consentToCommunicate}
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
              {!microInsights ? (
                <p>No insights found for this client.</p>
              ) : (
                <>
                  {" "}
                  {/* First Alert */}
                  <div className="bg-[#342C38] border-l-4 border-[#EF4444] p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        {/* <p className="text-gray-200 mb-2">
                     {microInsights?.most_recent_micro_insight}
                    </p> */}
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
                          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm transition-colors">
                            Action Required
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {showEditModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60 py-10 overflow-y-auto "
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="relative w-full max-w-4xl p-6 rounded-lg shadow-lg bg-slate-800 mx-4 mt-8 "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mt-6">
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
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Incident Date
                  </label>
                  <input
                    type="date"
                    name="dateOfIncident"
                    value={formData.dateOfIncident}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={handleInputChange}
                    name="gender"
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
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
                    value={formData.status}
                    name="status"
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Awaiting">Awaiting Consent</option>
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                    <option value="Recovery">Recovery</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Managing User(s)
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsManagingOpen((s) => !s)}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-md p-3 text-left"
                    >
                      {formData.managingUsers.length > 0
                        ? formData.managingUsers.join(", ") // Display pre-selected managing users as comma-separated
                        : "Select managing users"}
                    </button>

                    {isManagingOpen && (
                      <div className="absolute z-20 mt-1 w-full bg-[#1E293B] border border-slate-600 rounded-md shadow-lg max-h-48 overflow-auto">
                        {managingUserOptions.map((user) => {
                          const checked = formData.managingUsers.includes(
                            user.name
                          ); // Check if user is pre-selected
                          return (
                            <label
                              key={user.id}
                              className="flex items-center gap-2 px-3 py-2 text-white hover:bg-slate-600 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={checked} // Pre-select checkbox if the user is selected
                                onChange={(e) => {
                                  setFormData((prev) => {
                                    const set = new Set(prev.managingUsers);
                                    if (e.target.checked) set.add(user.name);
                                    else set.delete(user.name);
                                    return {
                                      ...prev,
                                      managingUsers: Array.from(set), // Update managing users
                                    };
                                  });
                                }}
                              />
                              <span>{user.name}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Lawyer
                  </label>
                  <div className="relative">
                    <select
                      name="lawyerName"
                      value={formData.lawyerName}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-md p-3 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 appearance-none"
                    >
                      <option value="" disabled>
                        Select a lawyer
                      </option>
                      {lawyerOptions.map(({ id, name }) => (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Scheduled Next Send
                  </label>
                  <input
                    type="date"
                    value={
                      formData?.scheduledTime
                        ? new Date(formData.scheduledTime)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    name="scheduledTime"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        scheduledTime: e.target.value,
                      }))
                    }
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Communication Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Client Sentiment
                  </label>
                  <select
                    value={formData.sentiment}
                    name="sentiment"
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="positive">Positive</option>
                    <option value="neutral">Neutral</option>
                    <option value="negative">Negative</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Risk Level
                  </label>
                  <select
                    value={formData.concernLevel}
                    name="concernLevel"
                    onChange={handleInputChange}
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
                    value={formData.generalCaseInfo}
                    name="generalCaseInfo"
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Injuries Sustained
                  </label>
                  <textarea
                    value={formData.injuriesSustained}
                    name="injuriesSustained"
                    onChange={handleInputChange}
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
                  onClick={handleUpdate}
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
