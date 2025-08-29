import React, { useEffect, useRef, useState } from "react";
import { IoNotificationsSharp } from "react-icons/io5";
import getRole from "../../utils/role";
import Feedback from "./../Pages/Feedback";
import Notifications from "../Shared/Notifications";
// import { toast } from "react-toastify"; // make sure react-toastify installed
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { useGetNotificationsQuery } from "../../Redux/feature/Shared/Share";
const Header = () => {
  const role = getRole();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [socket, setSocket] = useState(null);
  const notificationRef = useRef(null); // ref for notification popup
  const allowedRoles = ["admin", "CaseManager", "IntekSpecialist"];
  const { data: notifications, refetch } = useGetNotificationsQuery();
  console.log("Notifications:", notifications);
  const SOCKET_URL = import.meta.env.VITE_WS_URL;
  const token = useSelector((state) => state.auth.access);
  const count = notifications?.all_notifications?.length || 0;
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

  // WebSocket connection
  useEffect(() => {
    if (!token) return;

    // ✅ Correct query param format
    const newSocket = new WebSocket(`${SOCKET_URL}?token=${token}`);
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    newSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received Notification:", data);

        const title = data?.title || "New Notification";
        console.log("Notification Title:", title);
        const message = data?.message || "";
        console.log("Notification Message:", message);

        toast.success(`📢 ${title}`, {
          style: { background: "#0f172a", color: "#fff" },
        });
        refetch();
        // dispatch(refetchCount());
      } catch (err) {
        console.error("WebSocket message parsing error:", err);
      }
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    newSocket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      newSocket.close(); // clean up
    };
  }, [token]);

  if (!allowedRoles.includes(role) && role !== "superadmin") return null;

  return (
    <div className="relative flex items-center justify-between px-6 py-4 bg-[#161E2F] text-white poppins">
      <div></div>

      {/* Notification Bell */}

      {/* Feedback Button */}
      {allowedRoles.includes(role) && (
        <div className="flex items-center gap-6">
          <div
            className="relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <IoNotificationsSharp className="text-2xl text-purple-500 cursor-pointer" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {count}
              </span>
            )}

            {showNotifications && (
              <div ref={notificationRef}>
                <Notifications
                  notifications={notifications?.all_notifications || []}
                  onClose={() => setShowNotifications(false)}
                />
              </div>
            )}
          </div>
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-4"
          >
            <button className="px-4 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-purple-500 to-blue-600">
              Feedback
            </button>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {isModalOpen && (
        <Feedback
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      <Toaster />
    </div>
  );
};

export default Header;
