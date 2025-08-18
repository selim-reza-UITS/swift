import React from "react";

const Notifications = ({ onClose }) => {
  const notifications = [
    {
      id: 1,
      type: "High Risk Client",
      message: "Smith & Associates marked as High Risk",
      time: "2h ago",
    },
    {
      id: 2,
      type: "Flagged Client",
      message: "Sarah Johnson missed appointment",
      time: "5h ago",
    },
    {
      id: 3,
      type: "System Alert",
      message: "Weekly report is now available",
      time: "1d ago",
    },
    {
      id: 4,
      type: "Reminder",
      message: "Follow up with Michael Chen",
      time: "2d ago",
    },
  ];

  return (
    <div className="absolute -right-4 top-9 w-80 bg-[#1E293B] text-white rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <button
          onClick={onClose}
          className="text-sm text-gray-400 hover:text-gray-200"
        >
          Close
        </button>
      </div>
      <div className="space-y-3 overflow-y-auto max-h-64 scrollbar-hide">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div
              key={n.id}
              className="p-3 bg-gradient-to-r from-[#747DE9]  rounded-md hover:bg-[#475569] transition"
            >
              <p className="text-sm font-medium">{n.type}</p>
              <p className="text-xs text-gray-300">{n.message}</p>
              <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400">No new notifications</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
