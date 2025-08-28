import React, { useState, useEffect } from "react";
import { TbXboxXFilled } from "react-icons/tb";
import { FaUserPlus } from "react-icons/fa6";
import Swal from "sweetalert2";
import "animate.css";
import { useUpdateLawFirmMutation } from "../../../../Redux/feature/SuperAdmin/superAdmin";

const EditLawfirm = ({ onClose, firmToEdit }) => {
  const [formData, setFormData] = useState({
    firmname: "",
    area_code: "",
    location: "",
    website: "",
  });

  const [updateLawFirm, { isLoading }] = useUpdateLawFirmMutation();

  // Auto-fill edit data
  useEffect(() => {
    if (firmToEdit) {
      setFormData({
        firmname: firmToEdit.name || "",
        email: firmToEdit.contact_email || "",
        area_code: firmToEdit.area_code || "",
        location: firmToEdit.address || "",
        website: firmToEdit.website || "",
      });
    }
  }, [firmToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateLawFirm({
        id: firmToEdit.id,
        body: {
          name: formData.firmname,
          area_code: formData.area_code,
          address: formData.location,
          website: formData.website,
        },
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Firm Updated!",
        text: "The law firm details have been updated successfully.",
        background: "#1e293b",
        color: "#fff",
        confirmButtonColor: "#22c55e",
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
      });

      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to update!",
        text: error?.data?.message || "Something went wrong.",
        background: "#1e293b",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm roboto">
      <div className="animate__animated animate__fadeInDown relative w-[350px] md:w-[500px] bg-[#0f172a] text-white rounded-xl p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute text-gray-400 top-3 right-3 hover:text-red-400"
        >
          <TbXboxXFilled className="w-6 h-6" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <FaUserPlus className="text-[#6366F1] w-[18px] h-[18px]" />
          <h2 className="text-lg font-semibold poppins">Edit Law Firm</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col gap-1">
            <label className="text-base poppins text-[#D1D5DB]">
              Firm Name*
            </label>
            <input
              type="text"
              name="firmname"
              value={formData.firmname}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-base poppins text-[#D1D5DB]">Email*</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-base poppins text-[#D1D5DB]">
              Location*
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-base poppins text-[#D1D5DB]">Website*</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-1/2 py-2 mt-4 text-white rounded bg-gradient-to-r from-blue-600 to-cyan-400 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLawfirm;
