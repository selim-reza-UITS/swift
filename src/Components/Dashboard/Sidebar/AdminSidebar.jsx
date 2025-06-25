import { FaSignOutAlt } from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

import { useEffect, useRef, useState } from "react";

import { HiMiniUserGroup } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import { PiClockCountdownLight } from "react-icons/pi";
const AdminSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSeetingsDropdownOpen, setSeetingsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  // console.log(user);
  const dropdownRef = useRef(null);

  const isActiveDashboard = location.pathname === "/admin";

  const isActiveUser = location.pathname.startsWith("/adminuser");
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
    <div className="bg-[#FFFFFF]  border-r-2  border-r-[#FFFFFF]  min-h-screen flex flex-col justify-between  open-sns">
      {/* Logo Section */}
      <div className="flex flex-col  py-4">
        <div className="flex px-6 items-center justify-center  pb-4 mt-9">
          {/* <img src={logo} alt="Logo" /> */}
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
                      ? "bg-[#1F762C] text-[#FFFFFF] rounded-xl"
                      : "text-[#4B5563]"
                  }`}
              >
                <PiClockCountdownLight className="w-[18px] h-[18px] font-semibold   " />{" "}
                <h1 className=" poppins font-normal   text-base">Dashboard</h1>
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
                    isActiveUser
                      ? "bg-[#1F762C] text-[#FFFFFF] rounded-xl"
                      : "text-[#4B5563]"
                  }`}
              >
                <HiMiniUserGroup className="w-[18px] h-[18px] font-semibold   " />{" "}
                <h1 className="poppins font-normal   text-base">User</h1>
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
