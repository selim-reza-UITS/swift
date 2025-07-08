import React, { useEffect, useState } from "react";

import banner from "../../assets/banner-right.png";
import { NavLink } from "react-router-dom";
import { Slide } from "react-awesome-reveal";
import first from "../../assets/1st.png";
import second from "../../assets/2nd.png";
import third from "../../assets/3rd.png";

const messages = [
  "Awesome! When can I expect?",
  "Thanks for the update! What's next?",
  "Perfect! How long will this take?",
  "Great news! When should I check back?",
  "Excellent! What's the timeline?",
  "Wonderful! When will you know more?",
];
const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
        setIsAnimating(false);
      }, 1000);
    }, 3500);

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <div className="relative w-full max-w-4xl h-16">
        <div className="relative left-60 max-w-xs">
          {/* Card slides from top to settled position */}
          <div
            className={`transition-all duration-800 ease-out ${
              isAnimating
                ? "transform -translate-y-20 opacity-0"
                : "transform translate-y-16 opacity-100"
            }`}
          >
            <div className="bg-slate-700 text-slate-300 px-4 py-2 rounded-t-3xl rounded-br-3xl rounded-bl-md shadow-lg">
              <p className="leading-relaxed">{messages[currentIndex]}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col-reverse items-center lg:items-center justify-between gap-10 container mx-auto mt-10">
        {/*  content  */}
        <Slide
          direction="left"
          triggerOnce
          className="flex flex-col items-center lg:items-start  gap-6 lg:w-2/3 w-full"
        >
          <div>
            <h1 className="poppins text-3xl lg:text-6xl  font-bold  mt-2 mb-5 text-[#4B5563] leading-normal  ">
              AI-Powered{" "}
              <span className="bg-gradient-to-r from-[#C084FC] to-[#06B6D4] bg-clip-text text-transparent">
                Communication
              </span>{" "}
              <br />
            </h1>
            <h1 className="poppins text-3xl lg:text-6xl  font-bold  mt-2 mb-6 text-[#4B5563] ">
              {" "}
              <span className="text-[#4B5563] mt-3 ">for Law Firms</span>
            </h1>
            <p className="poppins text-lg lg:text-[32px] text-[#4B5563] font-normal  mt-9 leading-normal  ">
              Human-like AI keeps every client informed and cared for. Slash
              double-digit hours of follow-ups to a 5-minute glance..
            </p>
            <NavLink to="/Signup">
              <div className="mt-9">
                <button className="poppins md:text-base text-center items-center justify-center rounded-lg hover:bg-none hover:text-black border hover:border-[#0129B3]  bg-gradient-to-r from-[#0129B3] via-[#007BCC] to-[#77D7D2] px-3 py-2 sm:px-5 sm:py-2.5 text-sm font-medium text-white transform transition duration-300 ease-in-out hover:scale-105">
                  Apply For Early Access
                </button>
              </div>
            </NavLink>
          </div>
        </Slide>
        {/* img */}
        <Slide className="lg:w-1/3 w-full " direction="right" triggerOnce>
          <div>
            <img src={banner} alt="banner" />
          </div>
        </Slide>
        {/* img */}
      </div>
      <div className=" mt-10 container   mx-auto">
        <div className="flex flex-col lg:flex-row items-center  gap-10 w-1/2 mx-auto ">
          <img src={first} alt="illustration" className="" />
          <img src={second} alt="illustration" className="" />
          <img src={third} alt="illustration" className="" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
