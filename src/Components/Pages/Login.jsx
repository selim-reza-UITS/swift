import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // 👈 Import eye icons
import loginImage from "../../assets/loginpage.png";
import loginPage from "../../assets/login-banner.png";
import logo from "../../assets/loginlogo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Redux/feature/auth/authSlice";
import toast from "react-hot-toast";
import { useLoginMutation } from "../../Redux/api/authapi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 New state
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password }).unwrap();
      console.log("Login response:", response);

      let role = "";

      if (response?.data?.role === "Super Admin") {
        role = "superadmin";
      } else if (response?.data?.role === "Admin") {
        role = "admin";
      } else if (response?.data?.role === "Case Manager") {
        role = "CaseManager";
      } else if (response?.data?.role === "Intake Specialist") {
        role = "IntekSpecialist";
      } else {
        setMessage("Invalid role. Please contact administrator.");
        return;
      }

      // Redux dispatch
      dispatch(
        setCredentials({
          access: response.access_token,
          refresh: response.refresh_token,
          user: {
            name: response.data.name,
            email: email,
            role: role,
            id: response.data.id,
          },
          profilePicture: response.data.profilePicture || null,
        })
      );

      // LocalStorage persist (optional)
      localStorage.setItem("userRole", role);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem(
        "profilePicture",
        response.data.profilePicture || ""
      );

      setMessage(`Logged in as ${role}`);
      
      navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      toast.error(error?.data?.detail[0] || "Login failed.");
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <div
      className="h-auto p-4 bg-center bg-cover"
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      <div className="relative flex items-center justify-start min-h-screen mx-auto containmer">
        <div
          className="rounded-lg p-10 w-full max-w-2xl shadow-2xl h-[800px] bg-center bg-cover justify-center items-center ml-12"
          style={{ backgroundImage: `url(${loginPage})` }}
        >
          <div className="flex flex-col justify-center w-full h-full">
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center gap-4 mb-4 text-xl font-extrabold md:text-2xl lg:text-6xl">
              <Link to="/">
                  <img src={logo} alt="" />
                </Link>
                {/* <h1 className="text-white poppins">Arviso</h1> */}
              </div>
              <p className="text-4xl font-bold poppins bg-gradient-to-r from-[#6366F1] to-[#06B6D4] bg-clip-text text-transparent">
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
                  disabled={isLoading}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-[#95016D] via-[#7601C1] to-[#0124B6] text-white font-bold hover:opacity-90 transition outfit disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Logging in..." : "Log In"}
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
