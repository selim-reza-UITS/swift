import { NavLink } from "react-router-dom";
import error from "./assets/error.png";

const Error = () => {
  return (
    <div className="relative min-h-screen bg-black montserrat">
      <NavLink
        to="/"
        className="absolute flex items-center gap-2 text-xl text-white top-5 left-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        Back To Home
      </NavLink>

      <div className="flex flex-col items-center justify-center w-2/3 p-4 mx-auto ">
        <img src={error} alt="404 error" />
        <h1 className="text-4xl font-bold text-white">404 - Page Not Found</h1>
      </div>
    </div>
  );
};

export default Error;
