import React from "react";
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
import { FaPlus } from "react-icons/fa";
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
  { title: "High Priority", value: 3 },
  { title: "Messages Sent", value: 12 },
  { title: "Flagged Clients", value: 2 },
];

// Helper function to return image based on title
const getImageByTitle = (title) => { 
  if (title === "Active Clients") return active;
  if (title === "High Priority") return priority;
  if (title === "Messages Sent") return message;
  if (title === "Flagged Clients") return appoinment;
  return null; // default if no match
};

const CaseMangerDashboard = () => {
  const [activeIndex, setActiveIndex] = React.useState(null);

  return (
    <div className="h-[90vh] bg-[#0f172a] text-white p-6">
      <div className="flex justify-between mb-6">
        <h1 className=" text-2xl font-bold">Case Manager Dashboard</h1>
        <button className="px-6 py-3 text-white flex items-center gap-2 font-semibold rounded-lg bg-gradient-to-r from-[#0129B3] via-[#007BCC] to-[#77D7D2] hover:from-[#0129B3]/90 hover:via-[#007BCC]/90 hover:to-[#77D7D2]/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
         <FaPlus /> New Client
        </button>
      </div>
      {/* Stats Section */}
      <div className="grid gap-4 mb-6 lg:grid-cols-2 2xl:grid-cols-4">
        {statsData.map((item, index) => (
          <div
            key={index}
            className="bg-[#1e293b] p-4 rounded-lg flex items-center justify-between gap-4"
          >
            <div>
              <p className="text-white">{item.title}</p>
              <h2 className={`text-2xl font-semibold`}>{item.value}</h2>
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

        {/* Client Sentiment Graph */}
        <div className="bg-[#1e293b] p-4 rounded-lg">
          <h3 className="mb-4 text-lg font-semibold">Client Sentiment Graph</h3>
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
          <h3 className="mb-4 text-lg font-semibold text-[#DC2626]">
            Flagged Clients
          </h3>
          <div className="space-y-4">
            {flaggedClients.map((client, idx) => (
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

export default CaseMangerDashboard;
