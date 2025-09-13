import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MessageSquare, AlertTriangle } from "lucide-react";
import ClientSidebar from "./ClientSidebar";
import ChatSection from "./ChatSection";
import { useGetClientByIdQuery } from "../../Redux/api/intakeapi";
import {
  useGetAllLawyerQuery,
  useGetAllUserQuery,
  useGetMicroInsightsQuery,
  useUpdateClientMutation,
} from "../../Redux/api/caseapi";
import Swal from "sweetalert2";
import Loader from "../../Redux/feature/Shared/Loader";
import { useUpdateClientStatusMutation } from "../../Redux/feature/Admin/admin";

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

  console.log(clientData);

  const { data: microInsights } = useGetMicroInsightsQuery(params.id);
  console.log("microInsights", microInsights);
  const [updateClient] = useUpdateClientMutation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState();
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
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateClientStatusMutation();
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
  const handleToggleStatus = async () => {
    if (!clientData) return;

    const newPaused = !clientData.is_paused;
    const newActive = !newPaused;

    try {
      await updateStatus({
        id: clientData.id,
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
  // Loading and error states
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader />
      </div>
    );
  if (error) return <div>Error loading client details.</div>;

  return (
    <div className="h-[89vh] bg-gray-900 text-white flex relative">
      {/* Left Sidebar - Client Info */}

      <ClientSidebar
        clientData={clientData}
        onBack={() => navigate(-1)}
        onEdit={() => setShowEditModal(true)}
      />

      {/* Main Content Area - Chat Section */}
      <div className="flex flex-col flex-1 bg-gray-800 rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 mr-3 bg-blue-600 rounded-full">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">{clientData?.full_name}</h1>
            </div>
          </div>
          <div className="relative flex items-center space-x-4">
            <button
              className="inline-block px-3 py-1 text-sm transition-colors border rounded hover:bg-gray-700"
              onClick={() => setShowClientInsights(true)}
            >
              Client Summary
            </button>
            <span className="inline-block px-3 py-1 text-sm bg-yellow-600 rounded">
              {clientData?.concern_level || ""} Risk
            </span>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleToggleStatus}
                  disabled={isUpdating}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    clientData?.is_paused ? "bg-red-600" : "bg-green-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      clientData?.is_paused ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span
                  className={`text-sm font-medium ${
                    clientData?.is_paused ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {clientData?.is_paused ? "Paused" : "Active"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <ChatSection
          messages={messages}
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          consentToCommunicate={formData.consentToCommunicate}
        />
      </div>

      {/* Client Insights Popup */}
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
            {/* ...existing code... (insights content) */}
            <div className="space-y-4">
              {!microInsights ? (
                <p>No insights found for this client.</p>
              ) : (
                <>
                  {/* First Alert */}
                  {microInsights?.insights?.map((insight, index) => (
                    <div
                      key={index}
                      className="bg-[#342C38] border-l-4 border-[#EF4444] p-4 rounded-lg"
                    >
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            {insight?.micro_insight
                              ? insight?.micro_insight
                              : "No insights found for this client."}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
            className="relative w-full max-w-4xl p-6 mx-4 mt-8 rounded-lg shadow-lg bg-slate-800 "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mt-6">
              <h2 className="text-xl font-semibold text-blue-400">
                Edit Client Information
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-2xl font-bold text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Incident Date
                  </label>
                  <input
                    type="date"
                    name="dateOfIncident"
                    value={formData.dateOfIncident}
                    onChange={handleInputChange}
                    className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={handleInputChange}
                    name="gender"
                    className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
              </div>

              {/* Case Information */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Client Status
                  </label>
                  <select
                    value={formData.status}
                    name="status"
                    onChange={handleInputChange}
                    className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Awaiting">Awaiting Consent</option>
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                    <option value="Recovery">Recovery</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Managing User(s)
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsManagingOpen((s) => !s)}
                      className="w-full p-3 text-left text-white bg-gray-700 border border-gray-600 rounded-md"
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
                              className="flex items-center gap-2 px-3 py-2 text-white cursor-pointer hover:bg-slate-600"
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
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Lawyer
                  </label>
                  <div className="relative">
                    <select
                      name="lawyerName"
                      value={formData.lawyerName}
                      onChange={handleInputChange}
                      className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-md appearance-none focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
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
                  <label className="block mb-2 text-sm font-medium text-gray-300">
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
                    className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Communication Status */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Client Sentiment
                  </label>
                  <select
                    value={formData.sentiment}
                    name="sentiment"
                    onChange={handleInputChange}
                    className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="positive">Positive</option>
                    <option value="neutral">Neutral</option>
                    <option value="negative">Negative</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Risk Level
                  </label>
                  <select
                    value={formData.concernLevel}
                    name="concernLevel"
                    onChange={handleInputChange}
                    className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    General Case Info
                  </label>
                  <textarea
                    value={formData.generalCaseInfo}
                    name="generalCaseInfo"
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Injuries Sustained
                  </label>
                  <textarea
                    value={formData.injuriesSustained}
                    name="injuriesSustained"
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end pt-4 space-x-3 border-t border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-300 transition-colors bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
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
