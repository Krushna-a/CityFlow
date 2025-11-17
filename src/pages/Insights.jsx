import React from "react";
import { useMockData } from "../context/MockDataContext";

export default function Insights() {
  const { clusters, analytics } = useMockData();
  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 py-12">

      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-4">AI Flood Insights</h1>
      <p className="text-gray-600 max-w-2xl mb-10">
        View real-time AI predictions, rainfall forecasts, hotspot history,
        and environmental risk indicators for your city.
      </p>

      {/* GRID WRAPPER */}
      <div className="grid lg:grid-cols-3 gap-10">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-10">

          {/* RAINFALL FORECAST CARD */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-3">Rainfall Forecast</h2>
            <p className="text-gray-700 mb-4">
              Upcoming 24-hour precipitation prediction (AI + weather APIs).
            </p>

            <div className="bg-blue-100 h-48 rounded-xl flex items-center justify-center text-gray-500">
              {/* You can replace with chart.js later */}
              <span>Rainfall Chart Placeholder</span>
            </div>
          </div>

          {/* FLOOD RISK TIMELINE */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-3">Flood Risk Over Time</h2>
            <p className="text-gray-700 mb-4">
              Past 7 days AI-generated urban flood risk levels.
            </p>

            <div className="bg-blue-100 h-48 rounded-xl flex items-center justify-center text-gray-500">
              <span>Risk Timeline Graph Placeholder</span>
            </div>
          </div>

          {/* HOTSPOT HISTORY */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-3">Recurring Hotspots</h2>
            <div className="space-y-3 mt-4">
              <div className="border p-4 rounded-lg">
                <p className="font-semibold">Bandra Link Road</p>
                <p className="text-gray-600 text-sm">Reported 12 times this season</p>
              </div>

              <div className="border p-4 rounded-lg">
                <p className="font-semibold">Saki Naka Junction</p>
                <p className="text-gray-600 text-sm">High severity in 4 of 6 reports</p>
              </div>

              <div className="border p-4 rounded-lg">
                <p className="font-semibold">Andheri Subway</p>
                <p className="text-gray-600 text-sm">Known flood-prone low area</p>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-10">

          {/* CURRENT AI PREDICTION */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Current City Risk Level</h2>

            <div className="p-4 bg-red-100 rounded-lg text-red-700 font-semibold text-lg text-center">
              HIGH RISK
            </div>

            <p className="text-gray-600 mt-3">
              Heavy rainfall + drainage overload expected in next 3-5 hours.
            </p>
          </div>

          {/* VULNERABILITY SCORE */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">City Vulnerability Score</h2>

            <div className="p-4 bg-yellow-100 rounded-lg text-yellow-700 font-semibold text-lg text-center">
              VULNERABILITY: 72 / 100
            </div>

            <p className="text-gray-600 mt-3">
              Based on elevation, soil type, drainage network, and urban density.
            </p>
          </div>

          {/* AI NOTES */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">AI Insights (Summary)</h2>

            <ul className="text-gray-700 space-y-2">
              <li>• Possible flooding near low-lying pockets.</li>
              <li>• Strong correlation with rainfall peak hours.</li>
              <li>• 3 hotspots predicted to activate today.</li>
              <li>• Drainage improvement recommended in east corridor.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
