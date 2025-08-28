/* eslint-disable react/prop-types */
import React, { useState } from "react";
import LawyerCard from "./LawyerCard";
import MemberCard from "./MemberCard";
import bag from "../../../../assets/bag.png";
import right from "../../../../assets/right.png";
import { GoPlusCircle } from "react-icons/go";
import AddUser from "./AddUser";
import AddLawyer from "./AddLawyer";
import Swal from "sweetalert2";
import ViewLawyerDetails from "./ViewLawyerDetails";
import ViewMemberDetails from "./ViewMemberDetails";
import EditLawyer from "./EditLawyer";
import EditUser from "./EditUser";
import {
  useDeleteLawyerMutation,
  useGetDashboardQuery,
  useGetFirmChartQuery,
  useGetLawyerQuery,
  useGetManagerQuery,
} from "../../../../Redux/feature/Admin/admin";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const MyFirm = () => {
  const [activeTab, setActiveTab] = useState("lawyers");
  const [searchTerm, setSearchTerm] = useState("");
  const [showLawyerModal, setShowLawyerModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedEditUser, setSelectedEditUser] = useState(null);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [selectedEditLawyer, setSelectedEditLawyer] = useState(null);
  const [currentLawyerPage, setCurrentLawyerPage] = useState(1);
  const [currentMemberPage, setCurrentMemberPage] = useState(1);
  const itemsPerPage = 4;

  const { data: firmScores } = useGetFirmChartQuery();
  const { data: firm, isLoading: isMembersLoading, refetch } = useGetDashboardQuery();
    const {data:managers , isLoading: managersLoading, isError: managersError} =  useGetManagerQuery();
  const { data: lawyerApiData = [], isLoading, isError } = useGetLawyerQuery();

  const firmStats = {
    performanceScore: firmScores?.firm_health_score,
    reputation: firmScores?.firm_reputation_score,
    totalClients: firm?.total_clients,
    teamMembers: firm?.team_members,
  };

  // API gives direct array of lawyers
  const lawyerList = Array.isArray(lawyerApiData) ? lawyerApiData : [];
const memberList = React.useMemo(() => {
  if (!managers) return [];

  const formattedManagers = managers.map((member) => ({
    id: member.id,
    name: member.name,
    email: member.email,
    role: member.role,
    image: member.name
      .split(" ")
      .map((n) => n[0])
      .join("") // initials like "JD"
      .toUpperCase(),
  }));

  return formattedManagers;
}, [managers]);


  const filteredLawyers = lawyerList.filter((lawyer) =>
    lawyer.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMembers = memberList.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // pagination
  const indexOfLastLawyer = currentLawyerPage * itemsPerPage;
  const indexOfFirstLawyer = indexOfLastLawyer - itemsPerPage;
  const currentLawyers = filteredLawyers.slice(
    indexOfFirstLawyer,
    indexOfLastLawyer
  );

  const indexOfLastMember = currentMemberPage * itemsPerPage;
  const indexOfFirstMember = indexOfLastMember - itemsPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );
  console.log("Members in MyFirm:", currentMembers);

  const handleAddClick = () => {
    if (activeTab === "lawyers") {
      setShowLawyerModal(true);
    } else {
      setShowUserModal(true);
    }
  };

 const [deleteLawyer] = useDeleteLawyerMutation(); // import this from your RTK slice

const handleDelete = async (type, id) => {
  Swal.fire({
    title: "Are you sure?",
    text: `You want to delete this ${type === "lawyer" ? "lawyer" : "user"}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#4b5563",
    confirmButtonText: "Yes, delete it!",
    background: "#1f2937",
    color: "#ffffff",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        if (type === "lawyer") {
          // Call RTK Query mutation
          await deleteLawyer({ id }).unwrap();
        } else {
          // Local deletion for users
          const updated = memberList.filter((member) => member.id !== id);
          setMemberList(updated);
        }

        Swal.fire({
          title: "Deleted!",
          text: "The entry has been deleted.",
          icon: "success",
          background: "#1f2937",
          color: "#ffffff",
          confirmButtonColor: "#6366F1",
        });
      } catch (error) {
        console.error("Delete failed:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
          background: "#1f2937",
          color: "#ffffff",
          confirmButtonColor: "#6366F1",
        });
      }
    }
  });
};


  const handleViewDetails = (type, data) => {
    if (type === "lawyer") {
      setSelectedLawyer(data);
    } else {
      setSelectedUser(data);
    }
  };

  const handleEditDetails = (type, data) => {
    if (type === "lawyer") {
      setSelectedEditLawyer(data);
    } else {
      setSelectedEditUser(data);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] p-6 text-white">
      {/* Firm Stats */}
      <div className="flex flex-row items-center gap-8 mb-8">
        <div className="bg-[#1e293b] p-4 rounded-lg w-1/2">
          <h2 className="text-2xl font-bold">Firm Health Score</h2>
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

        <div className="bg-[#1e293b] p-4 rounded-lg w-1/2">
          <h2 className="text-2xl font-bold">Firm Reputation</h2>
          <div className="flex flex-col items-center gap-3">
            <p className="mt-4 text-5xl font-semibold poppins">
              {firmStats.reputation}%
            </p>
            <p className="text-sm text-gray-400">Overall Score</p>
          </div>
          <div className="w-full h-2 mt-2 bg-gray-700 rounded">
            <div
              className="h-2 bg-white rounded"
              style={{ width: `${firmStats.reputation}%` }}
            />
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 mb-6 md:grid-cols-3">
          <div className="bg-[#1e293b] p-6 rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-lg font-normal text-[#E5E7EB]">
                Total Clients
              </h2>
              <p className="mt-2 text-2xl font-bold">
                {firmStats.totalClients}
              </p>
            </div>
            <img src={bag} alt="" />
          </div>
          <div className="bg-[#1e293b] p-6 rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-lg font-normal text-[#E5E7EB]">
                Team Members
              </h2>
              <p className="mt-2 text-2xl font-bold">{firmStats.teamMembers}</p>
            </div>
            <img src={right} alt="" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-4 text-base poppins">
        <button
          onClick={() => {
            setActiveTab("users");
            setSearchTerm("");
            setCurrentMemberPage(1);
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
            setCurrentLawyerPage(1);
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

      {/* Search & Add */}
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
        <button
          className="flex items-center gap-3 px-4 py-2 ml-4 text-white rounded bg-gradient-to-r from-blue-600 to-cyan-400"
          onClick={handleAddClick}
        >
          <GoPlusCircle className="w-4 h-4" />
          {activeTab === "lawyers" ? "Add Lawyer" : "Add Users"}
        </button>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {activeTab === "lawyers" &&
          currentLawyers.map((lawyer) => (
            <LawyerCard
              key={lawyer.id}
              data={{
                image: "/default-avatar.png",
                name: lawyer.name,
                phone: lawyer.phone_number,
                manager: lawyer.law_firm?.name || "N/A",
              }}
              onDelete={() => handleDelete("lawyer", lawyer.id)}
              onView={() => handleViewDetails("lawyer", lawyer)}
              onEdit={() => handleEditDetails("lawyer", lawyer)}
            />
          ))}

        {activeTab === "users" &&
          !isMembersLoading &&
          currentMembers.map((member) => (
            <MemberCard
              key={member.id}
              data={member}
              onDelete={() => handleDelete("user", member.id)}
              onView={() => handleViewDetails("user", member)}
              onEdit={() => handleEditDetails("user", member)}
            />
          ))}

        {activeTab === "users" && isMembersLoading && (
          <p className="text-white">Loading members...</p>
        )}
      </div>

      {/* Lawyer Pagination */}
      {activeTab === "lawyers" && filteredLawyers.length > itemsPerPage && (
        <div className="flex justify-end gap-2 mt-6">
          <button
            disabled={currentLawyerPage === 1}
            onClick={() =>
              setCurrentLawyerPage((prev) => Math.max(prev - 1, 1))
            }
            className={`px-3 py-1 rounded ${
              currentLawyerPage === 1
                ? "bg-gray-600 cursor-not-allowed text-gray-300"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            <FaChevronLeft />
          </button>
          {Array.from(
            { length: Math.ceil(filteredLawyers.length / itemsPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentLawyerPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentLawyerPage === i + 1
                    ? "bg-[#7C3AED] text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
          <button
            disabled={
              currentLawyerPage ===
              Math.ceil(filteredLawyers.length / itemsPerPage)
            }
            onClick={() =>
              setCurrentLawyerPage((prev) =>
                Math.min(
                  prev + 1,
                  Math.ceil(filteredLawyers.length / itemsPerPage)
                )
              )
            }
            className={`px-3 py-1 rounded ${
              currentLawyerPage ===
              Math.ceil(filteredLawyers.length / itemsPerPage)
                ? "bg-gray-600 cursor-not-allowed text-gray-300"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {/* Member Pagination */}
      {activeTab === "users" && filteredMembers.length > itemsPerPage && (
        <div className="flex justify-end gap-2 mt-6">
          <button
            disabled={currentMemberPage === 1}
            onClick={() =>
              setCurrentMemberPage((prev) => Math.max(prev - 1, 1))
            }
            className={`px-3 py-1 rounded ${
              currentMemberPage === 1
                ? "bg-gray-600 cursor-not-allowed text-gray-300"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            <FaChevronLeft />
          </button>
          {Array.from(
            { length: Math.ceil(filteredMembers.length / itemsPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentMemberPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentMemberPage === i + 1
                    ? "bg-[#7C3AED] text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
          <button
            disabled={
              currentMemberPage ===
              Math.ceil(filteredMembers.length / itemsPerPage)
            }
            onClick={() =>
              setCurrentMemberPage((prev) =>
                Math.min(
                  prev + 1,
                  Math.ceil(filteredMembers.length / itemsPerPage)
                )
              )
            }
            className={`px-3 py-1 rounded ${
              currentMemberPage ===
              Math.ceil(filteredMembers.length / itemsPerPage)
                ? "bg-gray-600 cursor-not-allowed text-gray-300"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {/* Modals */}
      {showUserModal && <AddUser refetch={refetch} onClose={() => setShowUserModal(false)} />}
      {showLawyerModal && (
        <AddLawyer onClose={() => setShowLawyerModal(false)} />
      )}
      {selectedLawyer && (
        <ViewLawyerDetails
          lawyer={selectedLawyer}
          onClose={() => setSelectedLawyer(null)}
        />
      )}
      {selectedEditLawyer && (
        <EditLawyer
          lawyer={selectedEditLawyer}
          onClose={() => setSelectedEditLawyer(null)}
        />
      )}
      {selectedEditUser && (
        <EditUser
          member={selectedEditUser}
          onClose={() => setSelectedEditUser(null)}
        />
      )}
      {selectedUser && (
        <ViewMemberDetails
          member={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default MyFirm;
