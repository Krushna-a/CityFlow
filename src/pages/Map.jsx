import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useMockData } from "../context/MockDataContext";
import L from "leaflet";

export default function Map() {
  const navigate = useNavigate();
  const { clusters, currentUser } = useMockData();

  useEffect(() => {
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
      iconUrl: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path fill="${colors[severity] || "#3b82f6"}" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>`)}`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  };

  return (
    <div className="fixed inset-0 w-screen h-screen relative z-0">

      {/* Floating Header */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow z-20">
        <h2 className="text-lg font-semibold text-gray-800">
          Urban Flood Risk Map
        </h2>
      </div>

      {/* Floating Report Button */}
      <button
        onClick={() => navigate("/report")}
        className="absolute right-6 bottom-6 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition z-20"
      >
        Report Incident
      </button>

      {/* LEGEND */}
      <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow z-20 text-xs">
        <p className="font-bold mb-2">Severity Levels</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{backgroundColor: "#8b0000"}}></div> Critical</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{backgroundColor: "#dc2626"}}></div> High</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{backgroundColor: "#f59e0b"}}></div> Medium</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{backgroundColor: "#10b981"}}></div> Low</div>
        </div>
      </div>

      {/* REAL MAP */}
      <MapContainer
        center={[19.0760, 72.8777]}
        zoom={12}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
      >
        <TileLayer
          attribution='© OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {clusters.map((cluster) => (
          <Marker key={cluster.id} position={[cluster.lat, cluster.lng]} icon={getMarkerIcon(cluster.severity)}>
            <Popup>
              <div className="w-48 text-sm">
                <p className="font-bold">{cluster.name}</p>
                <p className="text-gray-600">{cluster.location}</p>
                <div className="mt-2 space-y-1 text-xs">
                  <p><span className="font-semibold">Severity:</span> {cluster.severity}</p>
                  <p><span className="font-semibold">Reports:</span> {cluster.reports}</p>
                  <p><span className="font-semibold">Water Depth:</span> {cluster.waterDepth}m</p>
                  <p><span className="font-semibold">Risk Score:</span> {(cluster.riskScore * 100).toFixed(0)}%</p>
                </div>
                <button onClick={() => navigate(`/cluster/${cluster.id}`)} className="mt-3 w-full bg-blue-600 text-white text-xs py-1 rounded hover:bg-blue-700 transition">
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

    </div>
  );
}
