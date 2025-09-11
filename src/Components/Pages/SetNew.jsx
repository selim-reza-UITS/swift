import { useEffect, useState } from "react";
import loginImage from "../../assets/loginpage.png";
import login from "../../assets/login-banner.png";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import logo from "../../assets/loginlogo.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Make sure you are using React Router

const SetNew = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // For redirecting to login

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      Swal.fire({
        icon: "success",
        title: "Password Reset Successful!",
        text: "You can now log in with your new password.",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/login"); // Redirect to login page
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match!",
        text: "Please make sure both fields are the same.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div
      className="h-auto p-4 bg-center bg-cover"
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      <div className="container relative flex items-center justify-start min-h-screen mx-auto">
        <div
          className="rounded-lg p-10 w-full max-w-2xl shadow-2xl h-[800px] bg-center bg-cover justify-center items-center ml-12"
          style={{ backgroundImage: `url(${login})` }}
        >
          <div className="flex flex-col justify-center w-full h-full">
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center gap-4 mb-4 text-xl font-extrabold md:text-2xl lg:text-6xl">
                <a className="block text-teal-600" href="#">
                  <img src={logo} alt="Logo"  className="w-[65px] h-[65px]"/>
                </a>
        
              </div>
              <p className="text-4xl font-bold text-blue-400 poppins">
                Reset Your Password
              </p>
              <p className="text-[#54657E] w-2/3 mt-2 text-base poppins font-normal">
                Please enter your new password and confirm it below to complete the password reset.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center mb-8"
            >
              {/* New Password */}
              <div className="w-full">
                <label className="block text-[#979797] text-base mb-2 outfit">
                  Set Password 
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Set Password"
                    className="w-full px-4 py-2 rounded-md bg-white/20 text-black placeholder-[#979797] focus:outline-none focus:ring-2 focus:ring-blue-400 border border-[#979797] outfit"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[22%] text-[#575757]"
                  >
                    {showPassword ? (
                      <FaRegEyeSlash className="w-[24px] h-[24px]" />
                    ) : (
                      <IoEyeOutline className="w-[24px] h-[24px]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="w-full mb-6 mt-9">
                <label className="block text-[#979797] text-base mb-2 outfit">
                  Confirm Password 
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full px-4 py-2 rounded-md bg-white/20 text-black placeholder-[#979797] focus:outline-none focus:ring-2 focus:ring-blue-400 border border-[#979797] outfit"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-[22%] text-[#575757]"
                  >
                    {showConfirmPassword ? (
                      <FaRegEyeSlash className="w-[24px] h-[24px]" />
                    ) : (
                      <IoEyeOutline className="w-[24px] h-[24px]" />
                    )}
                  </button>
                </div>

                {/* Submit Button */}
                <div className="w-1/2 mx-auto mt-6">
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-[#95016D] via-[#7601C1] to-[#0124B6] text-white font-bold hover:opacity-90 transition outfit"
                  >
                    Set Password
                  </button>
                </div>
              </div>

              {/* Optional error message (for fallback) */}
              {errorMessage && (
                <p className="mb-4 text-sm text-center text-red-500">
                  {errorMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetNew;
