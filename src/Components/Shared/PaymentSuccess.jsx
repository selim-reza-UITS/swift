import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/loginlogo.png";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-900 via-gray-900 to-black">
      <div className="max-w-md p-10 text-center border shadow-lg bg-slate-800/60 backdrop-blur-sm border-slate-700/50 rounded-xl">
        {/* Logo */}
        <img
          src={logo}
          alt="Arviso Logo"
          className="object-contain w-24 h-24 mx-auto mb-4"
        />

        <h1 className="mb-4 text-3xl font-bold text-green-400">
          Payment Successful!
        </h1>
        <p className="mb-2 text-gray-400">
          Your payment for{" "}
          <span className="font-semibold text-white">Arviso</span> was completed
          successfully.
        </p>

        <button
          className="px-6 py-2 mt-6 text-white rounded bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
