// LawFirm.jsx
import React, { useState } from "react";
import { FaPhone, FaMapMarkerAlt, FaPen, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { MdLocalPhone } from "react-icons/md";
import AddLawFirm from "./AddLawFirm";
import { FaRegEdit } from "react-icons/fa";
import EditLawfirm from "./EditLawfirm";
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
      { name: "Jane Doe", role: "Lawyer", tag: "bg-slate-600" },
    ],
    active: true,
  },

  {
    id: 2,
    name: "Lina & Associates",
    phone: "(888) 123-4567",
    address: "123 Main St, New York, NY",
    status: "Active",
    team: [
      { name: "John Smith", role: "Admin", tag: "bg-purple-700" },
      { name: "Mike Johnson", role: "IS", tag: "bg-green-700" },
      { name: "Jane Doe", role: "Lawyer", tag: "bg-slate-600" },
    ],
    active: true,
  },
     {
    id: 3,
    name: "Zon & Associates",
    phone: "(555) 123-4567",
    address: "123 Main St, New York, NY",
    status: "Not Available",
    team: [
      { name: "John Smith", role: "Admin", tag: "bg-purple-700" },
      { name: "Mike Johnson", role: "IS", tag: "bg-green-700" },
      { name: "Jane Doe", role: "Lawyer", tag: "bg-slate-600" },
    ],
    active: false,
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFirm, setSelectedFirm] = useState(null); // For editing
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
  // Filtered firms based on search
  const filteredFirms = firms.filter(
    (firm) =>
      firm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      firm.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete function
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "#1e293b",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = firms.filter((firm) => firm.id !== id);
        setFirms(updated);
        Swal.fire({
          title: "Deleted!",
          text: "Firm has been deleted.",
          icon: "success",
          background: "#1e293b",
          color: "#fff",
        });
      }
    });
  };

  // Open edit modal
  const handleEdit = (firm) => {
    setSelectedFirm(firm);
    setIsEditModalOpen(true);
  };
  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-6 poppins">
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search by phone number, firm name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-[#1e293b] text-white px-4 py-2 rounded-md w-1/3 outline-none"
        />
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="px-4 py-2 text-white rounded bg-gradient-to-r from-blue-600 to-cyan-400"
        >
          Add new firm
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredFirms.map((item) => (
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
              <div className="flex items-center gap-4">
                <ToggleSwitch
                  isOn={item.active}
                  handleToggle={() => handleToggle(item.id)}
                />
                <FaRegEdit
                  onClick={() => handleEdit(item.id)}
                  className="text-[#FFFFFF] cursor-pointer text-lg"
                />
                <FaTrash
                  onClick={() => handleDelete(item.id)}
                  className="text-red-400 cursor-pointer"
                />
              </div>
            </div>

            <p className="mb-2 text-sm text-[#4ADE80]">Service {item.status}</p>
            <div className="flex items-center gap-2 mb-1 text-sm text-[#D1D5DB]">
              <MdLocalPhone className="text-[#7C3AED] text-lg" />
              {item.phone}
            </div>
            <div className="flex items-center gap-2 mb-3 text-sm text-[#D1D5DB] mt-1">
              <FaMapMarkerAlt className="text-[#7C3AED] text-lg" />{" "}
              {item.address}
            </div>

            <p className="mb-2 text-sm text-[#D1D5DB]">Team Members:</p>
            <div className="flex flex-wrap gap-2">
              {item.team.map((member, index) => {
                let bgColor = "#3B82F633"; // default: others

                if (member.role === "Admin") {
                  bgColor = "#7C3AED33";
                } else if (member.role === "IS") {
                  bgColor = "#22C55E33";
                }

                return (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full"
                    style={{ backgroundColor: bgColor }}
                  >
                    {member.name} ({member.role})
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <AddLawFirm
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      {isEditModalOpen && (
        <EditLawfirm
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedFirm(null);
          }}
          firmToEdit={selectedFirm}
        />
      )}
    </div>
  );
};

export default LawFirm;
