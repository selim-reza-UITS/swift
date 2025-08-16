import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import div from "../../../assets/div.png";
import message from "../../../assets/message.png";
import priority from "../../../assets/priority.png";
import active from "../../../assets/active.png";
import appoinment from "../../../assets/appoinment.png";

const fakeClients = [
  { name: "Smith & Associates", status: "High Risk", added: "2 days ago" },
  { name: "Legal Partners LLC", status: "High Risk", added: "5 days ago" },
  { name: "Justice Partners", status: "High Risk", added: "3 days ago" },
  { name: "Legal Team A", status: "High Risk", added: "4 days ago" },
  { name: "Legal Team B", status: "High Risk", added: "6 days ago" },
  { name: "Legal Team C", status: "High Risk", added: "1 week ago" },
  { name: "Law & Co", status: "Active", added: "1 day ago" }, // non-High Risk
];

const flaggedClients = [
  {
    name: "Sarah Johnson",
    lastContact: "2 hours ago",
    alert: "Missed appointment alert",
    priority: "High",
  },
  {
    name: "Michael Chen",
    lastContact: "1 day ago",
    alert: "Follow-up required",
    priority: "Medium",
  },
  {
    name: "Emily Davis",
    lastContact: "3 days ago",
    alert: "Case progressing well",
    priority: "Low",
  },
  {
    name: "Michael Chen",
    lastContact: "1 day ago",
    alert: "Follow-up required",
    priority: "Medium",
  },
];

const sentimentData = [
  { day: "Sun", value: 30 },
  { day: "Mon", value: 40 },
  { day: "Tue", value: 50 },
  { day: "Wed", value: 60 },
  { day: "Thu", value: 80 },
  { day: "Fri", value: 60 },
  { day: "Sat", value: 50 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const mood = value > 50 ? "😊 Happy" : "😔 Sad";
    return (
      <div className="p-2 text-white poppins rounded-3xl shadow bg-[#8C15FF] ">
        <p className="text-sm"> {mood}</p>
      </div>
    );
  }
  return null;
};

const statsData = [
  { title: "Active Clients", value: 24 },
  { title: "Issues", value: 3 },
  { title: "Messages Sent This Month", value: 12 },
];

const getImageByTitle = (title) => {
  if (title === "Active Clients") return active;
  if (title === "Issues") return priority;
  if (title === "Messages Sent This Month") return message;
  return null;
};

const AdminDashboard = () => {
  // আলাদা state দুটি সেকশনের জন্য
  const [showAllHighRisk, setShowAllHighRisk] = useState(false);
  const [showAllFlagged, setShowAllFlagged] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  // Filter only High Risk clients
  const highRiskClients = fakeClients.filter((c) => c.status === "High Risk");

  // Display first 3 or all based on toggle
  const displayedHighRisk = showAllHighRisk
    ? highRiskClients
    : highRiskClients.slice(0, 3);

  const displayedFlagged = showAllFlagged
    ? flaggedClients
    : flaggedClients.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="mb-6 text-2xl font-bold">Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="grid gap-4 mb-6 lg:grid-cols-2 2xl:grid-cols-4">
        {statsData.map((item, index) => (
          <div
            key={index}
            className="bg-[#1e293b] p-4 rounded-lg flex items-center justify-between gap-4"
          >
            <div>
              <p className="text-white">{item.title}</p>
              <h2 className="text-2xl font-semibold">{item.value}</h2>
            </div>
            <img
              src={getImageByTitle(item.title)}
              alt={item.title}
              className="object-contain w-12 h-12"
            />
          </div>
        ))}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-3">
        {/* High Concern Clients */}
        <div className="bg-[#1e293b] p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Clients at High Risk
            </h3>
            <button
              onClick={() => setShowAllHighRisk(!showAllHighRisk)}
              className="text-sm text-blue-400 hover:underline"
            >
              {showAllHighRisk ? "Show Less" : "View All"}
            </button>
          </div>

          <div
            className={`pr-1 space-y-4 overflow-y-auto transition-all duration-300 ${
              showAllHighRisk ? "max-h-none" : "max-h-64"
            }`}
          >
            {displayedHighRisk.map((client, idx) => (
              <div
                key={idx}
                className="p-3 bg-transparent border rounded-lg border-[#F3F4F6] flex items-center justify-between hover:bg-[#374151] transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={client.img || "https://via.placeholder.com/40"}
                    alt={client.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-white">{client.name}</p>
                    <p className="text-sm text-[#FFFFFF]">
                      Added {client.added}
                    </p>
                  </div>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    client.status === "High Risk"
                      ? "bg-red-200 text-red-900"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {client.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Sentiment Graph */}
        <div className="bg-[#1e293b] p-4 rounded-lg">
          <h3 className="mb-4 text-lg font-semibold">Average Firm Reputation</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={sentimentData}
              barSize={32}
              barCategoryGap={20}
              onMouseLeave={() => setActiveIndex(null)}
              onMouseMove={(state) => {
                if (state?.activeTooltipIndex !== activeIndex) {
                  setActiveIndex(state.activeTooltipIndex);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[5, 5, 0, 0]}>
                {sentimentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === activeIndex ? "#3b82f6" : "#a855f7"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Flagged Clients */}
        <div className="bg-[#1e293b] p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#DC2626]">
              Flagged Clients
            </h3>
            <button
              onClick={() => setShowAllFlagged(!showAllFlagged)}
              className="text-xs font-semibold text-[#1e293b] bg-white px-2 py-1 rounded hover:bg-gray-200"
            >
              {showAllFlagged ? "Hide All" : "Show All"}
            </button>
          </div>

          <div className="space-y-4">
            {displayedFlagged.map((client, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-gradient-to-r from-[#747DE9] to-[#926CEA]"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-[#FFFFFF]">{client.name}</p>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      client.priority === "High"
                        ? "bg-[#EF444433] text-white"
                        : client.priority === "Medium"
                        ? "bg-[#EAB30833] text-white"
                        : "bg-[#22C55E33] text-white"
                    }`}
                  >
                    {client.priority}
                  </span>
                </div>

                <p className="mt-2 text-sm font-normal text-white">
                  Last contact: {client.lastContact}
                </p>
                <p className="text-[12px] text-[#FFFFFF]">{client.alert}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
