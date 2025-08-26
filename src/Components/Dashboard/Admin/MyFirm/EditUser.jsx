import React, { useState, useEffect } from "react";
import { TbXboxXFilled } from "react-icons/tb";
import { useUpdateUserMutation } from "../../../../Redux/feature/Admin/admin";
import Swal from "sweetalert2";
// Roles with label for UI and value for backend
const roleOptions = [
  { label: "Case Manager", value: "case_manager" },
  { label: "Intake Specialist", value: "intake_specialist" },
  { label: "Admin", value: "admin" },
];

const EditUser = ({ member, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentRole: "",
    selectedRole: "",
  });

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || "",
        email: member.email || "",
      });
    }
  }, [member]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare body
      const body = { name: formData.name };
      if (
        formData.selectedRole &&
        formData.selectedRole !== formData.currentRole
      ) {
        body.role = formData.selectedRole;
      }

      const response = await updateUser({
        id: member.id,
        body,
      }).unwrap();
      // Success Swal
      Swal.fire({
        icon: "success",
        title: "User Updated!",
        text: `${response.data.name} has been updated successfully.`,
        confirmButtonColor: "#8A2BE2",
        background: "#1e293b", // dark background
        color: "#f1f5f9", // light text
        showClass: { popup: "animate__animated animate__zoomIn" },
        hideClass: { popup: "animate__animated animate__zoomOut" },
      });

      console.log("Updated:", response);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err?.data?.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#8A2BE2",
        background: "#1e293b", // dark background
        color: "#f1f5f9", // light text
      });
      console.error("Update failed:", err);
    }
  };

  // Get user-friendly label from value
  const getRoleLabel = (value) =>
    roleOptions.find((role) => role.value === value)?.label || "";

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm roboto">
      <div className="animate__animated animate__fadeInDown relative w-[350px] md:w-[500px] bg-[#0f172a] text-white rounded-xl p-6">
        <button
          onClick={onClose}
          className="absolute text-gray-400 top-2 right-2 hover:text-red-400"
        >
          <TbXboxXFilled className="w-6 h-6" />
        </button>

        <div className="flex items-center justify-center w-full gap-2 mb-4">
          <h2 className="text-lg font-semibold poppins">Edit User</h2>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-base poppins text-[#D1D5DB]">
              Full Name*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
            />
          </div>

          {/* Email (disabled) */}
          <div className="flex flex-col gap-1">
            <label className="text-base poppins text-[#D1D5DB]">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] cursor-not-allowed text-gray-400 focus:outline-none"
            />
          </div>

          {/* Current Role (disabled) */}
          <div className="flex flex-col gap-1">
            <label className="text-base poppins text-[#D1D5DB]">
              Current Role
            </label>
            <input
              type="text"
              name="currentRole"
              placeholder={member.role}
              disabled
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] cursor-not-allowed text-gray-400 focus:outline-none"
            />
          </div>

          {/* Select Role (dropdown) */}
          <div className="flex flex-col gap-1">
            <label className="text-base poppins text-[#D1D5DB]">
              Select Role
            </label>
            <select
              name="selectedRole"
              value={formData.selectedRole}
              onChange={handleChange}
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
            >
              <option value="">-- Choose role --</option>
              {roleOptions.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-1/2 py-2 mt-4 text-white rounded bg-gradient-to-r from-blue-600 to-cyan-400"
            >
              {isLoading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
