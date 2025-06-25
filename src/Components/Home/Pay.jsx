import React from "react";

const Pay = () => {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      {/* Heading section */}
      <p className="text-purple-500 font-medium mb-2">
        Reclaim Your Team's Most Valuable Asset: Time.
      </p>
      <h1 className="text-4xl font-bold text-purple-700 mb-1">
        $11,412 recovered
      </h1>
      <p className="text-gray-500 mb-4">in annual staff costs.</p>

      <h2 className="text-2xl font-semibold text-purple-700">
        Arviso Pays for Itself{" "}
        <span className="text-blue-400">—Then Keeps Paying You.</span>
      </h2>
      <p className="text-gray-500 mt-2 mb-8">
        See the clear return on investment by factoring in both client retention
        and recovered staff time.
      </p>

      {/* Metrics section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-purple-100 rounded-xl p-4">
          <p className="text-purple-700 font-semibold mb-1">
            Number of Case Managers
          </p>
          <p className="text-lg font-bold text-purple-700">1 Manager</p>
        </div>
        <div className="bg-purple-100 rounded-xl p-4">
          <p className="text-purple-700 font-semibold mb-1">
            Average Fee Per Retained Case
          </p>
          <p className="text-lg font-bold text-purple-700">$5,000</p>
        </div>
        <div className="bg-purple-700 rounded-xl p-4 text-white">
          <p className="font-semibold mb-1">Your Annual ROI with Arviso</p>
          <p className="text-lg font-bold">+ $16,412</p>
          <p className="text-sm">
            Combines retained clients + recovered staff time
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-purple-500 rounded-xl text-white p-4">
          <p className="font-semibold">Net Monthly Savings</p>
          <p className="text-lg font-bold">+ $891</p>
          <p className="text-sm">Months savings after Arviso costs</p>
        </div>
        <div className="bg-purple-500 rounded-xl text-white p-4">
          <p className="font-semibold">Break-Even Point</p>
          <p className="text-lg font-bold">Immediate</p>
          <p className="text-sm">Positive ROI from week 1</p>
        </div>
      </div>
    </div>
  );
};

export default Pay;
