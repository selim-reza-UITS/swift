import React, { useState } from "react";
import { TbXboxXFilled } from "react-icons/tb";
import { useUpdateLawyerMutation } from "../../../../Redux/feature/Admin/admin";


const EditLawyer = ({ lawyer, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: lawyer.name || "",
    email: lawyer.email || "",
    phone_number: lawyer.phone_number || "",
    specialization: lawyer.specialization || "",
  });

  const [updateLawyer, { isLoading }] = useUpdateLawyerMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedLawyer = await updateLawyer({
        id: lawyer.id,
        body: formData,
      }).unwrap(); // unwrap returns the actual data or throws error

      if (onSave) onSave(updatedLawyer);
      onClose();
    } catch (error) {
      console.error("Failed to update lawyer:", error);
      alert("Failed to update lawyer. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm roboto">
      <div className="animate__animated animate__fadeInDown relative w-[350px] md:w-[500px] bg-[#0f172a] text-white rounded-xl p-6">
        <button
          onClick={onClose}
          className="absolute text-gray-400 top-2 right-2 hover:text-red-400"
        >
          <TbXboxXFilled className="w-6 h-6" />
        </button>

        <h2 className="mb-4 text-lg font-semibold text-center poppins">
          Edit Lawyer
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
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

          <div className="flex flex-col gap-1">
            <label className="text-base poppins text-[#D1D5DB]">Phone</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
            />
          </div>

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

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-1/2 py-2 mt-4 text-white rounded bg-gradient-to-r from-blue-600 to-cyan-400"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLawyer;
