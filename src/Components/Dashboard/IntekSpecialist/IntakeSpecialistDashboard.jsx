import React from "react";
import priority from "../../../assets/priority.png";
import active from "../../../assets/active.png";
import { FaPlus } from "react-icons/fa";
import AddClientForm from "../../Shared/AddClientForm";
import IntakeSpecialistClients from "./IntakeSpecialistClients";
import {
  useGetAllClientsQuery,
  useGetStatsQuery,
} from "../../../Redux/api/intakeapi";

// Helper function to return image based on title
const getImageByTitle = (title) => {
  if (title === "Active Clients") return active;
  if (title === "Clients Signed This Month") return priority;
  return null; // default if no match
};

const IntakeSpecialistDashboard = () => {
  const [showAddClientModal, setShowAddClientModal] = React.useState(false);

  const { data: clients = [], isLoading } = useGetAllClientsQuery();
  const { data: stats } = useGetStatsQuery();
  const statsData = [
    { title: "Active Clients", value: stats?.active_clients },
    { title: "Clients Signed This Month", value: stats?.created_clients },
  ];
  return (
    <div className="h-[85vh] bg-[#0f172a] text-white p-6">
      <div className="flex justify-between mb-6">
        <h1 className=" text-2xl font-bold">Intake Specialist Dashboard</h1>
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={() => setShowAddClientModal(false)}
        >
          <div
            className="relative bg-slate-800 rounded-lg shadow-lg p-0 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl font-bold z-10"
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
      <div className="grid gap-4 mb-6 lg:grid-cols-2">
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

      {/* Clients Table */}
      <div className="p-6">
        <IntakeSpecialistClients clients={clients} />
      </div>
    </div>
  );
};

export default IntakeSpecialistDashboard;
