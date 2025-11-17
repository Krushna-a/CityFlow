import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMockData } from "../context/MockDataContext";
import toast from "react-hot-toast";

export default function SolutionEditor() {
  const { id } = useParams();
  const { getSolutionById } = useMockData();

  const [solutions, setSolutions] = useState([
    {
      id: 1,
      action: "Install soak pits along low-lying areas",
      editable: true,
      cost: "₹ 1,20,000",
      priority: "High",
      impact: "Strong",
    },
    {
      id: 2,
      action: "Clear roadside drainage channels",
      editable: true,
      cost: "₹ 45,000",
      priority: "Medium",
      impact: "Moderate",
    },
    {
      id: 3,
      action: "Permeable pavement installation near footpath",
      editable: true,
      cost: "₹ 2,00,000",
      priority: "High",
      impact: "Strong",
    },
  ]);

  const handleChange = (id, field, value) => {
    setSolutions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 py-12">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-2">Solution Editor</h1>
      <p className="text-gray-600 mb-10">
        Modify AI-generated recommendations for Cluster #{id || "C-4821"}.
      </p>

      {/* SOLUTIONS GRID */}
      <div className="grid lg:grid-cols-3 gap-10">

        {/* LEFT SIDE: Action Cards */}
        <div className="lg:col-span-2 space-y-10">

          {solutions.map((sol) => (
            <div
              key={sol.id}
              className="bg-white rounded-xl shadow p-6 space-y-4"
            >
              <p className="text-sm font-semibold text-gray-500">
                Recommended Action #{sol.id}
              </p>

              {/* Editable Text Area */}
              <textarea
                value={sol.action}
                onChange={(e) => handleChange(sol.id, "action", e.target.value)}
                className="w-full border p-3 rounded-lg h-28"
              />

              {/* COST + PRIORITY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* COST */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">
                    ESTIMATED COST
                  </p>
                  <input
                    value={sol.cost}
                    onChange={(e) =>
                      handleChange(sol.id, "cost", e.target.value)
                    }
                    className="w-full border p-3 rounded-lg"
                  />
                </div>

                {/* PRIORITY */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">
                    PRIORITY
                  </p>
                  <select
                    value={sol.priority}
                    onChange={(e) =>
                      handleChange(sol.id, "priority", e.target.value)
                    }
                    className="w-full border p-3 rounded-lg"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              {/* IMPACT */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">
                  EXPECTED IMPACT
                </p>

                <select
                  value={sol.impact}
                  onChange={(e) =>
                    handleChange(sol.id, "impact", e.target.value)
                  }
                  className="w-full border p-3 rounded-lg"
                >
                  <option>Strong</option>
                  <option>Moderate</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
          ))}

        </div>

        {/* RIGHT SIDE: Notes + Save */}
        <div className="space-y-10">

          {/* NOTES SECTION */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Engineering Notes
            </h2>

            <textarea
              className="w-full border p-3 rounded-lg h-40"
              placeholder="Add engineering considerations, feasibility details, or planning notes..."
            ></textarea>
          </div>

          {/* SAVE BUTTON */}
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <button onClick={() => toast.success('Solutions saved')} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold transition">
              Save Solution
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
