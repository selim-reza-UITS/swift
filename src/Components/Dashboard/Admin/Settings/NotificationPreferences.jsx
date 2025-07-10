// components/NotificationPreferences.jsx
import React, { useState } from "react";
import { IoNotificationsSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const NotificationPreferences = () => {
  

  const [frequency, setFrequency] = useState("immediate");
  const [flaggedEmail, setFlaggedEmail] = useState(true);
  const [highConcern, setHighConcern] = useState(true);

  const handleSave = () => {
    if (!frequency || (!flaggedEmail && !highConcern)) {
     
      Swal.fire({
        icon: "warning",
        title: "Incomplete Preferences",
        text: "Please fill all required preferences before saving.",
        background: "#1f2937",
        color: "#f9fafb",
        confirmButtonColor: "#8B5CF6",
      });
    } else {
   
      Swal.fire({
        icon: "success",
        title: "Preferences Saved!",
        text: "Your notification preferences have been updated.",
        background: "#1f2937",
        color: "#f9fafb",
        confirmButtonColor: "#8B5CF6",
      });
    }
  };

  return (
    <div className="bg-[#1e293b] p-6 rounded-lg w-full poppins">
      <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold text-white">
        <span className="text-xl text-[#8B5CF6]">
          <IoNotificationsSharp />
        </span>{" "}
        Notification Preferences
      </h2>

      {/* Notification Frequency */}
      <div className="mb-4">
        <p className="mb-2 text-sm text-gray-300">Notification Frequency</p>
        <div className="flex flex-col gap-2 text-white">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="frequency"
              value="immediate"
              className="accent-[#8B5CF6]"
              checked={frequency === "immediate"}
              onChange={(e) => setFrequency(e.target.value)}
            />
            <span className="text-[#D1D5DB]">Immediate</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="frequency"
              value="daily"
              className="accent-[#8B5CF6]"
              checked={frequency === "daily"}
              onChange={(e) => setFrequency(e.target.value)}
            />
            <span className="text-[#D1D5DB]">Daily Digest</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="frequency"
              value="weekly"
              className="accent-[#8B5CF6]"
              checked={frequency === "weekly"}
              onChange={(e) => setFrequency(e.target.value)}
            />
            <span className="text-[#D1D5DB]">Weekly Summary</span>
          </label>
        </div>
      </div>

      {/* Email Notification Toggles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 text-white rounded bg-slate-700">
          <div>
            <p>Email for flagged messages</p>
            <p className="text-xs text-gray-400">
              Receive email notifications for flagged client messages
            </p>
          </div>
          <input
            type="checkbox"
            className="accent-purple-500"
            checked={flaggedEmail}
            onChange={(e) => setFlaggedEmail(e.target.checked)}
          />
        </div>
        <div className="flex items-center justify-between p-4 text-white rounded bg-slate-700">
          <div>
            <p>Email for high-concern client insights</p>
            <p className="text-xs text-gray-400">
              Receive email notifications for high-priority client insights
            </p>
          </div>
          <input
            type="checkbox"
            className="accent-purple-500"
            checked={highConcern}
            onChange={(e) => setHighConcern(e.target.checked)}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 mt-4 text-white rounded-lg bg-gradient-to-r from-[#0129B3] via-[#007BCC] to-[#77D7D2] hover:opacity-90"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default NotificationPreferences;
