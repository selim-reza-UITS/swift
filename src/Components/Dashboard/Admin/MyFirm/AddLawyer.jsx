import React, { useState } from "react";
import { TbXboxXFilled } from "react-icons/tb";
import { FaUserPlus } from "react-icons/fa6";
import Swal from "sweetalert2";
import "animate.css";
import { useCreateLawyerMutation } from "../../../../Redux/feature/Admin/admin";

const AddLawyer = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    specialization: "",
    phone: "",
    notes: "",
  });

  const [createLawyer, { isLoading }] = useCreateLawyerMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createLawyer({
        name: formData.fullName,
        email: formData.email,
        phone_number: formData.phone,
        specialization: formData.specialization,
        notes: formData.notes,
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Lawyer Added!",
        text: "The lawyer has been added successfully.",
        confirmButtonColor: "#3085d6",
        background: "#1e293b", // dark background
        color: "#f1f5f9", // light text
        showClass: { popup: "animate__animated animate__zoomIn" },
        hideClass: { popup: "animate__animated animate__zoomOut" },
      });

      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message || "Something went wrong",
        confirmButtonColor: "#3085d6",
        background: "#1e293b", // dark background
        color: "#f1f5f9", // light text
      });
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm roboto">
      <div className="animate__animated animate__fadeInDown relative w-[350px] md:w-[500px] bg-[#0f172a] text-white rounded-xl p-6">
        <button
          onClick={onClose}
          className="absolute text-gray-400 top-3 right-3 hover:text-red-400"
        >
          <TbXboxXFilled className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <FaUserPlus className="text-[#6366F1] w-[18px] h-[18px]" />
          <h2 className="text-lg font-semibold poppins">Add New Lawyer</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name*"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone*"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
          />
          <input
            type="text"
            name="specialization"
            placeholder="Specialization*"
            value={formData.specialization}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
          />
          <input
            type="text"
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
          />

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-1/2 py-2 mt-4 text-white rounded bg-gradient-to-r from-blue-600 to-cyan-400"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLawyer;
