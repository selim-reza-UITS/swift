import { useRef, useState, useEffect } from "react";
import { TbXboxXFilled } from "react-icons/tb";
import Swal from "sweetalert2";
import avatar from "../../../assets/avatar.png";

import {
  useGetAllLawyerQuery,
  useGetAllUserQuery,
  useGetClientByIdQuery,
  useUpdateClientMutation,
} from "../../../Redux/api/intakeapi";

const EditClientDetails = ({ clientId, onClose, onUpdate }) => {
  const { data: lawyersData } = useGetAllLawyerQuery();
  const { data: usersData } = useGetAllUserQuery();
  const {
    data: clientData,
    isLoading,
    error,
  } = useGetClientByIdQuery(clientId);
  console.log(clientData);
  const [updateClient, { isLoading: isUpdating, error: updateError }] =
    useUpdateClientMutation();

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

  // Initializing formData with default values or fetched data
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    managingUsers: [],
    managingUsersIds: [],
    gender: "Female", // Default gender
    dateOfIncident: "2024/01/15",
    lawyerName: "",
    injurySustained: "Lower back pain and stiffness.",
    generalCaseInfo: "Client reported back pain after accident.",
    consentToCommunicate: false,
    sentiment: "Positive",
    concernLevel: "High",
  });
  console.log(formData.managingUsers);

  // Populate formData with the fetched client data when available
  // Helper to format phone number as (XXX) XXX-XXXX
  function formatPhoneNumber(raw) {
    const digits = String(raw || "")
      .replace(/\D/g, "")
      .slice(0, 10);
    if (digits.length === 0) return "";
    if (digits.length < 4) return `(${digits}`;
    if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(
      6,
      10
    )}`;
  }

  useEffect(() => {
    if (clientData) {
      // Normalize gender to capitalized for UI
      let gender = clientData?.gender || "Female";
      if (typeof gender === "string") {
        gender = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
        if (gender !== "Male" && gender !== "Female") gender = "Female";
      }
      setFormData({
        fullName: clientData?.full_name || "",
        phoneNumber: formatPhoneNumber(clientData?.phone_number),
        managingUsers:
          clientData?.managing_users?.map((user) => user.name) || [],
        managingUsersIds:
          clientData?.managing_users?.map((user) => user.id) || [],
        gender,
        dateOfIncident: clientData?.date_of_incident || "2024/01/15",
        lawyerName: clientData?.lawyer?.id || "",
        injurySustained:
          clientData?.injuries_sustained || "Lower back pain and stiffness.",
        generalCaseInfo:
          clientData?.general_case_info ||
          "Client reported back pain after accident.",
        consentToCommunicate: clientData?.consent_to_communicate || false,
        sentiment: clientData?.sentiment || "Positive",
        concernLevel: clientData?.concern_level || "High",
      });
    }
  }, [clientData]);
  console.log(formData.managingUsers);

  // Handle clicking outside the managing users dropdown to close it
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

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle phone number formatting
  const handlePhoneChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      phoneNumber: formatPhoneNumber(e.target.value),
    }));
  };

  // Update client data (send back to parent)
  const handleUpdate = async () => {
    // Map the selected managing user names to their corresponding IDs
    const userIds = usersData
      .filter((user) => formData.managingUsers.includes(user.name)) // Filter based on user names
      .map((user) => user.id); // Map the filtered users to their IDs

    formData.managingUsers = userIds; // Update the managing users with their IDs

    const payload = {
      id: clientId, // Send the client ID with the payload
      full_name: formData.fullName,
      gender: formData.gender.toLowerCase(), // Convert gender to lowercase (if required by backend)
      lawyer: formData.lawyerName, // Assuming lawyerName is directly the ID, not an object
      phone_number: formData.phoneNumber.replace(/\D/g, ""), // Clean phone number
      injuries_sustained: formData.injurySustained,
      general_case_info: formData.generalCaseInfo,
      date_of_incident: formData.dateOfIncident,
      managing_users: formData.managingUsers, // This should now be an array of user IDs
    };

    console.log(payload);

    try {
      const response = await updateClient(payload).unwrap();
      console.log(response);

      if (response?.data) {
        Swal.fire({
          title: "Updated Successfully!",
          text: "Client information has been updated.",
          icon: "success",
          background: "#1f2937",
          color: "#ffffff",
          confirmButtonColor: "#6366F1",
        });
        onClose(); // Close the modal
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

  if (isLoading) return <div className="h-[86vh] flex items-center justify-center bg-gray-900">
        <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>;
  if (error) return <div>Error loading client details.</div>;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm roboto">
      <div className="relative w-[450px] bg-[#0f172a] text-white rounded-xl p-4 ">
        <button
          onClick={onClose}
          className="absolute text-gray-400 top-2 right-2 hover:text-red-400"
        >
          <TbXboxXFilled className="w-6 h-6" />
        </button>

        <div className="mt-2 text-center">
          <img
            src={avatar}
            alt={formData.fullName || clientData.full_name}
            className="object-cover w-20 h-20 mx-auto border-2 border-blue-500 rounded-full"
          />
        </div>

        {/* Full Name */}
        <div>
          <label className="block mb-2 text-sm font-medium text-white">
            Full Name<span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="e.g., John Doe"
            className="w-full bg-[#1e293b] text-white placeholder-gray-400 border border-slate-500 rounded-md px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
          />
        </div>

        {/* Phone Number */}
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-white">
            Phone Number<span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            placeholder="(XXX) XXX-XXXX"
            className="w-full bg-[#1e293b] text-white placeholder-gray-400 border border-slate-500 rounded-md px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
          />
        </div>

        {/* Select Managing User(s) */}
        <div className="mt-4" ref={managingRef}>
          <label className="block mb-2 text-sm font-medium text-white">
            Select Managing User(s)<span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsManagingOpen((s) => !s)}
              className="w-full bg-[#1e293b] text-white border border-slate-500 rounded-md px-3 py-2 text-left"
            >
              {formData.managingUsers.length > 0
                ? formData.managingUsers.join(", ") // Display pre-selected managing users as comma-separated
                : "Select managing users"}
            </button>

            {isManagingOpen && (
              <div className="absolute z-20 mt-1 w-full bg-[#1E293B] border border-slate-600 rounded-md shadow-lg max-h-48 overflow-auto">
                {managingUserOptions.map((user) => {
                  const checked = formData.managingUsers.includes(user.name); // Check if user is pre-selected
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
          <p className="mt-1 text-sm text-gray-400">
            Link one or more managers from your firm to this client.
          </p>
        </div>

        {/* Gender */}
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-white">
            Gender<span className="text-red-400">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={String(formData?.gender).toLowerCase() === "female"}
                onChange={handleInputChange}
                className="mr-2 text-purple-400 focus:ring-purple-400"
              />
              <span className="text-sm text-white">Female</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={String(formData?.gender).toLowerCase() === "male"}
                onChange={handleInputChange}
                className="mr-2 text-purple-400 focus:ring-purple-400"
              />
              <span className="text-sm text-white">Male</span>
            </label>
          </div>
        </div>

        {/* Date of Incident */}
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-white">
            Date of Incident<span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="dateOfIncident"
            placeholder="yyyy/mm/dd"
            value={formData.dateOfIncident}
            onChange={handleInputChange}
            className="w-full bg-[#1e293b] text-white placeholder-gray-400 border border-slate-500 rounded-md px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
          />
        </div>

        {/* Lawyer Name */}
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-white">
            Lawyer Name<span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              name="lawyerName"
              value={formData.lawyerName}
              onChange={handleInputChange}
              className="w-full bg-[#1e293b] text-white border border-slate-500 rounded-md px-3 py-2 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 appearance-none"
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

        {/* Case Notes */}
        <div className="mt-6">
          <p className="mb-2 text-sm font-semibold poppins">Case Notes</p>
          <div className="mb-2">
            <label className="text-sm">Injury's Sustained:</label>
            <input
              type="text"
              name="injurySustained"
              value={formData.injurySustained}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-[#1e293b] border border-slate-500 text-sm focus:outline-none"
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">General Case Info:</label>
            <input
              type="text"
              name="generalCaseInfo"
              value={formData.generalCaseInfo}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-[#1e293b] border border-slate-500 text-sm focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleUpdate}
          className="w-full py-2 mt-4 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Update Info
        </button>
      </div>
    </div>
  );
};

export default EditClientDetails;
