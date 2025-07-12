import React, { useState } from "react";
import div from "../../../assets/div.png";
import message from "../../../assets/message.png";
import priority from "../../../assets/priority.png";
import active from "../../../assets/active.png";
import appoinment from "../../../assets/appoinment.png";
import { NavLink } from "react-router-dom";
import { FaPlus, FaSync, FaUpload } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";
import { MdSettingsSuggest } from "react-icons/md";
import AddLawFirm from "./LawFirm/AddLawFirm";
const fakeClients = [
  {
    name: "Smith & Associates",
    status: "Active",
    added: "2 days ago",
  },
  {
    name: "Legal Partners LLC",
    status: "Pending",
    added: "5 days ago",
  },
  {
    name: "Smith & Associates",
    status: "Active",
    added: "2 days ago",
  },
  {
    name: "Legal Partners LLC",
    status: "Pending",
    added: "5 days ago",
  },
];
const statsData = [
  { title: "Active Users", value: 24 },
  { title: "High Firms", value: 3 },

  { title: "Total Firms", value: 25 },
];
// Helper function to return image based on title
const getImageByTitle = (title) => {
  if (title === "Active Users") return active;
  if (title === "High Firms") return priority;

  if (title === "Total Firms") return appoinment;
  return null; // default if no match
};
const SuperAdminDashboard = () => {
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="mb-6 text-2xl font-bold">Super Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="grid gap-4 mb-6 lg:grid-cols-2 2xl:grid-cols-4">
        {statsData.map((item, index) => (
          <div
            key={index}
            className="bg-[#1e293b] p-6 rounded-lg flex items-center justify-between gap-4"
          >
            <div>
              <p className="text-white">{item.title}</p>
              <h2
                className={`text-2xl font-semibold ${
                  item.title === "Total Firms"
                    ? "text-[#FACC15]"
                    : item.title === "High Firms"
                    ? "text-[#F87171]"
                    : "text-white"
                }`}
              >
                {item.value}
              </h2>
            </div>
            <img
              src={getImageByTitle(item.title)}
              alt={item.title}
              className="object-contain w-12 h-12"
            />
          </div>
        ))}
      </div>
      {/* Quick Action */}
      <div className="mt-12 !mb-10  bg-[#161E2F] p-6">
        <div className="mb-6">
          <h1 className="text-xl font-semibold  text-[#FFFFFF]  roboto mb-1">
            Quick Actions
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 !mb-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex flex-col items-center gap-4  border border-dashed border-[#FFFFFF] text-[#FFFFFF] px-6 py-4 rounded-lg roboto text-base font-medium"
          >
            <FaPlus className="text-[#2563EB]" /> Add Law Firm
          </button>
          <NavLink
            to="/dashboard/law-Firm"
            className="flex flex-col items-center gap-4  border border-dashed border-[#FFFFFF] text-[#FFFFFF] px-6 py-4 rounded-lg roboto text-base font-medium"
          >
            {" "}
            <button className="flex flex-col items-center gap-4 ">
              <BsQuestionCircle className="text-[#16A34A]" /> View Law Firms
            </button>{" "}
          </NavLink>
          <NavLink
            to="/dashboard/settings"
            className="flex flex-col items-center gap-4  border border-dashed border-[#FFFFFF] text-[#FFFFFF] px-6 py-4 rounded-lg roboto text-base font-medium"
          >
            {" "}
            <button className="flex flex-col items-center gap-4 ">
              <MdSettingsSuggest className="text-[#EA580C]" /> Manage Settings
            </button>{" "}
          </NavLink>
        </div>
      </div>
      {/* Middle Section */}
      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-3">
        {/* High Concern Clients */}
        <div className="bg-[#1e293b] p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">High Concern Clients</h3>
            <button className="text-sm text-blue-400">View All</button>
          </div>
          <div className="space-y-4">
            {fakeClients.map((client, idx) => (
              <div
                key={idx}
                className="p-3 bg-transparent border rounded-lg border-[#F3F4F6] flex items-center justify-between hover:bg-[#374151] transition-colors duration-200"
              >
                {/* left */}
                <div className="flex items-center space-x-4">
                  {/* img
                   */}
                  <div>
                    <img src={div} alt="" />
                  </div>
                  {/* content */}
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm font-normal text-[#FFFFFF]">
                      Added {client.added}
                    </p>
                  </div>
                </div>
                {/* right */}
                <div
                  className={`mt-1 inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    client.status === "Active"
                      ? "bg-green-200 text-green-900"
                      : "bg-yellow-200 text-yellow-900"
                  }`}
                >
                  {client.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
         {isModalOpen && (
        <AddLawFirm
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default SuperAdminDashboard;
