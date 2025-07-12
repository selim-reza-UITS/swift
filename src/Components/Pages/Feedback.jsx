import React, { useState } from "react";
import Swal from "sweetalert2";
import "animate.css"; // Import animation
import { TbXboxXFilled } from "react-icons/tb";
import { FaUserPlus } from "react-icons/fa6";
const Feedback = ({ onClose }) => {
  const [formData, setFormData] = useState({
    feedback: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
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
        <div className="flex flex-col items-start gap-1 mb-4">
          <h2 className="text-lg font-semibold poppins text-[#2E5CE8]">
            Submit Feed back
          </h2>
          <p className="text-base text-white poppins">
            We’d love to hear your thoughts!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col gap-1 ">
            <textarea
      name="feedback"
      placeholder="Your Feedback"
      value={formData.feedback}
      onChange={handleChange}
      required
      className="w-full p-4 rounded-lg poppins bg-[#1e293b] focus:outline-none mt-2 text-white"
    />
          </div>
          {/* email */}

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/2 py-2 mt-4 text-white rounded bg-gradient-to-r from-[#0129B3] via-[#007BCC] to-[#77D7D2]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
