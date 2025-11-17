import React from "react";
import { useMockData } from "../context/MockDataContext";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

export default function GovDashboard() {
  const navigate = useNavigate();
  const { clusters, cases, analytics } = useMockData();
  const criticalClusters = clusters.filter((c) => c.severity === "Critical");
  const highClusters = clusters.filter((c) => c.severity === "High");

  React.useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    });
  }, []);

  const getMarkerIcon = (severity) => {
    const colors = {
      Critical: "#8b0000",
      High: "#dc2626",
      Medium: "#f59e0b",
      Low: "#10b981",
    };
    return new L.Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="${colors[severity] || "#3b82f6"}" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>`)}`,
      iconSize: [24, 24],
      iconAnchor: [12, 24],
      popupAnchor: [0, -24],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 py-12">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-2">Government Dashboard</h1>
      <p className="text-gray-600 mb-10">
        Monitor city-wide flood activity, cluster severity, and work progress.
      </p>

      {/* TOP GRID — METRIC CARDS */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500 mb-1">Active Clusters</p>
          <p className="text-3xl font-bold text-blue-600">{clusters.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500 mb-1">High Severity</p>
          <p className="text-3xl font-bold text-red-600">{highClusters.length + criticalClusters.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500 mb-1">Pending Cases</p>
          <p className="text-3xl font-bold text-yellow-600">{cases.filter((c) => c.status === "Pending").length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500 mb-1">In Progress</p>
          <p className="text-3xl font-bold text-green-600">{cases.filter((c) => c.status === "In Progress").length}</p>
        </div>

      </div>

      {/* TWO COLUMN LAYOUT */}
      <div className="grid lg:grid-cols-3 gap-10">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-10">

          {/* MAP PREVIEW */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">City Map Overview</h2>

            <div className="h-72 rounded-lg overflow-hidden border border-gray-200">
              <MapContainer
                center={[19.0760, 72.8777]}
                zoom={12}
                scrollWheelZoom={false}
                className="w-full h-full"
              >
                <TileLayer
                  attribution="© OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {clusters.map((cluster) => (
                  <Marker key={cluster.id} position={[cluster.lat, cluster.lng]} icon={getMarkerIcon(cluster.severity)} />
                ))}
              </MapContainer>
            </div>
          </div>

          {/* TABLE OF CLUSTERS */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Critical Clusters</h2>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2 font-semibold">Cluster</th>
                  <th className="py-2 font-semibold">Location</th>
                  <th className="py-2 font-semibold">Severity</th>
                  <th className="py-2 font-semibold">Status</th>
                  <th className="py-2 font-semibold"></th>
                </tr>
              </thead>

              <tbody>
                {clusters.map((c) => (
                  <tr key={c.id} className="border-b">
                    <td className="py-3">{c.id}</td>
                    <td className="py-3">{c.location}</td>

                    <td className="py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          c.severity === "High"
                            ? "bg-red-600"
                            : c.severity === "Medium"
                            ? "bg-yellow-600"
                            : "bg-green-600"
                        }`}
                      >
                        {c.severity}
                      </span>
                    </td>

                    <td className="py-3">{c.status}</td>

                    <td className="py-3">
                      <a
                        href={`/gov/cases/${c.id}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Open
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-10">

          {/* STATUS PIPELINE */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Case Pipeline</h2>

            <ul className="text-gray-700 space-y-3">
              <li>• Pending: 11 cases</li>
              <li>• Under Review: 8 cases</li>
              <li>• Approved: 6 cases</li>
              <li>• Work In Progress: 5 cases</li>
              <li>• Completed: 21 cases</li>
            </ul>
          </div>

          {/* LATEST UPDATES */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Latest Updates</h2>

            <div className="space-y-4">

              <div className="border-l-4 border-blue-600 pl-4">
                <p className="font-semibold">Approval issued for C-4755</p>
                <p className="text-gray-600 text-sm">20 minutes ago</p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <p className="font-semibold">Work started on C-4722</p>
                <p className="text-gray-600 text-sm">1 hour ago</p>
              </div>

              <div className="border-l-4 border-yellow-600 pl-4">
                <p className="font-semibold">New cluster detected in East Zone</p>
                <p className="text-gray-600 text-sm">3 hours ago</p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
