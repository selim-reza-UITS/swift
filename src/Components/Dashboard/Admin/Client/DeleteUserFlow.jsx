import React, { useState } from "react";
import Swal from "sweetalert2";

const DeleteUserFlow = ({ user, managers = [], onDelete }) => {
  const [step, setStep] = useState(1);
  const [reassignOption, setReassignOption] = useState("");
  const [newManager, setNewManager] = useState("");

  const handleDeleteClick = () => {
    Swal.fire({
      icon: "warning",
      title: "You are about to delete a user",
      text: "This action cannot be undone.",
      showCancelButton: true,
      confirmButtonText: "Continue to reassignment",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setStep(2); // move to reassignment step
      }
    });
  };

  const handleConfirm = () => {
    if (!user?.id) {
      Swal.fire("Error", "User ID not found", "error");
      return;
    }

    const payload = {
      option: reassignOption,
      newManager: reassignOption.includes("Move") ? newManager : null,
    };

    // Call the onDelete function passed as prop
    onDelete(user.id, payload)
      .then(() => {
        Swal.fire("Deleted!", "User deletion flow completed.", "success");
        setStep(1);
        setReassignOption("");
        setNewManager("");
      })
      .catch(() => {
        Swal.fire("Error", "User could not be deleted.", "error");
      });
  };

  return (
    <div>
      {/* Trigger button */}
      <button
        onClick={handleDeleteClick}
        className="text-red-500 hover:text-red-700"
      >
        Delete User
      </button>

      {/* Step 2: Reassignment Form */}
      {step === 2 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
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
              <label>
                <input
                  type="radio"
                  name="reassignOption"
                  value="Keep co-managed"
                  onChange={(e) => setReassignOption(e.target.value)}
                />{" "}
                Co-managed clients keep other manager; remove this user
              </label>
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

            {/* Show new manager dropdown only if Move option is selected */}
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
