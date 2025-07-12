import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // 👈 Import eye icons
import loginImage from "../../assets/loginpage.png";
import login from "../../assets/login-banner.png";
import logo from "../../assets/loginlogo.png";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 New state
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let role = "";

    if (email === "admin@gmail.com") {
      role = "admin";
    } else if (email === "superadmin@gmail.com") {
      role = "superadmin";
    } else if (email === "case@gmail.com") {
      role = "CaseManager";
    } else if (email === "intek@gmail.com") {
      role = "IntekSpecialist";
    } else {
      setMessage("Invalid email. Try admin@gmail.com or user@gmail.com");
      return;
    }

    localStorage.setItem("userRole", role);
    localStorage.setItem("userEmail", email);
    setMessage(`Logged in as ${role}`);
    navigate("/dashboard");
  };

  return (
    <div
      className="h-auto p-4 bg-center bg-cover"
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      <div className="relative flex items-center justify-start min-h-screen mx-auto containmer">
        <div
          className="rounded-lg p-10 w-full max-w-2xl shadow-2xl h-[800px] bg-center bg-cover justify-center items-center ml-12"
          style={{ backgroundImage: `url(${login})` }}
        >
          <div className="flex flex-col justify-center w-full h-full">
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center gap-4 mb-4 text-xl font-extrabold md:text-2xl lg:text-6xl">
                <a className="block text-teal-600" href="#">
                  <img src={logo} alt="" />
                </a>
                <h1 className="text-black poppins">Arviso</h1>
              </div>
              <p className="text-4xl font-bold text-blue-400 poppins">
                Log in to your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[#979797] text-base mb-1 outfit">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-white/20 text-black placeholder-[#979797] focus:outline-none focus:ring-2 focus:ring-blue-400 border border-[#979797] outfit"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-[#979797] text-base mb-1 outfit">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-white/20 text-black placeholder-[#979797] focus:outline-none focus:ring-2 focus:ring-blue-400 border border-[#979797] outfit pr-10"
                    placeholder="Enter your password"
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-xl text-[#979797] cursor-pointer"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>
              </div>

              <NavLink to="/forgot">
                <div className="flex justify-between text-base text-[#7C3AED] outfit">
                  <span></span>
                  <span className="cursor-pointer hover:underline">
                    Forgot Password?
                  </span>
                </div>
              </NavLink>

              <div className="w-1/2 mx-auto">
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-[#95016D] via-[#7601C1] to-[#0124B6] text-white font-bold hover:opacity-90 transition outfit"
                >
                  Log In
                </button>
              </div>
            </form>

            {message && (
              <p className="mt-4 text-sm text-center text-green-400">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
