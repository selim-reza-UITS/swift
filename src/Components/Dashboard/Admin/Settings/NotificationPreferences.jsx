// components/NotificationPreferences.jsx
import React from "react";
import { IoNotificationsSharp } from "react-icons/io5";
const NotificationPreferences = () => {
  return (
    <div className="bg-[#1e293b] p-6 rounded-lg w-full poppins">
      <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold text-white">
        <span className="text-xl text-[#8B5CF6]">
          <IoNotificationsSharp />
        </span>{" "}
        Notification Preferences
      </h2>
      <div className="mb-4">
        <p className="mb-2 text-sm text-gray-300">Notification Frequency</p>
        <div className="flex flex-col gap-2 text-white">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="frequency"
              className="accent-[#8B5CF6]"
              defaultChecked
            />
            <span className="text-[#D1D5DB]">Immediate</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="frequency" />
            <span className="text-[#D1D5DB]">Daily Digest</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="frequency" />
            <span className="text-[#D1D5DB]">Weekly Summary</span>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 text-white rounded bg-slate-700">
          <div>
            <p>Email for flagged messages</p>
            <p className="text-xs text-gray-400">
              Receive email notifications for flagged client messages
            </p>
          </div>
          <input type="checkbox" className="accent-purple-500" defaultChecked />
        </div>
        <div className="flex items-center justify-between p-4 text-white rounded bg-slate-700">
          <div>
            <p>Email for high-concern client insights</p>
            <p className="text-xs text-gray-400">
              Receive email notifications for high-priority client insights
            </p>
          </div>
          <input type="checkbox" className="accent-purple-500" defaultChecked />
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 mt-4 text-white rounded-lg bg-gradient-to-r from-[#0129B3] via-[#007BCC] to-[#77D7D2] hover:opacity-90 justify-end">
          Save
        </button>
      </div>
    </div>
  );
};

export default NotificationPreferences;
