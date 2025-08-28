import React, { useState } from "react";
import { TbXboxXFilled } from "react-icons/tb";
import { FaUserPlus } from "react-icons/fa6";
import Swal from "sweetalert2";
import "animate.css"; // Import animation
import { useCreateUserMutation } from "../../../../Redux/feature/Admin/admin";

const AddUser = ({ onClose, refetch }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone_number: "",
    role: "",
  });

  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    setFormData((prev) => ({ ...prev, phone_number: formatted }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Send POST request to create user
      const response = await createUser({
        name: formData.fullName,
        email: formData.email,
        phone_number: formData.phone_number,
        role: formData.role,
      }).unwrap(); // unwrap() to get resolved data or throw error
      console.log("Create user response:", response);
      refetch();
      // Success SweetAlert
      Swal.fire({
        icon: "success",
        title: "User Added!",
        text: "The new user has been created successfully.",
        confirmButtonColor: "#3085d6",
        background: "#000", // Set background color to black
        customClass: {
          popup: "animate__animated animate__zoomIn",
          title: "text-white", // White title text color
          content: "text-white", // White content text color
          confirmButton: "text-white", // White confirm button text
        },
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
      });

      onClose(); // close modal
    } catch (error) {
      console.error(error);

      // Error SweetAlert
      Swal.fire({
        icon: "error",
        title: "Failed to add user",
        text: error?.data?.message || "Something went wrong",
        confirmButtonColor: "#d33",
        background: "#000", // Set background color to black
        customClass: {
          popup: "animate__animated animate__shakeX",
          title: "text-white", // White title text color
          content: "text-white", // White content text color
          confirmButton: "text-white", // White confirm button text
        },
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
          <h2 className="text-lg font-semibold poppins">Add New User</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col gap-1 ">
            <label className="text-base poppins text-[#D1D5DB]">
              Full Name*
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1 ">
            <label className="text-base poppins text-[#D1D5DB]">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1 ">
            <label className="text-base poppins text-[#D1D5DB]">Phone *</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handlePhoneChange}
              placeholder=""
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
            />
          </div>

          <div className="relative flex flex-col gap-1">
            <label className="text-base poppins text-[#D1D5DB]">Role *</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 pr-8 rounded-lg poppins bg-[#1e293b] text-white appearance-none focus:outline-none "
              required
            >
              <option value="" disabled>
                Select Role
              </option>

              <option value="admin">Admin</option>
              <option value="case_manager">Case Manager</option>
              <option value="intake_specialist">Intake Specialist</option>
            </select>
            {/* Custom arrow */}
            <div className="absolute inset-y-0 flex items-center text-gray-400 pointer-events-none right-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

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

export default AddUser;
