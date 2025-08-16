import React, { useState } from "react";
import { TbXboxXFilled } from "react-icons/tb";

const EditLawyer = ({ lawyer, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: lawyer.name || "",
    email: lawyer.email || "",
    phone: lawyer.phone || "",
    role: lawyer.role || "",
    specialization: lawyer.specialization || "",
    cases: lawyer.cases || "",
    firm: lawyer.firm || "",
    manager: lawyer.manager || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm roboto">
      <div className="animate__animated animate__fadeInDown relative w-[350px] md:w-[500px] bg-[#0f172a] text-white rounded-xl p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute text-gray-400 top-2 right-2 hover:text-red-400"
        >
          <TbXboxXFilled className="w-6 h-6" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center justify-center w-full gap-2 mb-4">
          <h2 className="text-lg font-semibold poppins">Edit Lawyer</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
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

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-base poppins text-[#D1D5DB]">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label className="text-base poppins text-[#D1D5DB]">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
            />
          </div>

          {/* Role */}
          {/* <div className="flex flex-col gap-1">
            <label className="text-base poppins text-[#D1D5DB]">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
            />
          </div> */}

          {/* Specialization */}
          <div className="flex flex-col gap-1">
            <label className="text-base poppins text-[#D1D5DB]">
              Specialization
            </label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
            />
          </div>

          {/* Cases */}
          <div className="flex flex-col gap-1">
            <label className="text-base poppins text-[#D1D5DB]">
              Cases Handled
            </label>
            <input
              type="number"
              name="cases"
              value={formData.cases}
              onChange={handleChange}
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
            />
          </div>

          {/* Firm */}
          <div className="flex flex-col gap-1">
            <label className="text-base poppins text-[#D1D5DB]">Firm</label>
            <input
              type="text"
              name="firm"
              value={formData.firm}
              onChange={handleChange}
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
            />
          </div>

          {/* Manager */}
          <div className="flex flex-col gap-1">
            <label className="text-base poppins text-[#D1D5DB]">Manager</label>
            <input
              type="text"
              name="manager"
              value={formData.manager}
              onChange={handleChange}
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/2 py-2 mt-4 text-white rounded bg-gradient-to-r from-blue-600 to-cyan-400"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLawyer;
