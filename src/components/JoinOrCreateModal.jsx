import React from "react";

export default function JoinOrCreateModal({ cluster, onJoin, onCreate, onCancel }) {
  if (!cluster) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-2">Similar Incident Found</h2>
        <p className="text-gray-600 mb-4">We detected an existing incident near your location.</p>

        {/* Cluster Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="text-2xl">📍</div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{cluster.name}</p>
              <p className="text-xs text-gray-600 mt-1">{cluster.location}</p>
              <div className="flex gap-2 mt-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${
                  cluster.severity === "Critical" ? "bg-red-900" :
                  cluster.severity === "High" ? "bg-red-600" :
                  cluster.severity === "Medium" ? "bg-yellow-500" :
                  "bg-green-600"
                }`}>
                  {cluster.severity}
                </span>
                <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-200 text-gray-700">
                  {cluster.reports} reports
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gray-50 rounded p-3">
            <p className="text-xs text-gray-600">Water Depth</p>
            <p className="text-lg font-bold text-blue-600">{cluster.waterDepth}m</p>
          </div>
          <div className="bg-gray-50 rounded p-3">
            <p className="text-xs text-gray-600">Risk Score</p>
            <p className="text-lg font-bold text-red-600">{(cluster.riskScore * 100).toFixed(0)}%</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={onJoin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            ✓ Join This Discussion
          </button>
          <button
            onClick={onCreate}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition"
          >
            + Create New Incident
          </button>
          <button
            onClick={onCancel}
            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
