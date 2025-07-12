// components/SecuritySettings.jsx
import React, { useState } from "react";
import { MdOutlineSecurity } from "react-icons/md";
import Swal from "sweetalert2";

const SecuritySettings = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
          Swal.fire({
        icon: "warning",
        title: "Incomplete Preferences",
        text: "Please fill all required preferences before saving.",
        background: "#1f2937",
        color: "#f9fafb",
        confirmButtonColor: "#8B5CF6",
      });
    
      return;
    }

    if (newPassword !== confirmPassword) {
             Swal.fire({
        icon: "warning",
        title: "Mismatch",
        text:  "New passwords do not match", 
        background: "#1f2937",
        color: "#f9fafb",
        confirmButtonColor: "#8B5CF6",
      });
    
      return;
    }

    Swal.fire("Success", "Password updated successfully!", "success");
    console.log("Password Change Info:", formData);

    // Optionally reset the form
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="bg-[#1e293b] p-6 rounded-lg w-full md:max-w-md poppins">
      <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold text-white">
        <span className="text-xl text-[#8B5CF6]">
          <MdOutlineSecurity />
        </span>
        Security
      </h2>
      <div className="flex flex-col gap-4">
        {/* current password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm  text-[#D1D5DB]">Current password*</label>
          <input
            name="currentPassword"
            className="w-full p-3 rounded-lg bg-[#334155] focus:outline-none text-white"
            placeholder="Enter current password"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
          />
        </div>

        {/* new password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-[#D1D5DB]">New password</label>
          <input
            name="newPassword"
            className="w-full p-3 rounded-lg bg-[#334155] focus:outline-none text-white"
            placeholder="Enter new password"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>

        {/* confirm password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm  text-[#D1D5DB]">Confirm password*</label>
          <input
            name="confirmPassword"
            className="w-full p-3 rounded-lg bg-[#334155]  focus:outline-none text-white"
            placeholder="Confirm new password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 mt-4 text-white rounded-lg bg-gradient-to-r from-[#0129B3] via-[#007BCC] to-[#77D7D2] hover:opacity-90 justify-end"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
