import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useMockData } from "../context/MockDataContext";
import toast from "react-hot-toast";

export default function GovCaseDetails() {
  const { id } = useParams();
  const { getCaseById, updateCaseStatus, addCaseWorkDone, getClusterById } = useMockData();
  const [status, setStatus] = useState("Pending");
  const [workNote, setWorkNote] = useState("");
  const [loading, setLoading] = useState(false);

  const caseData = getCaseById(id || "CS-5001") || {
    id: "CS-5001",
    location: "Bandra Link Road",
    severity: "High",
    lat: 19.076,
    long: 72.8777,
    status: "Pending",
    workLog: [],
  };

  // If case doesn't include coordinates, try to find cluster coordinates
  const clusterRef = caseData.clusterId ? getClusterById(caseData.clusterId) : null;
  const mapLat = caseData.lat || clusterRef?.lat || 19.0760;
  const mapLng = caseData.long || clusterRef?.lng || 72.8777;

  const handleStatusChange = (newStatus) => {
    updateCaseStatus(caseData.id, newStatus);
    setStatus(newStatus);
    toast.success(`Case status updated to ${newStatus}`);
  };

  const handleAddWorkDone = async () => {
    if (!workNote.trim()) {
      toast.error("Please add a work note");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      addCaseWorkDone(caseData.id, workNote);
      setWorkNote("");
      setLoading(false);
      toast.success("Work progress added!");
    }, 400);
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
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 py-12">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-2">Case #{caseData.id}</h1>
      <p className="text-gray-600 mb-10">{caseData.location}</p>

      {/* STATUS BADGE */}
      <span
        className={`${severityColor(
          caseData.severity
        )} text-white px-4 py-1 rounded-full text-sm font-semibold`}
      >
        Severity: {caseData.severity}
      </span>

      {/* GRID */}
      <div className="mt-10 grid lg:grid-cols-3 gap-10">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-10">

          {/* MAP */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Location Map</h2>

            <div className="h-72 rounded-lg overflow-hidden">
              <MapContainer
                center={[mapLat, mapLng]}
                zoom={15}
                className="w-full h-full"
              >
                <TileLayer
                  attribution="© OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[mapLat, mapLng]} />
              </MapContainer>
            </div>
          </div>

          {/* WORK LOG */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Work Progress Log</h2>

            {caseData.workLog && caseData.workLog.length > 0 ? (
              <div className="space-y-4">
                {caseData.workLog.map((log, i) => (
                  <div key={i} className="border-l-4 border-blue-600 pl-4 py-2">
                    <p className="font-semibold">{log.note}</p>
                    <p className="text-gray-600 text-sm">By: {log.addedBy || "Officer"}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No work progress recorded yet</p>
            )}

            {/* Add Work Note */}
            <div className="mt-6 border-t pt-4">
              <label className="text-sm font-semibold">Add Progress Note</label>
              <textarea
                value={workNote}
                onChange={(e) => setWorkNote(e.target.value)}
                placeholder="What work was completed?"
                className="w-full border p-3 rounded-lg mt-2 h-24"
              />
              <button
                onClick={handleAddWorkDone}
                disabled={loading}
                className="mt-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg"
              >
                {loading ? "Adding..." : "Add Progress"}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-10">

          {/* STATUS CONTROL */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-3">Update Status</h2>

            <select
              value={caseData.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full border p-3 rounded-lg"
            >
              <option>Pending</option>
              <option>Under Review</option>
              <option>Approved</option>
              <option>Work In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          {/* CASE DETAILS */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Case Details</h2>

            <div className="space-y-4">
              <div>
                <p className="text-gray-600 text-sm">Location</p>
                <p className="font-semibold">{caseData.location}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Severity</p>
                <p className="font-semibold capitalize">{caseData.severity}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Status</p>
                <p className="font-semibold capitalize">{caseData.status}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
