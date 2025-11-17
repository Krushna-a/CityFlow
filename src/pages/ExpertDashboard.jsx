import React from "react";
import { useNavigate } from "react-router-dom";
import { useMockData } from "../context/MockDataContext";

export default function ExpertDashboard() {
  const navigate = useNavigate();
  const { clusters, getExpertTasks, currentUser } = useMockData();
  const pendingClusters = clusters.filter((c) => ["Pending", "Under Review"].includes(c.status)).slice(0, 5);
  const tasks = currentUser ? getExpertTasks(currentUser.id) : [];

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 py-12">

      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold mb-2">Expert Dashboard</h1>
      <p className="text-gray-600 mb-10">
        Review AI predictions, validate clusters, and approve recommended solutions.
      </p>

      {/* GRID */}
      <div className="grid lg:grid-cols-3 gap-10">

        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-2 space-y-10">

          {/* CLUSTERS NEEDING REVIEW */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Clusters Requiring Validation
            </h2>

            <div className="space-y-4">
              {pendingClusters.length > 0 ? pendingClusters.map((c) => (
                <div key={c.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between bg-gray-50">
                  <div>
                    <p className="font-semibold text-lg">{c.name}</p>
                    <p className="text-gray-700">{c.location}</p>
                    <p className="mt-2 text-sm text-gray-600">{c.reports} reports — Risk {(c.riskScore * 100).toFixed(0)}%</p>
                  </div>
                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-white text-sm ${
                      c.severity === "Critical" ? "bg-red-700" : c.severity === "High" ? "bg-red-600" : c.severity === "Medium" ? "bg-yellow-600" : "bg-green-600"
                    }`}>
                      {c.severity}
                    </span>
                    <button onClick={() => navigate(`/expert/cluster/${c.id}`)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      Review
                    </button>
                  </div>
                </div>
              )) : <p className="text-gray-600">No clusters pending review</p>}
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

            <div className="space-y-4">

              <div className="border-l-4 border-blue-600 pl-4">
                <p className="font-semibold">Validated Cluster C-4821</p>
                <p className="text-gray-600 text-sm">20 minutes ago</p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <p className="font-semibold">Approved AI Recommendations</p>
                <p className="text-gray-600 text-sm">1 hour ago</p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <p className="font-semibold">Requested more media evidence</p>
                <p className="text-gray-600 text-sm">3 hours ago</p>
              </div>

            </div>
          </div>

        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="space-y-10">

          {/* SUMMARY CARDS */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-6">
              Overview
            </h2>

            <div className="space-y-4">

              <div className="bg-blue-100 p-4 rounded-lg">
                <p className="font-bold text-blue-700 text-2xl">{pendingClusters.length}</p>
                <p className="text-gray-700">Clusters Pending</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg">
                <p className="font-bold text-yellow-700 text-2xl">{tasks.length}</p>
                <p className="text-gray-700">Active Tasks</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <p className="font-bold text-green-700 text-2xl">{clusters.filter((c) => c.status === "Completed").length}</p>
                <p className="text-gray-700">Completed Cases</p>
              </div>

            </div>
          </div>

          {/* AI SUMMARY BOX */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">AI Insights Summary</h2>

            <ul className="text-gray-700 space-y-2">
              <li>• 3 clusters show rising severity trends</li>
              <li>• 2 hotspots predicted to activate today</li>
              <li>• North corridor drainage overload expected</li>
              <li>• West zone shows improving scores</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
