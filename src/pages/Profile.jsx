import React from "react";
import { useNavigate } from "react-router-dom";
import { useMockData } from "../context/MockDataContext";

export default function Profile() {
  const navigate = useNavigate();
  const { currentUser } = useMockData();

  if (!currentUser) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const userStats = {
    citizen: { reports: 15, accuracy: "91%", badges: ["Contributor", "Accurate Reporter"] },
    expert: { reviews: 24, expertise: "Hydrology", badges: ["Verified Expert", "Trusted Reviewer"] },
    government: { casesManaged: 18, avgResolutionDays: "3.2", badges: ["Official", "Case Manager"] },
    "field-worker": { tasksCompleted: 32, qualityScore: "94%", badges: ["Field Pro", "Reliable"] },
    admin: { users: 150, clusters: 25, badges: ["Administrator"] },
  };

  const stats = userStats[currentUser.role] || userStats.citizen;

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 py-12">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-4">Your Profile</h1>
      <p className="text-gray-600 mb-10">
        Role: <span className="font-semibold capitalize">{currentUser.role}</span>
      </p>

      {/* GRID */}
      <div className="grid lg:grid-cols-3 gap-10">

        {/* ================= LEFT COLUMN ================= */}
        <div className="space-y-10">

          {/* USER CARD */}
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <img
              src={`https://ui-avatars.com/api/?name=${currentUser.name}&background=0D8ABC&color=fff&size=150`}
              className="w-28 h-28 rounded-full mx-auto mb-4 shadow"
            />

            <h2 className="text-xl font-semibold">{currentUser.name}</h2>
            <p className="text-gray-600">{currentUser.email}</p>
            <p className="text-sm text-gray-500 mt-1 capitalize">Role: {currentUser.role}</p>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-blue-100 p-3 rounded-lg text-center">
                <p className="font-bold text-blue-700 text-xl">
                  {currentUser.role === "citizen" ? stats.reports : currentUser.role === "expert" ? stats.reviews : currentUser.role === "government" ? stats.casesManaged : currentUser.role === "field-worker" ? stats.tasksCompleted : "—"}
                </p>
                <p className="text-gray-600 text-sm">{currentUser.role === "citizen" ? "Reports" : currentUser.role === "expert" ? "Reviews" : currentUser.role === "government" ? "Cases" : "Tasks"}</p>
              </div>

              <div className="bg-green-100 p-3 rounded-lg text-center">
                <p className="font-bold text-green-700 text-xl">
                  {currentUser.role === "citizen" ? stats.accuracy : currentUser.role === "field-worker" ? stats.qualityScore : "—"}
                </p>
                <p className="text-gray-600 text-sm">{currentUser.role === "citizen" ? "Accuracy" : "Quality"}</p>
              </div>
            </div>
          </div>

          {/* BADGES */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Badges</h2>

            <div className="flex flex-wrap gap-3">
              {stats.badges.map((badge, i) => (
                <span
                  key={i}
                  className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full font-medium text-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="lg:col-span-2 space-y-10">

          {/* INFO CARD */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-gray-600 text-sm">Name</p>
                <p className="text-lg font-semibold">{currentUser.name}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="text-lg font-semibold">{currentUser.email}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Role</p>
                <p className="text-lg font-semibold capitalize">{currentUser.role}</p>
              </div>
              {currentUser.role === "expert" && (
                <div>
                  <p className="text-gray-600 text-sm">Expertise</p>
                  <p className="text-lg font-semibold">Hydrology & Water Management</p>
                </div>
              )}
              {currentUser.role === "government" && (
                <div>
                  <p className="text-gray-600 text-sm">Department</p>
                  <p className="text-lg font-semibold">Municipal Water Works</p>
                </div>
              )}
              {currentUser.role === "field-worker" && (
                <div>
                  <p className="text-gray-600 text-sm">Assigned Zone</p>
                  <p className="text-lg font-semibold">Central Mumbai (Zone 5)</p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
