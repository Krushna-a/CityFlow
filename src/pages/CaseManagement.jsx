import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMockData } from "../context/MockDataContext";
import toast from "react-hot-toast";

export default function CaseManagement() {
  const navigate = useNavigate();
  const { cases, updateCaseStatus } = useMockData();
  const [statusFilter, setStatusFilter] = useState("All");

  const casesByStatus = {
    Pending: cases.filter(c => c.status === "Pending"),
    "Under Review": cases.filter(c => c.status === "Under Review"),
    Approved: cases.filter(c => c.status === "Approved"),
    "Work In Progress": cases.filter(c => c.status === "Work In Progress"),
    Completed: cases.filter(c => c.status === "Completed"),
  };

  const handleStatusChange = (caseId, newStatus) => {
    updateCaseStatus(caseId, newStatus);
    toast.success(`Case status updated to ${newStatus}`);
  };

  const severityColor = (sev) =>
    sev === "Critical"
      ? "bg-red-900"
      : sev === "High"
      ? "bg-red-600"
      : sev === "Medium"
      ? "bg-yellow-600"
      : "bg-green-600";

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-16 py-12">

      {/* PAGE HEADER */}
      <h1 className="text-4xl font-bold mb-2">Case Management</h1>
      <p className="text-gray-600 mb-10">
        Review and manage all flooding clusters across the city.
      </p>

      {/* KANBAN GRID */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-5">

        {/* COLUMN COMPONENT */}
        {[
          { title: "Pending", key: "Pending" },
          { title: "Under Review", key: "Under Review" },
          { title: "Approved", key: "Approved" },
          { title: "Work In Progress", key: "Work In Progress" },
          { title: "Completed", key: "Completed" },
        ].map((col) => (
          <div
            key={col.key}
            className="bg-white rounded-xl shadow p-4 flex flex-col"
          >
            <h2 className="text-lg font-semibold mb-4">{col.title} ({casesByStatus[col.key].length})</h2>

            <div className="space-y-4">
              {casesByStatus[col.key].map((c) => (
                <div
                  key={c.id}
                  className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                >
                  <p className="font-semibold">{c.id}</p>
                  <p className="text-gray-700 text-sm mb-2">{c.location || "Location TBD"}</p>

                  <span
                    className={`${severityColor(
                      c.severity || "Medium"
                    )} text-white px-3 py-1 rounded-full text-xs`}
                  >
                    {c.severity || "Medium"}
                  </span>

                  <button
                    onClick={() => navigate(`/gov/cases/${c.id}`)}
                    className="block mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-sm font-medium transition"
                  >
                    Open Case
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
