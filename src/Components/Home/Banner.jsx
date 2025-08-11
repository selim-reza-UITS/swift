import React, { useEffect, useState } from "react";
import banner from "../../assets/banner-right.png";
import { Link } from "react-router-dom";
import { Slide } from "react-awesome-reveal";

const messagesTop = [

   "Hey Taylor! Just checking in—how’s the pain level this week on a scale of 1‑10?",
  
      
  
  "Got it. Have you been able to keep up with the physical‑therapy exercises?",
  
      
  
  "No worries. Consistency speeds recovery; I’ll remind you tomorrow at 7 PM if that helps.",
  
  "Anything new we should relay to your case manager?",
  
  
  "Perfect move, I’ve alerted Jenna (your case manager). Expect a call from her soon.",
  
  
  // Conversation 2:
  
  
  //      Client: I just got a $480 bill from the ER.
  //                   I Thought the other driver’s insurance
  //                   was covering that—should I pay it?
  
  // Ai: Thanks for letting me know. I’ve notified Jenna, your case manager, so she can review it first thing tomorrow.
  
  // Ai: Could you snap a clear photo of the bill and text it here? That’ll help Jenna confirm the charges and respond faster.
  
  //      Client: Sure, one sec
  
  //      Client: [sends photo of invoice]
  
  // Ai: That’s perfect. Jenna will look it over and reach out with the next steps. Feel free to keep me posted if anything else comes up.
  
  //      Client: Thanks for the help
  
  // Ai: Anytime—you can text me 24/7 if anything else comes up. Sleep easy; we’ve got it covered.

];

const messagesBottom = [
 "Probably a 6. Shoulder still stiff.",
 "I actually missed yesterday work ran late.",
 "The driver’s insurer called me directly. I wasn’t sure what to say so I hung up."
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

  const BOTTOM_DELAY = 1000; // 1 sec delay

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setBottomAnimationState("entering");
      setTimeout(() => setBottomAnimationState("center"), 1500);
    }, BOTTOM_DELAY);

    const intervalTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setBottomAnimationState("exiting");
        setTimeout(() => {
          setBottomIndex((prev) => (prev + 1) % messagesBottom.length);
          setBottomAnimationState("entering");
          setTimeout(() => setBottomAnimationState("center"), 1500);
        }, 1500);
      }, 6000);
      // Save interval to clear later
      return () => clearInterval(interval);
    }, BOTTOM_DELAY);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(intervalTimeout);
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
      <div className="flex lg:flex-row flex-col-reverse items-center lg:items-center justify-between gap-10 container mx-auto">
        {/*  content  */}
        <Slide
          direction="left"
          triggerOnce
          className="flex flex-col items-center lg:items-start  gap-6 lg:w-2/3 w-full"
        >
          <div>
            <h1 className="poppins text-3xl lg:text-6xl  font-bold  mt-2 mb-5 text-[#4B5563] leading-normal  ">
              I Haven’t Heard From My  <br />
              <span className="bg-gradient-to-r from-[#C084FC] to-[#06B6D4] bg-clip-text text-transparent">
               Lawyer.
              </span>{" "}
              <br />
            </h1>
          

            <div className="mt-9">
              <Link to="/login">
                <button className="poppins md:text-base text-center items-center justify-center rounded-lg hover:bg-none hover:text-black border hover:border-[#0129B3]  bg-gradient-to-r from-[#0129B3] via-[#007BCC] to-[#77D7D2] px-3 py-2 sm:px-5 sm:py-2.5 text-sm font-medium text-white transform transition duration-300 ease-in-out hover:scale-105">
                  Apply For Early Access
                </button>
              </Link>
            </div>
          </div>
        </Slide>
        {/* img */}
        <Slide className="lg:w-1/3 w-full " direction="right" triggerOnce>
          <div>
            <img src={banner} alt="banner" />
          </div>
        </Slide>
      </div>

      <div className=" mt-20 container mx-auto">
        <div className="flex flex-col lg:flex-row items-center  gap-1 mx-auto ">
          <div className="relative w-full right-0 mb-10">
            <div className="absolute w-full  max-w-xs">
              {/* Smooth sliding message card */}
              {/* target 2 ............................................................................................................................... */}
              <div className="relative w-full max-w-4xl">
                <div className="relative left-80  max-w-xs">
                  <div
                    className={`transition-all duration-[1500ms] ease-in-out transform ${getAnimationClasses(
                      bottomAnimationState
                    )}`}
                  >
                    <div className="bg-[#06B6D4] text-white px-4 py-2 rounded-t-3xl rounded-br-3xl rounded-bl-md shadow-lg">
                      <p className="leading-relaxed">
                        {messagesBottom[bottomIndex]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full max-w-4xl m-t-12">
            <div className="relative  max-w-xs">
              {/* tatget 1................................................................................................................. */}
              {/* Smooth sliding message card */}
              <div className="relative w-full max-w-4xl md:-mt-36">
                <div className="relative max-w-xs">
                  {/* target 1 message card */}
                  <div className="relative w-full max-w-4xl">
                    <div className="relative max-w-xs">
                      <div
                        className={`transition-all duration-[1500ms] ease-in-out transform ${getAnimationClasses(
                          topAnimationState
                        )}`}
                      >
                        <div className="bg-[#4B5563] text-slate-300 px-4 py-2 rounded-t-3xl rounded-br-3xl rounded-bl-md shadow-lg">
                          <p className="leading-relaxed">
                            {messagesTop[topIndex]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
