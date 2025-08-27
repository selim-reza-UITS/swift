import React, { useState } from "react";
import Swal from "sweetalert2";

const DeleteUserFlow = ({ user, managers = [], onDelete }) => {
  const [step, setStep] = useState(1);
  const [reassignOption, setReassignOption] = useState("");
  const [newManager, setNewManager] = useState("");
  const fakeUser = {
    id: "u123",
    name: "John Doe",
  };

  const fakeManagers = [
    { id: "m1", name: "Alice Johnson" },
    { id: "m2", name: "Bob Smith" },
    { id: "m3", name: "Charlie Brown" },
  ];
const  managers = fakeManagers;
const user = fakeUser;
  const handleDeleteClick = () => {
    Swal.fire({
      icon: "warning",
      title: "You are about to delete a user",
      text: "This action cannot be undone.",
      showCancelButton: true,
      confirmButtonText: "Continue to reassignment",
      cancelButtonText: "Cancel",
      background: "#0f172a",
      color: "#ffffff",
      confirmButtonColor: "#6366F1",
      cancelButtonColor: "#6B7280",
    }).then((result) => {
      if (result.isConfirmed) {
        setStep(2);
      }
    });
  };

  const handleConfirm = () => {
    if (!user?.id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "User ID not found",
        background: "#0f172a",
        color: "#ffffff",
        confirmButtonColor: "#6366F1",
      });
      return;
    }

    const payload = {
      option: reassignOption,
      newManager: reassignOption.includes("Move") ? newManager : null,
    };

    onDelete(user.id, payload)
      .then(() => {
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
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "User could not be deleted.",
          background: "#0f172a",
          color: "#ffffff",
          confirmButtonColor: "#6366F1",
        });
      });
  };

  return (
    <div>
      {/* Trigger Button */}
      <button
        onClick={handleDeleteClick}
        className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-500"
      >
        Delete User
      </button>

      {/* Step 2: Reassignment Form */}
      {step === 2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-[#0f172a] w-full max-w-md p-6 rounded-lg shadow-lg text-white">
            <h2 className="mb-4 text-xl font-semibold text-center">
              Reassign Clients
            </h2>

            <div className="flex flex-col gap-3 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="reassignOption"
                  value="Move all clients"
                  onChange={(e) => setReassignOption(e.target.value)}
                  className="accent-blue-500"
                />
                Move ALL clients to another manager
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="reassignOption"
                  value="Move solo clients"
                  onChange={(e) => setReassignOption(e.target.value)}
                  className="accent-blue-500"
                />
                Move only the clients this user managed alone
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="reassignOption"
                  value="Keep co-managed"
                  onChange={(e) => setReassignOption(e.target.value)}
                  className="accent-blue-500"
                />
                Co-managed clients keep other manager; remove this user
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="reassignOption"
                  value="Opt-out solo clients"
                  onChange={(e) => setReassignOption(e.target.value)}
                  className="accent-blue-500"
                />
                Opt-out the clients this user managed alone
              </label>
            </div>

            {/* Show new manager dropdown only if Move option is selected */}
            {reassignOption.includes("Move") && (
              <select
                value={newManager}
                onChange={(e) => setNewManager(e.target.value)}
                className="w-full p-2 rounded bg-[#1e293b] text-white border border-gray-600"
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
                onClick={() => setStep(1)}
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
    </div>
  );
};

export default DeleteUserFlow;
