// LawFirm.jsx
import React, { useState } from "react";
import { FaPhone, FaMapMarkerAlt, FaPen, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const fakeFirms = [
  {
    id: 1,
    name: "Smith & Associates",
    phone: "(555) 123-4567",
    address: "123 Main St, New York, NY",
    status: "Active",
    team: [
      { name: "John Smith", role: "Admin", tag: "bg-purple-700" },
      { name: "Mike Johnson", role: "IS", tag: "bg-green-700" },
      { name: "Jane Doe", role: "CM", tag: "bg-slate-600" },
    ],
    active: true,
  },
  {
    id: 2,
    name: "Smith & Associates",
    phone: "(555) 123-4567",
    address: "123 Main St, New York, NY",
    status: "Active",
    team: [
      { name: "John Smith", role: "Admin", tag: "bg-purple-700" },
      { name: "Mike Johnson", role: "IS", tag: "bg-green-700" },
      { name: "Jane Doe", role: "CM", tag: "bg-slate-600" },
    ],
    active: true,
  },
];

const ToggleSwitch = ({ isOn, handleToggle }) => {
  return (
    <div
      onClick={handleToggle}
      className={`w-12 h-6 flex items-center rounded-full cursor-pointer p-1 transition-colors duration-300 ${
        isOn ? "bg-green-400" : "bg-gray-500"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
          isOn ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

const LawFirm = () => {
  const [firms, setFirms] = useState(fakeFirms);

  const handleToggle = (id) => {
    Swal.fire({
      title: "Are you sure to deactivate?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deactivate",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = firms.map((firm) =>
          firm.id === id ? { ...firm, active: false } : firm
        );
        setFirms(updated);
        Swal.fire("Blocked!", "Successfully blocked the firm.", "success");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search by phone number, firm name..."
          className="bg-[#1e293b] text-white px-4 py-2 rounded-md w-1/3 outline-none"
        />
        <button className="px-4 py-2 text-white rounded bg-gradient-to-r from-blue-600 to-cyan-400">
          Add new firm
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {firms.map((item) => (
          <div
            key={item.id}
            className={`rounded-lg p-4 shadow transition-all ${
              item.active
                ? "bg-[#1e293b] hover:shadow-lg"
                : "bg-[#1e293b] opacity-50"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <div className="flex items-center gap-2">
                <ToggleSwitch
                  isOn={item.active}
                  handleToggle={() => handleToggle(item.id)}
                />
                <FaPen className="text-green-400 cursor-pointer" />
                <FaTrash className="text-red-400 cursor-pointer" />
              </div>
            </div>

            <p className="mb-2 text-sm text-green-400">Service {item.status}</p>
            <div className="flex items-center gap-2 mb-1 text-sm">
              <FaPhone className="text-purple-400" /> {item.phone}
            </div>
            <div className="flex items-center gap-2 mb-3 text-sm">
              <FaMapMarkerAlt className="text-pink-400" /> {item.address}
            </div>

            <p className="mb-2 text-sm">Team Members:</p>
            <div className="flex flex-wrap gap-2">
              {item.team.map((member, index) => (
                <span
                  key={index}
                  className={`text-xs px-2 py-1 rounded-full ${member.tag}`}
                >
                  {member.name} ({member.role})
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LawFirm;
