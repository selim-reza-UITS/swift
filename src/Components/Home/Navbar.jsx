import { useEffect, useState } from "react";
import logo from "../../assets/home.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal State

  const menuItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Resources", id: "Resources" },
    { name: "Contact us", id: "Contact us" },
  ];
  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };
  useEffect(() => {
    const handleScrollEvent = () => {
      menuItems.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            setActiveSection(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth?.user);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     try {
  //       setUser(JSON.parse(storedUser));
  //     } catch (err) {
  //       console.error("Invalid user in localStorage", err);
  //     }
  //   }
  // }, []);

  return (
    <div>
      <nav className="container p-1 mx-auto text-white bg-white rounded-full">
        <div className="container flex items-center justify-between px-6 mx-auto 2xl:py-2">
          {/*  Left: Logo */}

          <Link to={"/"}>
            <div className="flex items-center gap-2 text-xl font-extrabold md:text-xl lg:text-2xl">
              <a className="block text-teal-600" href="#">
                <img src={logo} alt="" className="w-[50px] h-[50px]" />
              </a>
            </div>
          </Link>

          {/* Center: Navigation Menu (Large Screen) */}
          <ul className="hidden lg:flex  items-center gap-20  list-none poppins  font-bold text-lg text-[#8B5CF6] ">
            {menuItems.map(({ name, id }) => (
              <li key={id}>
                <button
                  onClick={() => handleScroll(id)}
                  className={`text-lg font-bold transition-all ${
                    activeSection === id
                      ? "text-[#1E3A8A]  border-b-2 border-[#1E3A8A] "
                      : "hover:text-black"
                  }`}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>

          {/*  Right: Log In & Sign Up (Large Screen) */}
          <div className="items-center hidden gap-6 lg:flex">
            {user ? (
              <Link
                to="/dashboard"
                className="montserrat md:text-base rounded-3xl bg-gradient-to-b from-[#6366F1] via-[#4245df]  to-[#4a0653] px-3 py-2  sm:px-5 sm:py-2.5 text-sm font-medium text-white"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className=" md:text-base rounded-xl  bg-[#6366F1] hover:bg-transparent hover:text-black  border hover:border-[#5c5edf] px-3 py-2  sm:px-5 sm:py-2.5 text-sm font-medium text-white transform transition duration-300 hover:scale-105"
                >
                  Login
                </NavLink>
              </>
            )}
          </div>

          {/*  Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black lg:hidden focus:outline-none"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 8h16M4 16h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/*  Mobile Menu */}
      </nav>
      {isOpen && (
        <div className="lg:hidden h-screen   text-white bg-[#8B5CF6] text-center p-4  container mx-auto  absolute z-50">
          <ul className="flex flex-col justify-end gap-4">
            {menuItems.map(({ name, id }) => (
              <li key={id}>
                <button
                  onClick={() => {
                    handleScroll(id);
                    setIsOpen(false);
                  }}
                  className="text-lg font-medium hover:text-gray-200"
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex justify-center w-full">
              <Link
                to="/login"
                className="outfit md:text-base w-[50%] text-center items-center justify-center rounded-lg  to-[#080F24] px-3  sm:px-5 sm:py-2.5 text-sm font-medium text-white"
              >
                Get Started
              </Link>
            </div>
            {/* {user ? (
              <Link
                to="/dashboard"
                className="montserrat md:text-base px-5 py-2.5 text-sm font-medium text-[#000000]"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="montserrat md:text-base px-5 py-2.5 text-sm font-medium text-[#000000]"
                >
                  Log in
                </Link>
                <div className="flex justify-center w-full">
                  <Link
                    to="/signup"
                    className="montserrat md:text-base w-[50%] text-center items-center justify-center rounded-3xl bg-gradient-to-b from-[#00B2F7] via-[#1E3A8A] to-[#080F24] px-3 py-2 sm:px-5 sm:py-2.5 text-sm font-medium text-white"
                  >
                    Sign up
                  </Link>
                </div>
              </>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
};
export default Navbar;
