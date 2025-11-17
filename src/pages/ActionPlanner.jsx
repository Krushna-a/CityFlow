import React, { useState } from "react";
import { useMockData } from "../context/MockDataContext";
import toast from "react-hot-toast";

export default function ActionPlanner() {
  const { clusters } = useMockData();
  const [actions, setActions] = useState([
    {
      id: 1,
      title: "Install soak pits in low-lying zones",
      impact: "High",
      budget: "₹ 2,00,000",
      timeline: "30 days",
      status: "Planned",
      location: "Bandra Link Road",
    },
    {
      id: 2,
      title: "Reconstruct roadside drainage channels",
      impact: "Medium",
      budget: "₹ 8,00,000",
      timeline: "45 days",
      status: "WIP",
      location: "Saki Naka",
    },
    {
      id: 3,
      title: "Add permeable pavements near footpaths",
      impact: "High",
      budget: "₹ 12,00,000",
      timeline: "60 days",
      status: "Pending Approval",
      location: "Andheri Subway",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setActions(actions.map(a => a.id === id ? {...a, status: newStatus} : a));
    toast.success("Action status updated!");
  };

  const statusColor = (s) =>
    s === "WIP"
      ? "bg-orange-600"
      : s === "Planned"
      ? "bg-blue-600"
      : s === "Completed"
      ? "bg-green-600"
      : "bg-gray-600";

  const impactColor = (i) =>
    i === "High"
      ? "text-red-600"
      : i === "Medium"
      ? "text-yellow-600"
      : "text-green-600";

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 py-12">

      {/* PAGE HEADER */}
      <h1 className="text-4xl font-bold mb-2">Action Planner</h1>
      <p className="text-gray-600 mb-10">
        Plan long-term flood mitigation and drainage improvement strategies.
      </p>

      {/* GRID LAYOUT */}
      <div className="grid lg:grid-cols-3 gap-10">

        {/* LEFT SIDE ID-BASED ACTION LIST */}
        <div className="lg:col-span-2 space-y-8">

          {actions.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-xl shadow p-6 space-y-4"
            >
              {/* Title */}
              <h2 className="text-xl font-semibold">{a.title}</h2>

              {/* ACTION FIELDS */}
              <div className="grid md:grid-cols-3 gap-6">

                {/* Impact */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">
                    IMPACT
                  </p>
                  <p className={`font-bold text-lg ${impactColor(a.impact)}`}>
                    {a.impact}
                  </p>
                </div>

                {/* Budget */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">
                    BUDGET
                  </p>
                  <input
                    className="w-full border p-3 rounded-lg"
                    value={a.budget}
                    onChange={(e) =>
                      setActions((prev) =>
                        prev.map((x) =>
                          x.id === a.id ? { ...x, budget: e.target.value } : x
                        )
                      )
                    }
                  />
                </div>

                {/* Timeline */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">
                    TIMELINE
                  </p>
                  <input
                    className="w-full border p-3 rounded-lg"
                    value={a.timeline}
                    onChange={(e) =>
                      setActions((prev) =>
                        prev.map((x) =>
                          x.id === a.id ? { ...x, timeline: e.target.value } : x
                        )
                      )
                    }
                  />
                </div>
              </div>

              {/* STATUS SELECTOR */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">
                  STATUS
                </p>
                <select
                  className="w-full border p-3 rounded-lg"
                  value={a.status}
                  onChange={(e) =>
                    setActions((prev) =>
                      prev.map((x) =>
                        x.id === a.id ? { ...x, status: e.target.value } : x
                      )
                    )
                  }
                >
                  <option>Planned</option>
                  <option>Pending Approval</option>
                  <option>WIP</option>
                  <option>Completed</option>
                </select>

                <span
                  className={`${statusColor(
                    a.status
                  )} inline-block text-white px-3 py-1 mt-3 rounded-full text-xs`}
                >
                  {a.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE PANEL */}
        <div className="space-y-10">

          {/* ADD NEW ACTION */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Add New Action</h2>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
              Create New Action
            </button>
          </div>

          {/* SUMMARY BOX */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>

            <ul className="space-y-2 text-gray-700">
              <li>• Total Actions: {actions.length}</li>
              <li>• High Impact: {actions.filter((x) => x.impact === "High").length}</li>
              <li>• Work In Progress: {actions.filter((x) => x.status === "WIP").length}</li>
              <li>• Completed: {actions.filter((x) => x.status === "Completed").length}</li>
            </ul>
          </div>

          {/* NOTES */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Notes</h2>

            <textarea
              className="w-full border p-3 rounded-lg h-40"
              placeholder="Write planning notes, drainage considerations, or engineering comments..."
            ></textarea>
          </div>

        </div>

      </div>
    </div>
  );
}
