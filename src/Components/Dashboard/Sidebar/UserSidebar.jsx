import { FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { MdElectricBolt } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { PiChefHatBold } from "react-icons/pi";
import { PiCookingPotFill } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { SlHome } from "react-icons/sl";

import { AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { PiChefHatFill } from "react-icons/pi";
import { HiDocumentText } from "react-icons/hi2";
const UserSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSeetingsDropdownOpen, setSeetingsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  // console.log(user);
  const dropdownRef = useRef(null);

  const isActiveDashboard = location.pathname === "/";
  const isActiveSubscription = location.pathname === "/subscription";
  const isActiveRecipe = location.pathname === "/recipe";
  const isActiveChef = location.pathname === "/chef";
  const isActiveSettings =
    location.pathname.startsWith("/terms") ||
    location.pathname.startsWith("/privacy");
  const isActiveUser = location.pathname.startsWith("/user");
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
            to="/"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2 ">
              {/* Left Indicator Bar */}

              {/* Main Button Area */}
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-centfer
                  ${
                    isActiveDashboard
                      ? "bg-[#012241] text-white rounded-full"
                      : "text-[#B1B1B1]"
                  }`}
              >
                <AiFillHome className="w-[18px] h-[18px] font-semibold   " />{" "}
                <h1 className="montserrat font-semibold   text-base">
                  Dashboard
                </h1>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="/user"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2">
              {/* Left Indicator Bar */}

              {/* Main Button Area */}
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-centfer
                  ${
                    isActiveUser
                      ? "bg-[#012241] text-white rounded-full"
                      : "text-[#B1B1B1]"
                  }`}
              >
                <FaUser className="w-[18px] h-[18px] font-semibold   " />{" "}
                <h1 className="montserrat font-semibold   text-base">User</h1>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="/recipe"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2 ">
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-centfer
                  ${
                    isActiveRecipe
                      ? "bg-[#012241] text-white rounded-full"
                      : "text-[#B1B1B1]"
                  }`}
              >
                <PiCookingPotFill className="w-[18px] h-[18px] font-semibold   " />{" "}
                <h1 className="montserrat font-semibold   text-base">
                  Recipes
                </h1>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="/chef"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2">
              {/* Left Indicator Bar */}

              {/* Main Button Area */}
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-centfer
                  ${
                    isActiveChef
                      ? "bg-[#012241] text-white rounded-full"
                      : "text-[#B1B1B1]"
                  }`}
              >
                <PiChefHatBold className="w-[18px] h-[18px] font-semibold   " />{" "}
                <h1 className="montserrat font-semibold   text-base">Chef</h1>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="/subscription"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-semibold  p-2">
              {/* Left Indicator Bar */}

              {/* Main Button Area */}
              <div
                className={`flex items-center space-x-2 justify-start gap-2 w-[250px] h-[50px]  p-5 text-centfer
                  ${
                    isActiveSubscription
                      ? "bg-[#012241] text-white rounded-full"
                      : "text-[#B1B1B1]"
                  }`}
              >
                <HiDocumentText className="w-[18px] h-[18px] font-semibold   " />{" "}
                <h1 className="montserrat font-semibold   text-base">
                  Subscription
                </h1>
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

export default UserSidebar;
