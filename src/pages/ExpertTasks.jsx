import React from "react";
import { useNavigate } from "react-router-dom";
import { useMockData } from "../context/MockDataContext";
import toast from "react-hot-toast";

export default function ExpertTasks() {
  const navigate = useNavigate();
  const { currentUser, getExpertTasks, completeExpertTask } = useMockData();
  
  const tasks = getExpertTasks(currentUser.id);

  const sevColor = (s) =>
    s === "Critical"
      ? "bg-red-900"
      : s === "High"
      ? "bg-red-600"
      : s === "Medium"
      ? "bg-yellow-600"
      : "bg-green-600";

  const handleCompleteTask = async (taskId) => {
    try {
      completeExpertTask(taskId);
      toast.success("Task completed!");
    } catch (err) {
      toast.error("Failed to complete task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 py-12">

      {/* PAGE HEADER */}
      <h1 className="text-4xl font-bold mb-2">Expert Tasks</h1>
      <p className="text-gray-600 mb-10">
        All clusters assigned to you for AI verification, review, and approval.
      </p>

      {/* TASK STATS */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600">Active Tasks</p>
          <p className="text-2xl font-bold text-blue-600">{tasks.filter(t => !t.completed).length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600">Completed</p>
          <p className="text-2xl font-bold text-green-600">{tasks.filter(t => t.completed).length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600">Total Tasks</p>
          <p className="text-2xl font-bold text-purple-600">{tasks.length}</p>
        </div>
      </div>

      {/* TASK LIST */}
      <div className="space-y-6">

        {tasks.filter(t => !t.completed).map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            {/* LEFT CONTENT */}
            <div>
              <p className="text-xl font-semibold">{t.id}</p>
              <p className="text-gray-700">{t.description || "Cluster review"}</p>
              <p className="text-gray-500 text-sm mt-1">
                Priority: {t.priority || "Medium"}
              </p>
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex items-center gap-4 mt-4 md:mt-0">

              {/* SEVERITY BADGE */}
              <span
                className={`${sevColor(
                  t.severity || "Medium"
                )} text-white px-3 py-1 rounded-full text-sm`}
              >
                {t.severity || "Medium"}
              </span>

              {/* COMPLETE BUTTON */}
              <button
                onClick={() => handleCompleteTask(t.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
              >
                Complete
              </button>

              {/* REVIEW BUTTON */}
              <button
                onClick={() => navigate(`/expert/cluster/${t.clusterIdRef}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Review
              </button>

            </div>
          </div>
        ))}

      </div>

      {/* COMPLETED SECTION */}
      {tasks.filter(t => t.completed).length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Completed Tasks</h2>
          <div className="space-y-4">
            {tasks.filter(t => t.completed).map((t) => (
              <div key={t.id} className="bg-gray-100 rounded-lg p-4 opacity-60">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-700">{t.id}</p>
                    <p className="text-sm text-gray-600">{t.description || "Cluster review"}</p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    ✓ Completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
