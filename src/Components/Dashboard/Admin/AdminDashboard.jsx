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
import message from "../../../assets/message.png";
import priority from "../../../assets/priority.png";
import active from "../../../assets/active.png";
import {
  useGetAdminDashboardQuery,
  useGetFirmChartQuery,
  useGetFlaggedClientQuery,
  useGetHighRiskQuery,
} from "../../../Redux/feature/Admin/admin";

// ✅ Tooltip renderer for reputation chart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const mood = value > 50 ? "😊 Good" : "😔 Needs Attention";
    return (
      <div className="p-2 text-white poppins rounded-3xl shadow bg-[#8C15FF]">
        <p className="text-sm">{mood}</p>
        <p className="text-xs">Score: {value}</p>
      </div>
    );
  }
  return null;
};

// ✅ Helper to extract initials
const getInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  return (
    words[0][0].toUpperCase() + (words[1] ? words[1][0].toUpperCase() : "")
  );
};

// ✅ Transform API data into fixed Week1–Week4 slots
const buildWeeklyData = (weeklyScores) => {
  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const base = weeks.map((w) => ({ week: w, value: 0 }));

  weeklyScores?.forEach((item) => {
    // Example: map by position or parsing date
    // Here we assume the API sends only Week 3 → put it in index 2
    const weekIndex = 2; // adjust logic if backend sends clear week number
    base[weekIndex].value = item.reputation_score;
  });

  return base;
};

const AdminDashboard = () => {
  const [showAllHighRisk, setShowAllHighRisk] = useState(false);
  const [showAllFlagged, setShowAllFlagged] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const { data: dashboard } = useGetAdminDashboardQuery();
  const { data: highRiskClients = [] } = useGetHighRiskQuery();
  const { data: flaggedClients = [] } = useGetFlaggedClientQuery();
  const { data: firmScores } = useGetFirmChartQuery();

  const statsData = [
    { title: "Active Clients", value: dashboard?.active_clients || 0 },
    { title: "Issues", value: dashboard?.issues || 0 },
    { title: "Messages Sent This Month", value: dashboard?.messages_sent || 0 },
  ];

  const getImageByTitle = (title) => {
    if (title === "Active Clients") return active;
    if (title === "Issues") return priority;
    if (title === "Messages Sent This Month") return message;
    return null;
  };

  const displayedHighRisk = showAllHighRisk
    ? highRiskClients
    : highRiskClients.slice(0, 3);

  const displayedFlagged = showAllFlagged
    ? flaggedClients
    : flaggedClients.slice(0, 3);

  // ✅ Build chart data: always Week1–Week4
  const reputationData = buildWeeklyData(
    firmScores?.weekly_reputation_scores || []
  );

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
              High Risk Clients
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
            {highRiskClients.length > 0 ? (
              displayedHighRisk.map((client) => (
                <div
                  key={client.id}
                  className="p-3 bg-transparent border rounded-lg border-[#F3F4F6] flex items-center justify-between hover:bg-[#374151] transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#8C15FF] text-white font-bold">
                      {getInitials(client.full_name)}
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        {client.full_name}
                      </p>
                      <p className="text-sm text-[#FFFFFF]">
                        Added {client.days_since_added} days ago
                      </p>
                      <p className="text-xs text-[#CBD5E1]">
                        {client.phone_number}
                      </p>
                    </div>
                  </div>
                  <div className="px-2 py-1 text-xs font-semibold text-red-900 bg-red-200 rounded-full">
                    High Risk
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 font-medium text-center text-green-400 rounded-lg">
                All clients tracking low risk
              </div>
            )}
          </div>
        </div>

        {/* Average Firm Reputation (uses API data) */}
        <div className="bg-[#1e293b] p-4 rounded-lg">
          <h3 className="mb-4 text-lg font-semibold">
            Average Firm Reputation
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={reputationData}
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
              <XAxis dataKey="week" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[5, 5, 0, 0]}>
                {reputationData.map((entry, index) => (
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
              className="text-sm text-blue-400 hover:underline"
            >
              {showAllFlagged ? "Show Less" : "Show All"}
            </button>
          </div>

          <div className="space-y-4">
            {flaggedClients.length > 0 ? (
              displayedFlagged.map((client, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-gradient-to-r from-[#747DE9] to-[#926CEA] transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#DC2626] text-white font-bold">
                        {getInitials(client?.full_name)}
                      </div>
                      <div>
                        <p className="font-medium text-[#FFFFFF]">
                          {client?.full_name}
                        </p>
                        <p className="text-sm font-normal text-white">
                          Last contact:{" "}
                          {client?.last_contacted
                            ? new Date(
                                client.last_contacted
                              ).toLocaleDateString()
                            : "N/A"}
                        </p>
                        <p className="text-[12px] text-[#FFFFFF]">
                          {client?.general_case_info}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        client.risk_level === "High"
                          ? "bg-[#EF444433] text-white"
                          : client.risk_level === "Medium"
                          ? "bg-[#EAB30833] text-white"
                          : "bg-[#22C55E33] text-white"
                      }`}
                    >
                      {client?.risk_level}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 font-medium text-center text-green-400 rounded-lg ">
                All conversations look good
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
