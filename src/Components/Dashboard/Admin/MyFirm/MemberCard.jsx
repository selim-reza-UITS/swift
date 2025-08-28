import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  useDeleteCaseMutation,
  useGetManagerQuery,

} from "../../../../Redux/feature/Admin/admin";

const MemberCard = ({ data,  onView, onEdit }) => {
  const [deleteCase] = useDeleteCaseMutation();
  const [step, setStep] = useState(1);
  const [reassignOption, setReassignOption] = useState("");
  const [newManager, setNewManager] = useState("");
  const {data:managers , isLoading: managersLoading, isError: managersError} =  useGetManagerQuery();
  console.log("Managers in MemberCard:", managers);
  const handleDeleteClick = () => {
    // Step 1 popup
    Swal.fire({
      icon: "warning",
      title: "You are about to delete a user",
      text: "This action cannot be undone.",
      showCancelButton: true,
      background: "#0f172a",
        color: "#ffffff",
      confirmButtonText: "Continue to reassignment",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) setStep(2);
    });
  };

  const handleConfirm = async () => {
    if (!data?.id) return Swal.fire("Error", "User ID not found", "error");

    const payload = {
      user_id: data.id,
      reassignment_option:
        reassignOption === "Move all clients"
          ? "move_all_clients"
          : reassignOption === "Move solo clients"
          ? "move_only_solo_clients"
          : "opt_out_clients",
      new_managing_user_id: reassignOption.includes("Move") ? newManager : null,
    };

    try {
      await deleteCase(payload).unwrap(); // DELETE method call
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "User deletion flow completed.",
        background: "#0f172a",
        color: "#ffffff",
        confirmButtonColor: "#6366F1",
      });
      setStep(1);
      setReassignOption("");
      setNewManager("");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "User could not be deleted.",
        background: "#0f172a",
        color: "#ffffff",
        confirmButtonColor: "#6366F1",
      });
    }
  };

  return (
    <>
      <div className="bg-[#1e293b] p-4 rounded flex items-center justify-between poppins text-[#FFFFFF]">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white bg-purple-600 rounded-full">
            {data.image || data.name?.[0]}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{data.name}</h3>
            <p className="mt-1 mb-1 text-sm font-normal">{data.email}</p>
            <p className="text-sm font-normal">Role: {data.role}</p>
          </div>
        </div>

        <div className="flex gap-4 text-xl text-gray-400">
          <FaEye onClick={onView} className="cursor-pointer hover:text-white" />
          <FaEdit
            onClick={onEdit}
            className="cursor-pointer hover:text-white"
          />
          <FaTrash
            onClick={handleDeleteClick}
            className="cursor-pointer hover:text-red-500"
          />
        </div>
      </div>

      {/* Step 2: Reassignment form */}
      {step === 2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-[#0f172a] p-6 rounded-lg text-white w-[400px]">
            <h2 className="mb-4 text-lg font-semibold">Reassign Clients</h2>

            <div className="flex flex-col gap-3 mb-4">
              <label>
                <input
                  type="radio"
                  name="reassignOption"
                  value="Move all clients"
                  onChange={(e) => setReassignOption(e.target.value)}
                />{" "}
                Move ALL clients to another manager
              </label>
              <label>
                <input
                  type="radio"
                  name="reassignOption"
                  value="Move solo clients"
                  onChange={(e) => setReassignOption(e.target.value)}
                />{" "}
                Move only the clients this user managed alone
              </label>
              {/* <label>
                <input
                  type="radio"
                  name="reassignOption"
                  value="Keep co-managed"
                  onChange={(e) => setReassignOption(e.target.value)}
                />{" "}
                Co-managed clients keep other manager; remove this user
              </label> */}
              <label>
                <input
                  type="radio"
                  name="reassignOption"
                  value="Opt-out solo clients"
                  onChange={(e) => setReassignOption(e.target.value)}
                />{" "}
                Opt-out the clients this user managed alone
              </label>
            </div>

            {/* Only show new manager dropdown if Move option */}
            {reassignOption.includes("Move") && (
              <select
                value={newManager}
                onChange={(e) => setNewManager(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#1e293b]"
              >
                <option value="">Select new manager</option>
                {managers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setStep(1);
                  setReassignOption("");
                  setNewManager("");
                }}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
                disabled={
                  !reassignOption ||
                  (reassignOption.includes("Move") && !newManager)
                }
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MemberCard;
