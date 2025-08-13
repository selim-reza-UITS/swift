import React, { useState } from "react";

const Pay = () => {
  const [managers, setManagers] = useState(1);
  const [fee, setFee] = useState(5000);

  // Sample ROI logic (adjust if needed)
  const annualROI = managers * (fee / 2) + 12000;
  const monthlySavings = Math.floor(annualROI / 12);

  return (
    <div id="Resources" className="container px-4 py-12 mx-auto text-center">
      {/* Heading section */}
      <p className="text-[#8B5CF6]  mb-2 text-2xl poppins font-bold">
        Reclaim Your Team's Most Valuable Asset: Time.
      </p>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent  mb-1">
        ${annualROI.toLocaleString()} recovered
      </h1>
      <p className="text-[#94A3B8] mb-4 mt-2"><b>Net gain</b> in annual staff costs.</p>

      <h2 className="text-3xl font-bold text-[#8B5CF6] poppins">
        Arviso Pays for Itself
        <span className="bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] bg-clip-text text-transparent">
          —Then Keeps Paying You.
        </span>
      </h2>
    

      {/* Sliders Section */}
      <div className="grid grid-cols-1 mt-10 md:grid-cols-2 shadow-2xl shadow-slate-400 gap-4 mb-6 bg-[#8B5CF6] p-4 rounded-xl ">
        {/* Lawyers */}
        <div className="p-4 rounded-xl">
          <p className="text-[#CBD5E1] font-medium text-xs mb-1 poppins">
            Number of Lawyer
          </p>
          <p className="text-2xl font-bold text-white poppins">
            {managers} Manager{managers > 1 ? "s" : ""}
          </p>
          <input
            type="range"
            min={1}
            max={300}
            value={managers}
            onChange={(e) => setManagers(Number(e.target.value))}
            className="w-full mt-2  accent-[#38BDF8] rounded-lg shadow-inner "
          />

          <div className="flex justify-between text-xs text-[#CBD5E1]  ">
            <p>1</p>
            <p>300</p>
          </div>
        </div>

        {/* Annual ROI */}
        <div className="flex flex-col items-center justify-center px-6 text-white lg:border lg:border-t-0 lg:border-b-0 lg:border-r-0 lg:border-r-white">
          <p className="text-xs mb-1 text-[#CBD5E1]">
            Your Annual ROI with Arviso
          </p>
          <p className="text-2xl font-bold text-[#34D399]">
            + $8568 
          </p>
          <p className="text-xs text-[#CBD5E1]  mt-3">
          Net gain when Arviso recovers staff time annually.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 mt-12 gap-4 md:grid-cols-2">
        <div className="bg-[#8B5CF6] shadow-2xl shadow-slate-400 rounded-xl text-white p-4 text-start">
          <p className="font-medium poppins text-base text-[#FFFFFF]">
            Net Monthly Savings
          </p>
          <p className="text-lg font-bold text-[#34D399]">
            + $714
          </p>
          <p className=" text-[#FFFFFF] text-xs">
            Monthly savings after Arviso costs
          </p>
        </div>
        <div className="bg-[#8B5CF6] shadow-2xl shadow-slate-400 rounded-xl text-white p-4 text-start">
          <p className="font-medium poppins text-base text-[#FFFFFF]">
            Break-Even Point
          </p>
          <p className="text-lg font-bold text-[#38BDF8]">Immediate</p>
          <p className="text-[#FFFFFF] text-xs">Positive ROI from week 1</p>
        </div>
      </div>
    </div>
  );
};

export default Pay;
