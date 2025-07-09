import React, { useEffect, useState } from "react";

import banner from "../../assets/banner-right.png";
import { NavLink } from "react-router-dom";
import { Slide } from "react-awesome-reveal";
import first from "../../assets/1st.png";
import second from "../../assets/2nd.png";
import third from "../../assets/3rd.png";

const messagesTop = [
  "Awesome! When can I expect?",
  "Thanks for the update! What's next?",
  "Perfect! How long will this take?",
];

const messagesBottom = [
  "Great news! When should I check back?",
  "Excellent! What's the timeline?",
  "Wonderful! When will you know more?",
];


const Banner = () => {
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [topAnimationState, setTopAnimationState] = useState("hidden");
  const [bottomAnimationState, setBottomAnimationState] = useState("hidden");
    

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setTopAnimationState("entering");
      setTimeout(() => setTopAnimationState("center"), 1500);
    }, 0);
  
    const interval = setInterval(() => {
      setTopAnimationState("exiting");
      setTimeout(() => {
        setTopIndex((prev) => (prev + 1) % messagesTop.length);
        setTopAnimationState("entering");
        setTimeout(() => setTopAnimationState("center"), 1500);
      }, 1500);
    }, 6000);
  
    return () => {
      clearInterval(interval);
      clearTimeout(startTimeout);
    };
  }, []);
  
  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setBottomAnimationState("entering");
      setTimeout(() => setBottomAnimationState("center"), 1500);
    }, 500);
  
    const interval = setInterval(() => {
      setBottomAnimationState("exiting");
      setTimeout(() => {
        setBottomIndex((prev) => (prev + 1) % messagesBottom.length);
        setBottomAnimationState("entering");
        setTimeout(() => setBottomAnimationState("center"), 1500);
      }, 1500);
    }, 6000);
  
    return () => {
      clearInterval(interval);
      clearTimeout(startTimeout);
    };
  }, []);
  

  const getAnimationClasses = (state) => {
    switch (state) {
      case "entering":
        return "translate-y-12 opacity-0 scale-100";
      case "center":
        return "translate-y-0 opacity-100 scale-100";
      case "exiting":
        return "-translate-y-12 opacity-0 scale-100";
      case "hidden":
      default:
        return "translate-y-12 opacity-0 scale-100";
    }
  };
  

  return (
    <div>
      <div className="relative w-full max-w-4xl mt-10">
        <div className="relative left-50 max-w-xs">
          {/* Smooth sliding message card */}
          <div className="relative w-full max-w-4xl">
            <div className="relative left-60 max-w-xs">
              <div
                className={`transition-all duration-[1500ms] ease-in-out transform ${getAnimationClasses(topAnimationState)}`}
              >
                <div className="bg-[#4B5563] text-slate-300 px-4 py-2 rounded-t-3xl rounded-br-3xl rounded-bl-md shadow-lg">
                  <p className="leading-relaxed">{messagesTop[topIndex]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col-reverse items-center lg:items-center justify-between gap-10 container mx-auto">
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
      </div>
      <div className="relative w-full right-0 mb-10">
        <div className="absolute w-full right-60 max-w-xs">
          {/* Smooth sliding message card */}
          <div className="relative w-full max-w-4xl">
            <div className="relative right-0 max-w-xs">
              <div
                className={`transition-all duration-[1500ms] ease-in-out transform ${getAnimationClasses(bottomAnimationState)}`}
              >
                <div className="bg-[#06B6D4] text-white px-4 py-2 rounded-t-3xl rounded-br-3xl rounded-bl-md shadow-lg">
                  <p className="leading-relaxed">{messagesBottom[bottomIndex]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-20 container mx-auto">
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
