import { useEffect, useState } from "react";
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
import { FaPlus } from "react-icons/fa";
import AddClientForm from "../../Shared/AddClientForm";
import {
  useGetAllFlaggedClientsQuery,
  useGetAllHighRiskClientsQuery,
  useGetCaseStatsQuery,
  useGetFirmScoresQuery,
} from "../../../Redux/api/caseapi";

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

// Helper function to return image based on title
const getImageByTitle = (title) => {
  if (title === "Active Clients") return active;
  if (title === "Issues") return priority;
  if (title === "Messages Sent This Month") return message;

  return null; // default if no match
};

const CaseMangerDashboard = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showAllClients, setShowAllClients] = useState(false);
  const [showAllFlaggedClients, setShowAllFlaggedClients] = useState(false);
  const [sentimentData, setSentimentData] = useState([]);

  const { data: highRiskClients } = useGetAllHighRiskClientsQuery();
  const { data: flaggedClientsData } = useGetAllFlaggedClientsQuery();
  const { data: caseStats } = useGetCaseStatsQuery();
  const { data: firmScores } = useGetFirmScoresQuery();
  console.log(highRiskClients);
  const statsData = [
    { title: "Active Clients", value: caseStats?.active_clients },
    { title: "Issues", value: caseStats?.issues },
    { title: "Messages Sent This Month", value: caseStats?.messages_sent },
  ];

  useEffect(() => {
    if (firmScores?.weekly_reputation_scores) {
      // Calculate the current date and the most recent week (Week 4)
      const currentDate = new Date();

      // Initialize an empty array for 4 weeks (Week 1, Week 2, Week 3, Week 4)
      let weeks = [
        { week: "Week 4", value: 0 }, // most recent week starts at Week 4
        { week: "Week 3", value: 0 },
        { week: "Week 2", value: 0 },
        { week: "Week 1", value: 0 },
      ];

      // Iterate over the weekly_reputation_scores and assign data to the corresponding week
      firmScores.weekly_reputation_scores.forEach((weekData) => {
        const weekStartDate = new Date(weekData.week_start_datetime);
        const timeDiff = currentDate - weekStartDate;
        const weeksDiff = Math.floor(timeDiff / (1000 * 3600 * 24 * 7)); // Convert milliseconds to weeks

        // Assign the reputation score to the corresponding week (only for Week 1-4)
        if (weeksDiff >= 0 && weeksDiff < 4) {
          weeks[weeksDiff].value = weekData.reputation_score;
        }
      });

      // Set the updated sentiment data
      setSentimentData(weeks);
    }
  }, [firmScores]);
  return (
    <div className="h-[86vh] bg-[#0f172a] text-white p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold "> Dashboard</h1>
        <button
          className="px-6 py-3 text-white flex items-center gap-2 font-semibold rounded-lg bg-gradient-to-r from-[#0129B3] via-[#007BCC] to-[#77D7D2] hover:from-[#0129B3]/90 hover:via-[#007BCC]/90 hover:to-[#77D7D2]/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          onClick={() => setShowAddClientModal(true)}
        >
          <FaPlus /> Create Client
        </button>
      </div>
      {/* Modal for Add Client */}
      {showAddClientModal && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black bg-opacity-40"
          onClick={() => setShowAddClientModal(false)}
        >
          <div
            className="relative w-full max-w-lg p-0 rounded-lg shadow-lg bg-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* <button
              className="absolute z-10 text-2xl font-bold text-gray-400 top-2 right-2 hover:text-white"
              onClick={() => setShowAddClientModal(false)}
              aria-label="Close"
            >
              &times;
            </button> */}
            <AddClientForm setShowAddClientModal={setShowAddClientModal} />
          </div>
        </div>
      )}
      {/* Stats Section */}
      <div className="grid gap-4 mb-6 lg:grid-cols-2 2xl:grid-cols-3">
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
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* High Risk Clients */}
        <div className="bg-[#1e293b] p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Clients at High Risk</h3>
            <button
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              onClick={() => setShowAllClients(!showAllClients)}
            >
              {showAllClients ? "View Less" : "View All"}
            </button>
          </div>
          <div
            className={`space-y-4 h-[400px] ${
              showAllClients ? "overflow-y-auto max-h-[400px] pr-2" : ""
            }`}
          >
            {highRiskClients?.length === 0 ? (
              <p className="text-center h-full flex items-center justify-center">
                No high risk clients found.
              </p>
            ) : (
              highRiskClients?.map((client, idx) => (
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
                      <p className="font-medium">{client.full_name}</p>
                      <p className="text-sm font-normal text-[#FFFFFF]">
                        Added {client?.days_since_added} days ago
                      </p>
                    </div>
                  </div>
                  {/* right */}
                  <div
                    className={`mt-1 inline-block px-2 py-1 rounded-full bg-red-200 text-red-900 text-xs font-semibold`}
                  >
                    High Risk
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Client Sentiment Graph */}
        <div className="bg-[#1e293b] p-4 rounded-lg relative">
          <h3 className="mb-4 text-lg font-semibold">Your Reputation Score</h3>
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
              <XAxis dataKey="week" stroke="#cbd5e1" />
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
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              onClick={() => setShowAllFlaggedClients(!showAllFlaggedClients)}
            >
              {showAllFlaggedClients ? "View Less" : "View All"}
            </button>
          </div>
          <div
            className={`space-y-4 h-[400px] ${
              showAllFlaggedClients ? "overflow-y-auto max-h-[400px] pr-2" : ""
            }`}
          >
            {flaggedClientsData?.length === 0 ? (
              <p className="text-center h-full flex items-center justify-center">
                No flagged clients found.
              </p>
            ) : (
              flaggedClientsData?.map((client, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-gradient-to-r from-[#747DE9] to-[#926CEA]"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-[#FFFFFF]">
                      {client?.full_name}
                    </p>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        client.priority === "High"
                          ? "bg-[#EF444433] text-white"
                          : client.priority === "Medium"
                          ? "bg-[#EAB30833] text-white"
                          : "bg-[#22C55E33] text-white"
                      }`}
                    >
                      {client.risk_level}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-normal text-white">
                    Last contact:
                    {new Date(client.last_contacted)
                      .toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })
                      .replace(",", " at")}
                  </p>

                  <p className="text-[12px] text-[#FFFFFF]">{client.alert}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseMangerDashboard;
