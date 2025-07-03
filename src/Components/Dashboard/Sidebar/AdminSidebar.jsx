import { FaSignOutAlt } from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { VscGraphLine } from "react-icons/vsc";
import { useEffect, useRef, useState } from "react";
import logo from "../../../assets/logo.png";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import { PiClockCountdownLight } from "react-icons/pi";
const AdminSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSeetingsDropdownOpen, setSeetingsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  // console.log(user);
  const dropdownRef = useRef(null);

  const isActiveDashboard = location.pathname === "/dashboard/admin";

  const   isActiveClient = location.pathname.startsWith( "/dashboard/client");
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener for click outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Remove token from localStorage
    navigate("/login", { replace: true }); // Redirect to login page
  };
  const toggleDropdownSettings = () => setSeetingsDropdownOpen((prev) => !prev);
  return (
    <div className="bg-[#161E2F]  border-r-2  border-r-[#161E2F]  min-h-screen flex flex-col justify-between  open-sns">
      {/* Logo Section */}
      <div className="flex flex-col  py-4">
        <div className="text-xl md:text-xl lg:text-2xl font-extrabold flex items-center gap-2 justify-center w-full mt-9">
          <a className="block text-teal-600" href="#">
            <img src={logo} alt="" className="" />
          </a>
          <h1 className=" text-white text-3xl">Arviso</h1>
        </div>
        {/* Menu Items */}
        <nav className="flex flex-col  text-[#364636] mt-9">
          <NavLink
            to="/dashboard/admin"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2 ">
              {/* Left Indicator Bar */}

              {/* Main Button Area */}
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-centter
                  ${
                    isActiveDashboard
                      ? "bg-[#FFFFFF] text-black rounded-xl"
                      : "text-[#9CA3AF]"
                  }`}
              >
                <VscGraphLine className="w-[22px] h-[22px] font-bold   " />{" "}
                <h1 className=" poppins font-bold    text-xl">Dashboard</h1>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="/adminuser"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2">
              {/* Left Indicator Bar */}

              {/* Main Button Area */}
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-center
                  ${
                    isActiveClient
                      ? "bg-[#FFFFFF] text-black rounded-xl"
                      : "text-[#9CA3AF]"
                  }`}
              >
                <HiMiniUserGroup className="w-[22px] h-[22px] font-bold  " />{" "}
                <h1 className="poppins font-normal   text-base">Client</h1>
              </div>
            </div>
          </NavLink>
        </nav>
      </div>

      {/* Logout */}
      <div
        onClick={handleLogout}
        className="flex items-center space-x-3 p-2 text-red-500 cursor-pointer rounded-lg pb-10 pl-10"
      >
        <FaSignOutAlt />
        <span>Log Out</span>
      </div>
    </div>
  );
};

export default AdminSidebar;
