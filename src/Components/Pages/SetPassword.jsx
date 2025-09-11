/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import logo from "../../assets/loginlogo.png";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useSetPasswordMutation } from "../../Redux/api/authapi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function SetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const params = useParams();
  const navigate = useNavigate();
  const [setPassword, { isLoading }] = useSetPasswordMutation();

  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async () => {
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!params.uuid || !params.token) {
      toast.error("Invalid reset link. Please check your email.");
      return;
    }

    try {
      const response = await setPassword({
        password: newPassword,
        uuid: params.uuid,
        token: params.token,
      });

      if (response.data) {
        toast.success("Password set successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Set password error:", error);
      toast.error("Failed to set password. Please try again.");
    }
  };

  const renderPasswordField = (
    label,
    value,
    setValue,
    showField,
    fieldName
  ) => (
    <div className="relative">
      <label className="block mb-2 text-sm font-medium text-white">
        {label}
      </label>
      <input
        type={showField ? "text" : "password"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="w-full px-4 py-3 pr-10 text-white transition-all duration-200 border rounded-lg bg-slate-700/50 border-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <span
        className="absolute -translate-y-1/2 cursor-pointer right-3 top-[65%] text-white/70"
        onClick={() => toggleShowPassword(fieldName)}
      >
        {showField ? <IoEyeOffOutline /> : <IoEyeOutline />}
      </span>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
      <div className="w-full max-w-md">
        <div className="p-8 border bg-slate-800/60 backdrop-blur-sm rounded-2xl border-slate-700/50">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="" className="w-[100px] h-[100px]"/>
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-semibold text-white">
              Set Your Password
            </h1>
            <p className="text-sm text-slate-400">
              Secure your account to continue
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {renderPasswordField(
              "New Password",
              newPassword,
              setNewPassword,
              showPassword.newPassword,
              "newPassword"
            )}
            {renderPasswordField(
              "Confirm Password",
              confirmPassword,
              setConfirmPassword,
              showPassword.confirmPassword,
              "confirmPassword"
            )}

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              {isLoading ? "Setting..." : "Set Password"}
            </button>
          </div>

          {/* Footer text */}
          <p className="mt-6 text-xs text-center text-slate-400">
            If you didn't request this, you can ignore this page.
          </p>
        </div>
      </div>
    </div>
  );
}
