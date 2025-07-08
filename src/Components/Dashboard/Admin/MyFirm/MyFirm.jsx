import React, { useState } from "react";
import LawyerCard from "./LawyerCard";
import MemberCard from "./MemberCard";
import bag from "../../../../assets/bag.png";
import right from "../../../../assets/right.png";
import clock from "../../../../assets/clock.png";
import { GoPlusCircle } from "react-icons/go";
const MyFirm = () => {
  const [activeTab, setActiveTab] = useState("lawyers");
  const [searchTerm, setSearchTerm] = useState("");

  const firmStats = {
    performanceScore: 85,
    totalClients: 247,
    activeCases: 89,
    teamMembers: 158,
  };

  const lawyers = [
    {
      id: 1,
      name: "Sarah Johnson",
      phone: "(555) 123-4567",
      manager: "John Smith",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Michael Davis",
      phone: "(555) 987-6543",
      manager: "Emily Chen",
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Lisa Wilson",
      phone: "(555) 456-7890",
      manager: "David Brown",
      image: "https://i.pravatar.cc/150?img=3",
    },
  ];

  const members = [
    {
      id: 1,
      name: "Jacob Lee",
      email: "jacob@example.com",
      role: "Assistant",
      image: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 2,
      name: "Nina Patel",
      email: "nina@example.com",
      role: "Intern",
      image: "https://i.pravatar.cc/150?img=5",
    },
  ];

  // Filtered Data Based on Search
  const filteredLawyers = lawyers.filter((lawyer) =>
    lawyer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0F172A] p-6 text-white">
      {/* Stats */}
      <div className="flex flex-row items-center gap-8 mb-8">
        {/* right */}
        <div className="bg-[#1e293b] p-4 rounded-lg w-1/2">
          <h2 className="text-2xl font-bold">Firm Performance Score</h2>
          <div className="flex flex-col items-center gap-3">
            <p className="mt-4 text-5xl font-semibold poppins">
              {firmStats.performanceScore}%
            </p>
            <p className="text-sm text-gray-400">Overall Score</p>
          </div>

          <div className="w-full h-2 mt-2 bg-gray-700 rounded">
            <div
              className="h-2 bg-white rounded"
              style={{ width: `${firmStats.performanceScore}%` }}
            />
          </div>
        </div>
        {/* left  */}
        <div className="grid w-full grid-cols-1 gap-4 mb-6 md:grid-cols-3">
          <div className="bg-[#1e293b] p-6 rounded-lg flex items-center justify-between">
            {/* content */}
            <div>
              {" "}
              <h2 className="text-lg font-normal text-[#E5E7EB]">
                Total Clients
              </h2>
              <p className="mt-2 text-2xl font-bold">
                {firmStats.totalClients}
              </p>
            </div>
            {/* image */}
            <div>
              <img src={bag} alt="" />
            </div>
          </div>
          <div className="bg-[#1e293b] p-6 rounded-lg flex items-center justify-between">
            {/* content */}
            <div>
              {" "}
              <h2 className="text-lg font-normal text-[#E5E7EB]">
                Active Cases
              </h2>
              <p className="mt-2 text-2xl font-bold">{firmStats.activeCases}</p>
            </div>
            {/* image */}
            <div>
              <img src={clock} alt="" />
            </div>
          </div>
          <div className="bg-[#1e293b] p-6 rounded-lg flex items-center justify-between">
            {/* content */}
            <div>
              {" "}
              <h2 className="text-lg font-normal text-[#E5E7EB]">
                Team Members
              </h2>
              <p className="mt-2 text-2xl font-bold">{firmStats.teamMembers}</p>
            </div>
            {/* image */}
            <div>
              <img src={right} alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-4 text-base poppins ">
        <button
          onClick={() => {
            setActiveTab("users");
            setSearchTerm("");
          }}
          className={`pb-2 ${
            activeTab === "users"
              ? "border-b-2 border-[#7C3AED]"
              : "text-[#FFFFFF]"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => {
            setActiveTab("lawyers");
            setSearchTerm("");
          }}
          className={`pb-2 ${
            activeTab === "lawyers"
              ? "border-b-2 border-[#7C3AED]"
              : "text-[#FFFFFF]"
          }`}
        >
          Lawyers
        </button>
      </div>

      {/* Search and Add */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search ${
            activeTab === "lawyers" ? "Lawyers" : "Members"
          }...`}
          className="w-full max-w-md p-2 bg-[#1e293b] text-[#ADAEBC] rounded-lg outline-none poppins"
        />
        <button className="flex items-center gap-3 px-4 py-2 ml-4 text-white rounded bg-gradient-to-r from-blue-600 to-cyan-400">
          <GoPlusCircle className="w-4 h-4" />{" "}
          {activeTab === "lawyers" ? "Add Lawyer" : "Add User"}
        </button>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {activeTab === "lawyers" &&
          filteredLawyers.map((lawyer) => (
            <LawyerCard key={lawyer.id} data={lawyer} />
          ))}

        {activeTab === "users" &&
          filteredMembers.map((member) => (
            <MemberCard key={member.id} data={member} />
          ))}
      </div>
    </div>
  );
};

export default MyFirm;
