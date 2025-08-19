import React, { useEffect, useRef, useState } from "react";
import { IoNotificationsSharp } from "react-icons/io5";
import getRole from "../../utils/role";
import Feedback from "./../Pages/Feedback";
import Notifications from "../Shared/Notifications";

const Header = () => {
  const role = getRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null); // ref for notification popup
  const allowedRoles = ["admin", "CaseManager", "IntekSpecialist"];
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (!allowedRoles.includes(role) && role !== "superadmin") return null;

  return (
    <div className="relative flex items-center justify-between px-6 py-4 bg-[#161E2F] text-white poppins">
      <div></div>

      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <div
          className="relative"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <IoNotificationsSharp className="text-2xl text-purple-500 cursor-pointer" />
          {/* Notification Count Badge */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            4
          </span>

          {showNotifications && (
            <div ref={notificationRef}>
              <Notifications onClose={() => setShowNotifications(false)} />
            </div>
          )}
        </div>

        {/* Feedback Button */}
        {allowedRoles.includes(role) && (
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-4"
          >
            <button className="px-4 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-purple-500 to-blue-600">
              Feedback
            </button>
          </div>
        )}
      </div>

      {/* Feedback Modal */}
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
