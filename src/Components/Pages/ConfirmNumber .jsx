import React, { useState } from "react";
import { useSubmitConsentMutation } from "../../Redux/feature/Shared/Share";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ConfirmNumber = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    lawFirm: "",
  });
  const [updates, setUpdates] = useState(false);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [submitConsent, { isLoading, isSuccess, isError }] =
    useSubmitConsentMutation();
  // Phone formatter
  const handlePhoneChange = (e) => {
    const raw = e.target.value || "";
    const digits = raw.replace(/\D/g, "").slice(0, 10);
    let formatted = "";
    if (digits.length === 0) {
      formatted = "";
    } else if (digits.length < 4) {
      formatted = `(${digits}`;
    } else if (digits.length < 7) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(
        6,
        10
      )}`;
    }
    setFormData((prev) => ({ ...prev, phoneNumber: formatted }));
  };

  const validatePhone = (value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length === 10;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePhone(formData.phoneNumber)) {
      setError("Enter a valid 10-digit US number.");
      return;
    }
    setError("");
    const digits = formData.phoneNumber.replace(/\D/g, "");
    const payload = {
      phone_number: `+1${digits}`, // USA format (+1)
      law_firm_name: formData.lawFirm,
      language: "English", // fix for now
      consent_checkbox: consent,
      health_data_checkbox: updates,
    };

    try {
      await submitConsent(payload).unwrap();
      toast.success("✅ Consent submitted successfully!");
    } catch (err) {
      console.error("Submit failed:", err);
      toast.error("❌ Failed to submit consent");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-[#1a1a1a] text-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="mb-6 text-xl font-semibold">Confirm Your Number</h2>
        <p className="mb-6 text-sm text-gray-400">
          One last check, then we’ll send your case updates by text.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Phone Number */}
          <div>
            <label className="block mb-2 text-sm">📞 Phone number</label>
            <input
              type="text"
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              placeholder="(555) 523-423"
              className="w-full px-4 py-3 rounded-lg bg-[#111] border border-gray-700 focus:border-purple-500 outline-none"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>

          {/* Law Firm */}
          <div>
            <label className="block mb-2 text-sm">🏛 Law firm</label>
            <input
              type="text"
              value={formData.lawFirm}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, lawFirm: e.target.value }))
              }
              placeholder="Incident voluptate"
              className="w-full px-4 py-3 rounded-lg bg-[#111] border border-gray-700 focus:border-purple-500 outline-none"
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-3 text-sm">
            <label className="flex items-start space-x-2">
              <input
                type="checkbox"
                checked={updates}
                onChange={() => setUpdates(!updates)}
                className="mt-1"
              />
              <span>
                Yes, send case updates by text to{" "}
                {formData.phoneNumber || "(555) 523-423"}.
                <br />
                <span className="text-gray-400">
                  Msg frequency varies. Texting fees may apply. Reply “STOP” to
                  quit.
                </span>
              </span>
            </label>

            <label className="flex items-start space-x-2">
              <input
                type="checkbox"
                checked={consent}
                onChange={() => setConsent(!consent)}
                className="mt-1"
              />
              <span>
                I agree that Arviso may collect and use my injury info to
                provide these updates.
              </span>
            </label>

            {/* Notices */}
            <div className="space-y-1 text-purple-400 underline">
              <p>
                <a href="#">Washington Health-Data Notice</a>
              </p>
              <p>
                Delete-My-Data (WA):{" "}
                <a href="mailto:Hello@Arviso.ai">Hello@Arviso.ai</a>
              </p>
              <p>
                <a href="#">California Privacy Notice</a>
              </p>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={!consent}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              consent
                ? "bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90"
                : "bg-gray-700 cursor-not-allowed"
            }`}
          >
            Agree & Sign Up
          </button>

          {/* Footer Note */}
          <p className="mt-3 text-xs text-gray-400">
            By tapping Agree, you give express written consent to receive
            automated informational texts from your law firm via Arviso. Consent
            not required to receive legal services.
          </p>
        </form>

        <div className="mt-6 text-xs text-center text-gray-400">
          Your consent is recorded with timestamp and device info. You can opt
          out at any time by replying STOP.
        </div>
      </div>
    </div>
  );
};

export default ConfirmNumber;
