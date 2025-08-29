/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useUpdateClientMutation } from "../../../../Redux/api/caseapi";

const EditClientModal = ({
  onClose,
  formData,
  setFormData,
  lawyerOptions,
  managingUserOptions,
  clientId,
  refetch,
}) => {
  const [isManagingOpen, setIsManagingOpen] = useState(false);
  const [updateClient] = useUpdateClientMutation();

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

  const handleUpdate = async () => {
    const userIds = managingUserOptions
      .filter((user) => formData.managingUsers.includes(user.name))
      .map((user) => user.id);

    const payload = {
      id: clientId,
      full_name: formData.fullName,
      gender: formData.gender.toLowerCase(),
      lawyer: formData.lawyerName,
      phone_number: formData.phoneNumber.replace(/\D/g, ""),
      injuries_sustained: formData.injuriesSustained,
      sentiment: formData.sentiment.toLowerCase(),
      status: formData.status,
      concern_level: formData.concernLevel.toLowerCase(),
      general_case_info: formData.generalCaseInfo,
      date_of_incident: formData.dateOfIncident,
      managing_users: userIds,
      consentToCommunicate: false,
      scheduled_time: formData.scheduledTime,
    };

    try {
      const response = await updateClient(payload);
      if (response?.data) {
        Swal.fire({
          title: "Updated Successfully!",
          text: "Client information has been updated.",
          icon: "success",
          background: "#1f2937",
          color: "#ffffff",
          confirmButtonColor: "#6366F1",
        });
        refetch();
        onClose();
      } else {
        throw new Error("Update failed");
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

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60 py-10 overflow-y-auto">
      <div
        className="relative w-full max-w-4xl p-6 mx-4 mt-8 rounded-lg shadow-lg bg-slate-800 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          {" "}
          <button
            onClick={onClose}
            className="text-3xl font-bold text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>
        <div className="flex items-center justify-center mt-6">
          <h2 className="text-xl font-semibold text-center text-violet-400 poppins">
            Edit Client Information
          </h2>
        </div>

        <form
          className="space-y-6 max-h-[600px] overflow-y-auto mt-5 px-4"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Personal Info */}
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

          {/* Lawyer & Managing Users */}
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
                    ? formData.managingUsers.join(", ")
                    : "Select managing users"}
                </button>
                {isManagingOpen && (
                  <div className="absolute z-20 mt-1 w-full bg-[#1E293B] border border-slate-600 rounded-md shadow-lg max-h-48 overflow-auto">
                    {managingUserOptions.map((user) => {
                      const checked = formData.managingUsers.includes(
                        user.name
                      );
                      return (
                        <label
                          key={user.id}
                          className="flex items-center gap-2 px-3 py-2 text-white cursor-pointer hover:bg-slate-600"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => {
                              setFormData((prev) => {
                                const set = new Set(prev.managingUsers);
                                if (e.target.checked) set.add(user.name);
                                else set.delete(user.name);
                                return {
                                  ...prev,
                                  managingUsers: Array.from(set),
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
              <select
                name="lawyerName"
                value={formData.lawyerName}
                onChange={handleInputChange}
                className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-md"
              >
                <option value="">Select a lawyer</option>
                {lawyerOptions.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Scheduled Next Send
              </label>
              <input
                type="date"
                value={
                  formData.scheduledTime
                    ? formData.scheduledTime.split("T")[0]
                    : ""
                }
                name="scheduledTime"
                onChange={handleInputChange}
                className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Communication & Case Info */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Sentiment
              </label>
              <select
                name="sentiment"
                value={formData.sentiment}
                onChange={handleInputChange}
                className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-md"
              >
                <option value="Positive">Positive</option>
                <option value="Neutral">Neutral</option>
                <option value="Negative">Negative</option>
              </select>
            </div> */}
            {/* <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Risk Level
              </label>
              <select
                name="concernLevel"
                value={formData.concernLevel}
                onChange={handleInputChange}
                className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-md"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div> */}
            <div className="col-span-1 md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Injury's Sustained
              </label>
              <textarea
                rows="2"
                name="injuriesSustained"
                value={formData.injuriesSustained}
                onChange={handleInputChange}
                className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                General Case Info
              </label>
              <textarea
                rows="3"
                name="generalCaseInfo"
                value={formData.generalCaseInfo}
                onChange={handleInputChange}
                className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 p-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 font-semibold text-gray-300 bg-gray-600 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              className="px-6 py-2 font-semibold text-white bg-purple-600 rounded-lg hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClientModal;
