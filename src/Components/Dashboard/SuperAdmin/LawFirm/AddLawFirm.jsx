import React, { useState } from "react";
import { TbXboxXFilled } from "react-icons/tb";
import Swal from "sweetalert2";
import "animate.css";
import "sweetalert2/dist/sweetalert2.min.css";

const AddLawFirm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firmName: "",
    phone: "",
    email: "",
    manager: "",
    address: "",
    website: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firmName, phone, email, manager, address, website } = formData;

    if (!firmName || !phone || !email || !manager || !address || !website) {
      Swal.fire({
        icon: "warning",
        title: "All fields are required!",
        text: "Please fill in all fields before submitting.",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#3B82F6",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Firm Registered!",
      text: "Your firm has been successfully registered.",
      background: "#0f172a",
      color: "#fff",
      confirmButtonColor: "#22C55E",
    });

    console.log("Submitted data:", formData);
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm poppins">
      <div className="animate__animated animate__fadeInDown relative max-w-2xl bg-[#0f172a] text-white rounded-xl p-8 w-full mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute text-[#FFFFFF] top-3 right-3 hover:text-red-400"
        >
          <TbXboxXFilled className="w-6 h-6" />
        </button>

        {/* Heading */}
        <h2 className="mb-3 text-2xl font-semibold text-center">
          Register Your Firm
        </h2>
        <p className="mb-6 text-sm text-center text-[#FFFFFF]">
          Please provide the following information to set up your firm's
          account.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm">Firm name*</label>
            <input
              type="text"
              name="firmName"
              value={formData.firmName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#1e293b] text-white text-sm outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Phone Number*</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#1e293b] text-white text-sm outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#1e293b] text-white text-sm outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Select Managing User*</label>
            <select
              name="manager"
              value={formData.manager}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#1e293b] text-white text-sm outline-none"
            >
              <option value=""></option>
              <option value="1">John Smith</option>
              <option value="2">Jane Doe</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm">
              Firm's physical address*
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#1e293b] text-white text-sm outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Firm's website*</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-[#1e293b] text-white text-sm outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/2 py-2 mt-4 text-white rounded-lg bg-gradient-to-r from-blue-600 to-cyan-400 hover:opacity-90"
            >
              Add Firm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLawFirm;
