import React from "react";
import priority from "../../../assets/priority.png";
import active from "../../../assets/active.png";
import { FaPlus } from "react-icons/fa";
import AddClientForm from "../../Shared/AddClientForm";
import IntakeSpecialistClients from "./IntakeSpecialistClients";
const assignments = [
  {
    id: 1,
    name: "Sarah Johnson",
    assignedTime: "Assigned 2 hours ago",
    status: "new",
    actionType: "accept",
  },
  {
    id: 2,
    name: "Michael Chen",
    assignedTime: "Assigned 5 hours ago",
    status: "active",
    actionType: "view",
  },
  {
    id: 3,
    name: "Emily Davis",
    assignedTime: "Assigned 1 day ago",
    status: "in-progress",
    actionType: "update",
  },
];

const messages = [
  {
    id: 1,
    name: "Lisa Wilson",
    message: "Need update on case #1234",
    time: "2 min ago",
    isNew: true,
  },
  {
    id: 2,
    name: "David Brown",
    message: "Client meeting scheduled",
    time: "15 min ago",
    isNew: false,
  },
  {
    id: 3,
    name: "Anna Martinez",
    message: "Task completed successfully",
    time: "1 hour ago",
    isNew: false,
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "new":
      return "bg-[#EAB308]/20 text-[#EAB308]";
    case "active":
      return "bg-[#22C55E]/20 text-[#22C55E]";
    case "in-progress":
      return "bg-[#3B82F6]/20 text-[#3B82F6]";
    default:
      return "bg-gray-600";
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case "new":
      return "New";
    case "active":
      return "Active";
    case "in-progress":
      return "In Progress";
    default:
      return "Unknown";
  }
};

const getActionButton = (actionType) => {
  switch (actionType) {
    case "accept":
      return (
        <button className="px-4 py-1 bg-[#7C3AED] text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors">
          Accept
        </button>
      );
    case "view":
      return (
        <button className="px-4 py-1 bg-gray-700 text-white rounded-md text-sm font-medium hover:bg-gray-600 transition-colors">
          View
        </button>
      );
    case "update":
      return (
        <button className="px-4 py-1 bg-gray-700 text-white rounded-md text-sm font-medium hover:bg-gray-600 transition-colors">
          Update
        </button>
      );
    default:
      return null;
  }
};

const statsData = [
  { title: "Active Clients", value: 24 },
  { title: "Clients Signed This Month", value: 3 },
];

// Helper function to return image based on title
const getImageByTitle = (title) => {
  if (title === "Active Clients") return active;
  if (title === "Clients Signed This Month") return priority;
  return null; // default if no match
};

const IntakeSpecialistDashboard = () => {
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [showAddClientModal, setShowAddClientModal] = React.useState(false);

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

      {/* Middle Section */}
      <div className="p-6">
      <IntakeSpecialistClients />
      </div>
    </div>
  );
};

export default IntakeSpecialistDashboard;
