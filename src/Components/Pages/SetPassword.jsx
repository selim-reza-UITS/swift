import React, { useState } from "react";
import logo from "../../assets/loginlogo.png";
import { useSetPasswordMutation } from "../../Redux/feature/auth/authapi";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function SetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const [setPassword, { isLoading }] = useSetPasswordMutation();

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!params.uuid || !params.token) {
      toast.error("Invalid reset link. Please check your email.");
      return;
    }
    console.log("neeeee");
    try {
      const response = await setPassword({
        password: newPassword,
        uuid: params.uuid,
        token: params.token,
      });
      // if (response?.error) {
      //   toast.error(response?.error?.data?.password[0]);
      // }
      console.log(response);
      if (response.data) {
        toast.success("Password set successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Set password error:", error);
      toast.error("Failed to set password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="" />
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-white mb-2">
              Set Your Password
            </h1>
            <p className="text-slate-400 text-sm">
              Secure your account to continue
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              Set Password
            </button>
          </div>

          {/* Footer text */}
          <p className="text-center text-slate-400 text-xs mt-6">
            If you didn't request this, you can ignore this page.
          </p>
        </div>
      </div>
    </div>
  );
}
