import { useState } from "react";
import loginImage from "../../assets/loginpage.png";
import login from "../../assets/login-banner.png"; // Assuming you have a login image
import logo from "../../assets/loginlogo.png";
import { NavLink } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let role = "";

    if (email === "admin@gmail.com") {
      role = "Admin";
    } else if (email === "user@gmail.com") {
      role = "User";
    } else {
      setMessage("Invalid email. Try admin@gmail.com or user@gmail.com");
      return;
    }

    localStorage.setItem("userRole", role);
    localStorage.setItem("userEmail", email);

    setMessage(`Logged in as ${role}`);
  };

  return (
    <div
      className="h-auto bg-center bg-cover   p-4 "
      style={{ backgroundImage: `url(${loginImage})` }}
    >
      <div className="flex items-center justify-start min-h-screen  relative containmer mx-auto">
        <div
          className=" rounded-lg p-10 w-full max-w-2xl shadow-2xl h-[800px] bg-center bg-cover  justify-center items-center ml-12  "
          style={{ backgroundImage: `url(${login})` }}
        >
          <div className="h-full flex flex-col justify-center  w-full">
            {" "}
            <div className="flex flex-col items-center mb-8">
              <div className="text-xl md:text-2xl lg:text-6xl font-extrabold flex items-center gap-4 mb-4">
                <a className="block text-teal-600" href="#">
                  <img src={logo} alt="" className="" />
                </a>
                <h1 className=" text-black  poppins">Arviso</h1>
              </div>
              <p className="text-blue-400 text-4xl poppin font-bold  poppins">
                Create an account
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[#979797] text-base mb-1 outfit">
                  Email :
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
                <label className="block text-[#979797]  text-base mb-1 outfit">
                  Password :
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-white/20 text-black placeholder-[#979797] focus:outline-none focus:ring-2 focus:ring-blue-400 border border-[#979797] outfit"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <NavLink to="/forgot">
                <div className="flex justify-between text-base text-[#7C3AED] outfit">
                  <span></span>
                  <a href="#" className="hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </NavLink>
              <div className="w-1/2 mx-auto ">
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-[#95016D]  via-[#7601C1] to-[#0124B6] text-white font-bold hover:opacity-90 transition outfit"
                >
                  Log In
                </button>
              </div>
            </form>
            {message && (
              <p className="mt-4 text-center text-green-400 text-sm">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
