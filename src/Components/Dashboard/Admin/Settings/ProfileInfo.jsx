import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";


const ProfileInfo = () => {


  const [fullName, setFullName] = useState("Christian Anderson");
  const [email, setEmail] = useState("christian@lawfirm.com");

  const handleSave = () => {
    if (!fullName.trim() || !email.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Information",
        text: "Please fill in all required fields.",
        background: "#1e293b",
        color: "#f9fafb",
        confirmButtonColor: "#8B5CF6",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile information has been successfully saved.",
        background: "#1e293b",
        color: "#f9fafb",
        confirmButtonColor: "#8B5CF6",
      });
    }
  };

  return (
    <div className="bg-[#1e293b] p-6 rounded-lg w-full poppins">
      <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold text-white">
        <span className="text-xl text-[#8B5CF6]">
          <FaUser />
        </span>{" "}
        Profile Information
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-gray-300">Full Name</label>
          <input
            className="w-full p-2 mt-1 text-white rounded bg-slate-700"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter full name"
          />
        </div>
        <div>
          <label className="text-sm text-gray-300">Email Address</label>
          <input
            className="w-full p-2 mt-1 text-white rounded bg-slate-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div>
          <label className="text-sm text-gray-300">Role</label>
          <input
            className="w-full p-2 mt-1 text-[#9CA3AF] rounded-lg bg-[#0F172A]"
            defaultValue="Senior Partner"
            readOnly
          />
          <p className="mt-1 text-xs text-gray-500">Permanent</p>
        </div>
        <div>
          <label className="text-sm text-gray-300">Law Firm</label>
          <input
            className="w-full p-2 mt-1 text-[#9CA3AF] rounded-lg bg-[#0F172A]"
            defaultValue="Anderson & Associates"
            readOnly
          />
          <p className="mt-1 text-xs text-gray-500">Permanent</p>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 mt-4 text-white rounded-lg bg-gradient-to-r from-[#0129B3] via-[#007BCC] to-[#77D7D2] hover:opacity-90"
        >
          Save Profile Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
