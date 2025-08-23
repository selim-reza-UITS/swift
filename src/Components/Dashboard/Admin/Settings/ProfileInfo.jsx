import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  useGetProfileQuery,
  useUpdateNameMutation,
} from "../../../../Redux/feature/Shared/Share";

const ProfileInfo = () => {
  const { data, isLoading, isError } = useGetProfileQuery();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const [updateName, { isLoading: isUpdating }] = useUpdateNameMutation();

  useEffect(() => {
    if (data?.data) {
      setFullName(data.data.name);
      setEmail(data.data.email);
      setRole(data.data.role);
      setDateJoined(new Date(data.data.date_joined).toLocaleDateString());
    }
  }, [data]);

  const handleSave = async () => {
    if (!fullName.trim() || !email.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Information",
        text: "Please fill in all required fields.",
        background: "#1e293b",
        color: "#f9fafb",
        confirmButtonColor: "#8B5CF6",
      });
      return;
    }

    try {
      await updateName({ body: { name: fullName } }).unwrap(); // Call your PATCH API
      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile information has been successfully saved.",
        background: "#1e293b",
        color: "#f9fafb",
        confirmButtonColor: "#8B5CF6",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating your profile.",
        background: "#1e293b",
        color: "#f9fafb",
        confirmButtonColor: "#8B5CF6",
      });
    }
  };

  if (isLoading) return <p className="text-white">Loading profile...</p>;
  if (isError) return <p className="text-red-400">Failed to load profile.</p>;

  return (
    <div className="bg-[#1e293b] p-6 rounded-lg w-full poppins">
      <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold text-white">
        <span className="text-xl text-[#8B5CF6]">
          <FaUser />
        </span>
        Profile Information
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-gray-300">Full Name</label>
          <input
            className="w-full p-2 mt-1 text-white rounded bg-slate-700"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter full name"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Email Address</label>
          <input
            className="w-full p-2 mt-1 text-[#9CA3AF] rounded-lg bg-[#0F172A]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            readOnly
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Role</label>
          <input
            className="w-full p-2 mt-1 text-[#9CA3AF] rounded-lg bg-[#0F172A]"
            value={role}
            readOnly
          />
          <p className="mt-1 text-xs text-gray-500">Permanent</p>
        </div>

        <div>
          <label className="text-sm text-gray-300">Joined Date</label>
          <input
            className="w-full p-2 mt-1 text-[#9CA3AF] rounded-lg bg-[#0F172A]"
            value={dateJoined}
            readOnly
          />
          <p className="mt-1 text-xs text-gray-500">Permanent</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 mt-4 text-white rounded-lg bg-gradient-to-r from-[#0129B3] via-[#007BCC] to-[#77D7D2] hover:opacity-90"
        >
          Save Profile Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
