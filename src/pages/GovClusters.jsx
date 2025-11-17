import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMockData } from "../context/MockDataContext";

export default function GovClusters() {
  const navigate = useNavigate();
  const { clusters } = useMockData();
  const [filterSeverity, setFilterSeverity] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const severityColor = (sev) =>
    sev === "Critical"
      ? "bg-red-900"
      : sev === "High"
      ? "bg-red-600"
      : sev === "Medium"
      ? "bg-yellow-600"
      : "bg-green-600";

  const statusColor = (s) =>
    s === "Pending"
      ? "bg-gray-600"
      : s === "Under Review"
      ? "bg-blue-600"
      : s === "Approved"
      ? "bg-green-600"
      : s === "Completed"
      ? "bg-gray-400"
      : "bg-orange-600";

  const filtered = clusters.filter((c) => {
    const sevMatch = filterSeverity === "All" || c.severity === filterSeverity;
    const statusMatch = filterStatus === "All" || c.status === filterStatus;
    return sevMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 py-12">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-2">All Clusters</h1>
      <p className="text-gray-600 mb-8">
        View every flood cluster across the city with filters and status tracking.
      </p>

      {/* FILTER BAR */}
      <div className="bg-white p-6 rounded-xl shadow mb-10 flex flex-wrap gap-4 items-center">

        {/* Severity Filter */}
        <div>
          <p className="text-xs font-semibold mb-1">Filter by Severity</p>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option>All</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <p className="text-xs font-semibold mb-1">Filter by Status</p>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Under Review</option>
            <option>Approved</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {/* CLUSTERS LIST */}
      <div className="space-y-6">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div>
              <p className="font-semibold text-lg">{c.id}</p>
              <p className="text-gray-700">{c.location}</p>
              <p className="text-gray-500 text-sm mt-1">Reports: {c.reports || 0} | Water Depth: {c.waterDepth || 0.5}m | Risk: {c.riskScore || 0}%</p>
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-0">

              <span
                className={`${severityColor(
                  c.severity
                )} text-white px-3 py-1 rounded-full text-sm`}
              >
                {c.severity}
              </span>

              <span
                className={`${statusColor(
                  c.status
                )} text-white px-3 py-1 rounded-full text-sm`}
              >
                {c.status}
              </span>

              <button
                onClick={() => navigate(`/cluster/${c.id}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
