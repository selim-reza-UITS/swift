/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { GoClock } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import { SlEnergy } from "react-icons/sl";
const Superpower = () => {
  const features = [
    {
      id: 1,
      icon: <GoClock />,
      title: "Retain More Clients",
      description:
        "Our AI detects client frustration before it escalates, alerting your team to intervene and save at-risk cases.",
    },
    {
      id: 2,
      icon: <FaRegStar />,
      title: "Enhance Your Reputation",
      description:
        "Automatically prompt your happiest clients for 5-star reviews, turning great service into your best marketing asset.",
    },
    {
      id: 3,
      icon: <SlEnergy />,
      title: "Boost Staff Efficiency",
      description:
        "Free up your case managers from repetitive check-ins so they can focus on high-value legal work.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-32 ">
      {/* Heading Section */}
      <div className=" mx-auto text-center mb-20">
        <h1 className="poppins text-3xl md:text-4xl lg:text-6xl  font-bold bg-gradient-to-r from-[#6366F1] to-[#06B6D4] bg-clip-text text-transparent">
          From a Liability to a Superpower
        </h1>
        <p className="text-[#4B5563] text-2xl mt-7 poppins font-normal">
          From platform management to client communication, Arviso adapts to
          your firm's needs
        </p>
      </div>

      {/* Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-white rounded-xl shadow-md py-20 px-12 text-center flex flex-col items-center justify-normal hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            <div className="main-color mb-4 text-2xl poppins">
              {feature.icon}
            </div>
            <h2 className="font-semibold main-color mb-2 poppins">
              {feature.title}
            </h2>
            <p className="main-color  text-sm poppins">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Superpower;
