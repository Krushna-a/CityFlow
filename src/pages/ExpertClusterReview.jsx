import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useParams, useNavigate } from "react-router-dom";
import { useMockData } from "../context/MockDataContext";
import toast from "react-hot-toast";

export default function ExpertClusterReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getClusterById, updateClusterSeverity, createSolution, currentUser } = useMockData();
  const cluster = getClusterById(id || "C-4821");
  const [severity, setSeverity] = useState(cluster?.severity || "High");
  const [notes, setNotes] = useState("");
  const [solutionTitle, setSolutionTitle] = useState("");
  const [solutionDesc, setSolutionDesc] = useState("");
  const [loading, setLoading] = useState(false);

  if (!cluster) return <div className="p-20 text-center">Cluster not found</div>;

  const handleUpdateSeverity = () => {
    updateClusterSeverity(cluster.id, severity);
    toast.success("Severity updated");
  };

  const handleCreateSolution = async () => {
    if (!solutionTitle) return toast.error("Enter solution title");
    setLoading(true);
    setTimeout(() => {
      createSolution(cluster.id, { title: solutionTitle, description: solutionDesc, createdBy: currentUser?.id });
      toast.success("Solution created");
      setSolutionTitle("");
      setSolutionDesc("");
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 py-12">

      {/* PAGE HEADER */}
      <h1 className="text-4xl font-bold mb-2">
        Review Cluster #{cluster.id}
      </h1>
      <p className="text-gray-600 mb-10">
        Evaluate AI predictions and finalize expert decisions.
      </p>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-10">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-10">

          {/* MAP */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Cluster Location</h2>

            <div className="h-72 rounded-lg overflow-hidden">
              <MapContainer
                center={[cluster.lat, cluster.lng]}
                zoom={15}
                className="w-full h-full"
              >
                <TileLayer
                  attribution="© OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[cluster.lat, cluster.lng]} />
              </MapContainer>
            </div>
          </div>

          {/* MEDIA GALLERY */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Citizen Media</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cluster.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="rounded-lg h-40 w-full object-cover shadow"
                />
              ))}
            </div>
          </div>

          {/* EXPERT NOTES */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Expert Notes</h2>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border p-3 rounded-lg h-32"
              placeholder="Add technical comments or recommendations..."
            />

            <div className="flex gap-4 mt-4">
              <button onClick={() => navigate("/expert/dashboard")} className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg">Back</button>
            </div>
          </div>

          {/* CREATE SOLUTION */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Create Solution</h2>
            <input
              value={solutionTitle}
              onChange={(e) => setSolutionTitle(e.target.value)}
              placeholder="Solution title"
              className="w-full border p-3 rounded-lg mb-3"
            />
            <textarea
              value={solutionDesc}
              onChange={(e) => setSolutionDesc(e.target.value)}
              placeholder="Description"
              className="w-full border p-3 rounded-lg h-24 mb-3"
            />
            <button onClick={handleCreateSolution} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg">
              {loading ? "Creating..." : "Create Solution"}
            </button>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-10">

          {/* SEVERITY CONTROL */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Update Severity</h2>

            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full border p-3 rounded-lg mb-3"
            >
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <button onClick={handleUpdateSeverity} className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">Update Severity</button>
          </div>

          {/* AI ANALYSIS SUMMARY */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">AI Analysis Summary</h2>

            <ul className="space-y-2 text-gray-700">
              <li>• Water Depth: {cluster.waterDepth}m</li>
              <li>• Report Frequency: {cluster.reports} reports</li>
              <li>• Rainfall: {cluster.rainfallLast24h}mm</li>
              <li>• Risk Score: {(cluster.riskScore * 100).toFixed(0)}%</li>
              <li>• Status: {cluster.status}</li>
            </ul>
          </div>

          {/* RECOMMENDED ACTIONS */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              AI Recommended Actions
            </h2>

            <ul className="space-y-2 text-gray-700">
              <li>• Install soak pits along the low-lying zone</li>
              <li>• Improve trench alignment towards west drain</li>
              <li>• Add permeable pavement near footpath</li>
              <li>• Clean roadside drainage channels</li>
            </ul>

            <a
              href={`/expert/solutions/${cluster.id}`}
              className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Open Solution Editor
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
