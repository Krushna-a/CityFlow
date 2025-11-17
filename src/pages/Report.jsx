import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMockData } from "../context/MockDataContext";
import toast from "react-hot-toast";
import JoinOrCreateModal from "../components/JoinOrCreateModal";

export default function Report() {
  const navigate = useNavigate();
  const { submitReport, findNearestCluster, currentUser } = useMockData();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [gps, setGPS] = useState({ lat: 19.0760, long: 72.8777 });
  const [timestamp, setTimestamp] = useState("");
  const [caption, setCaption] = useState("");
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [nearbyCluster, setNearbyCluster] = useState(null);
  const [pendingPayload, setPendingPayload] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGPS({
          lat: pos.coords.latitude.toFixed(6),
          long: pos.coords.longitude.toFixed(6),
        });
      },
      () => {
        setGPS({ lat: 19.0760, long: 72.8777 });
      }
    );
    setTimestamp(new Date().toLocaleString());
  }, []);

  const handleFile = (e) => {
    const uploaded = e.target.files[0];
    setFile(uploaded);
    setPreview(URL.createObjectURL(uploaded));
  };

  const handleProcessAI = async () => {
    if (!preview) return toast.error("Please upload an image first");
    setLoading(true);
    setTimeout(() => {
      const analysis = {
        severity: Math.random() > 0.7 ? "Critical" : Math.random() > 0.4 ? "High" : "Medium",
        waterDepth: +(Math.random() * 2.5 + 0.3).toFixed(2),
        confidence: +(0.85 + Math.random() * 0.12).toFixed(2),
        features: ["Standing Water", "Traffic Jam", "Road Damage"].slice(0, Math.floor(Math.random() * 2) + 1),
      };
      setAiResult(analysis);
      setLoading(false);
    }, 1500);
  };

  const handleSubmit = async () => {
    if (!currentUser) return navigate("/login");
    if (!preview || !aiResult) return toast.error("Complete AI analysis first");
    const payload = {
      lat: Number(gps.lat),
      lng: Number(gps.long),
      location: "User reported location",
      caption,
      photo: preview,
      aiAnalysis: aiResult,
    };

    // check for nearby cluster and show modal
    const nearby = findNearestCluster(payload.lat, payload.lng, 150);
    if (nearby) {
      setNearbyCluster(nearby.cluster);
      setPendingPayload(payload);
      setShowModal(true);
    } else {
      // no nearby cluster, create directly
      const res = submitReport(payload);
      if (res?.type === "created") {
        toast.success(`New incident created ${res.clusterId}`);
      }
      setTimeout(() => navigate(`/cluster/${res.clusterId}`), 600);
    }
  };

  const handleJoin = () => {
    if (!pendingPayload) return;
    const res = submitReport(pendingPayload);
    if (res?.type === "attached") {
      toast.success(`Report attached to ${res.clusterId}`);
    }
    setShowModal(false);
    setPendingPayload(null);
    setTimeout(() => navigate(`/cluster/${res.clusterId}`), 600);
  };

  const handleCreateNew = () => {
    if (!pendingPayload) return;
    const res = submitReport({ ...pendingPayload, forceCreate: true });
    if (res?.type === "created") {
      toast.success(`New incident created ${res.clusterId}`);
    }
    setShowModal(false);
    setPendingPayload(null);
    setTimeout(() => navigate(`/cluster/${res.clusterId}`), 600);
  };

  const handleCancel = () => {
    setShowModal(false);
    setPendingPayload(null);
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen px-6 md:px-20 py-16">

      {/* Modal for join/create */}
      <JoinOrCreateModal 
        cluster={nearbyCluster}
        onJoin={handleJoin}
        onCreate={handleCreateNew}
        onCancel={handleCancel}
      />

      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Report Waterlogging Incident
      </h1>

      <p className="text-gray-600 max-w-2xl mb-12">
        Upload a photo or video of waterlogging. Our AI will automatically detect
        severity, location, timestamp, and classify the situation.
      </p>

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT: Upload Box */}
        <div>
          <label
            htmlFor="upload"
            className="cursor-pointer border-2 border-dashed border-blue-400 rounded-xl bg-white p-10 flex flex-col items-center justify-center text-center hover:bg-blue-50 transition"
          >
            {!preview ? (
              <>
                <div className="text-blue-600 text-6xl mb-4">📤</div>
                <p className="font-semibold text-gray-700">
                  Drag & Drop or Click to Upload
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Upload image or video of waterlogging
                </p>
              </>
            ) : (
              <img
                src={preview}
                alt="Preview"
                className="w-full rounded-xl shadow-lg"
              />
            )}
          </label>

          <input
            id="upload"
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleFile}
          />
        </div>

        {/* RIGHT: Auto Extracted Info */}
        <div className="bg-white p-8 rounded-xl shadow">

          {/* GPS */}
          <div className="mb-6">
            <p className="text-xs font-bold text-gray-500 mb-1">GPS LOCATION</p>
            <div className="p-3 bg-gray-100 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">Latitude:</span> {gps.lat}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Longitude:</span> {gps.long}
              </p>
            </div>
          </div>

          {/* Timestamp */}
          <div className="mb-6">
            <p className="text-xs font-bold text-gray-500 mb-1">TIMESTAMP</p>
            <div className="p-3 bg-gray-100 rounded-lg">
              <p className="text-gray-700">{timestamp}</p>
            </div>
          </div>

          {/* AI Analysis Button */}
          <button
            onClick={handleProcessAI}
            disabled={!preview || loading}
            className={`w-full py-3 rounded-lg font-semibold transition mb-6 ${!preview ? "bg-gray-400 text-gray-600" : loading ? "bg-yellow-500 text-white" : "bg-purple-600 hover:bg-purple-700 text-white"}`}
          >
            {loading ? "🔄 AI Processing (1.5s)..." : "🤖 Run AI Analysis"}
          </button>

          {/* AI Result */}
          {aiResult && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
              <p className="text-xs font-bold text-blue-600 mb-2">AI ANALYSIS RESULT</p>
              <p className="text-gray-700 text-sm"><span className="font-semibold">Severity:</span> {aiResult.severity}</p>
              <p className="text-gray-700 text-sm"><span className="font-semibold">Water Depth:</span> {aiResult.waterDepth}m</p>
              <p className="text-gray-700 text-sm"><span className="font-semibold">Confidence:</span> {(aiResult.confidence * 100).toFixed(0)}%</p>
              <p className="text-gray-700 text-sm"><span className="font-semibold">Features:</span> {aiResult.features.join(", ")}</p>
            </div>
          )}

          {/* Notes */}
          <div className="mb-6">
            <p className="text-xs font-bold text-gray-500 mb-1">ADDITIONAL NOTES</p>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full border p-3 rounded-lg h-28"
              placeholder="Describe the situation (optional)"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button onClick={handleSubmit} disabled={!aiResult} className={`w-full py-3 rounded-lg font-semibold transition ${!aiResult ? "bg-gray-400 text-gray-600" : "bg-blue-600 hover:bg-blue-700 text-white"}` }>
            Submit Report
          </button>
        </div>

      </div>
    </div>
  );
}
