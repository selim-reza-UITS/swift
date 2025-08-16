import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import getRole from "../../utils/role";
import Feedback from "../Pages/Feedback";

const Header = () => {
  const role = getRole();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Roles who can see full Header (including Feedback button)
  const allowedRoles = ["admin", "CaseManager", "IntekSpecialist"];

  // Show nothing if role is not in allowedRoles or superadmin
  if (!allowedRoles.includes(role) && role !== "superadmin") return null;

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#161E2F] text-white poppins">
      {/* Left Side: Title and Welcome Message */}
      <div>
        {/* <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-[#9CA3AF] mt-2">
          Welcome back, Sarah. Here's your case overview.
        </p> */}
      </div>

      {/* Right Side: Feedback Button (Only for allowed roles, not superadmin) */}
      {allowedRoles.includes(role) && (
        <div
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="flex items-center gap-4"
        >
          <button className="px-4 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-purple-500 to-blue-600">
            Feedback
          </button>
        </div>
      )}

      {isModalOpen && (
        <Feedback
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Header;
