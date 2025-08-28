import React from "react";

const timeAgo = (timestamp) => {
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.floor((now - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval}y ago`;

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval}mo ago`;

  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval}d ago`;

  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval}h ago`;

  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval}m ago`;

  return `${Math.floor(seconds)}s ago`;
};

const Notifications = ({ onClose, notifications }) => {
  return (
    <div className="absolute -right-4 top-9 w-80 bg-[#1E293B] text-white rounded-lg shadow-lg p-4 z-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <button
          onClick={onClose}
          className="text-sm text-gray-400 hover:text-gray-200"
        >
          Close
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3 overflow-y-auto max-h-[400px] ">
        {notifications && notifications.length > 0 ? (
          notifications.map((n) => (
            <div
              key={n.id}
              className="p-3 bg-[#0b0c1b] rounded-md hover:bg-[#475569] transition"
            >
              <p className="text-sm font-medium">{n.title}</p>
              <p className="text-xs text-gray-300">{n.message}</p>
              <p className="text-[10px] text-gray-400 mt-1">
                {timeAgo(n.timestamp)}
              </p>
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
