import React, { useState } from "react";
import { TbXboxXFilled } from "react-icons/tb";
import { FaUserPlus } from "react-icons/fa6";
import Swal from "sweetalert2";
import "animate.css"; // Import animation

const AddLawyer = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    specialization: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "success",
      title: "User Added!",
      text: "Check your email and set the password.",
      confirmButtonColor: "#3085d6",
      showClass: {
        popup: "animate__animated animate__zoomIn",
      },
      hideClass: {
        popup: "animate__animated animate__zoomOut",
      },
    });

    onClose();
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
          <h2 className="text-lg font-semibold poppins">Add New Lawyer</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col gap-1 ">
            <label htmlFor="name" className="text-base poppins text-[#D1D5DB] ">
              Full Name*
            </label>
            <input
              type="text"
              name="fullName"
              placeholder=""
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
            />
          </div>
          {/* email */}
          <div className="flex flex-col gap-1 ">
            <label
              htmlFor="email"
              className="text-base poppins text-[#D1D5DB] "
            >
              Email *
            </label>
            <input
              type="email"
              name="email"
              placeholder=""
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
            />
          </div>
          {/*specialization  */}
          <div className="flex flex-col gap-1 ">
            <label
              htmlFor="specialization"
              className="text-base poppins text-[#D1D5DB] "
            >
              Specialization *
            </label>
            <input
              type="text"
              name="specialization"
              placeholder=""
              value={formData.specialization}
              onChange={handleChange}
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
            />
          </div>
          {/*notes */}
          {/* <div className="flex flex-col gap-1 ">
            <label
              htmlFor="specialization"
              className="text-base poppins text-[#D1D5DB] "
            >
              Notes *
            </label>
            <input
              type="text"
              name="notes"
              placeholder=""
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-2 rounded-lg poppins bg-[#1e293b] focus:outline-none"
            />
          </div> */}

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/2 py-2 mt-4 text-white rounded bg-gradient-to-r from-blue-600 to-cyan-400"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLawyer;
