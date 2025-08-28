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
import { useGetFirmDashboardQuery } from "../../../Redux/feature/SuperAdmin/superAdmin";


const SuperAdminDashboard = () => {
  const [activeIndex, setActiveIndex] = React.useState(null);
  const { data: dashboard, refetch } = useGetFirmDashboardQuery();
  console.log(dashboard, "dashboard");
  const statsData = [
    { title: "Active Users", value: dashboard?.active_users || 0 },
    { title: "Total Firms", value: dashboard?.total_firms || 0 },
  ];
  // Helper function to return image based on title
  const getImageByTitle = (title) => {
    if (title === "Active Users") return active;

    if (title === "Total Firms") return appoinment;
    return null; // default if no match
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="text-2xl font-bold mb-9 ">Super Admin Dashboard</h1>

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
      <div className="mt-24 !mb-10  bg-[#161E2F] p-6">
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
