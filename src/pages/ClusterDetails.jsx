import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMockData } from "../context/MockDataContext";
import toast from "react-hot-toast";

// ============ DISCUSSION THREAD ============
function DiscussionThread({ clusterId }) {
  const { getCommentsForCluster, addComment, getUserById, currentUser } = useMockData();
  const [text, setText] = useState("");

  const comments = getCommentsForCluster(clusterId);

  const submit = () => {
    if (!currentUser) return toast.error("Please login to comment");
    if (!text.trim()) return;
    addComment(clusterId, currentUser.id, text.trim(), currentUser.role || "citizen");
    setText("");
    toast.success("Comment added");
  };

  const getRoleBadgeColor = (role) => {
    switch(role) {
      case "expert": return "bg-purple-100 text-purple-700";
      case "government": return "bg-blue-100 text-blue-700";
      case "field-worker": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <div className="space-y-3 max-h-64 overflow-auto mb-4">
        {comments.length === 0 && <p className="text-sm text-gray-500">No discussion yet. Be the first to share insights.</p>}
        {comments.map((c) => {
          const user = getUserById(c.userId);
          return (
            <div key={c.id} className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{user?.name || c.userId}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadgeColor(c.role)}`}>
                      {c.role}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{new Date(c.createdAt).toLocaleString()}</div>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{c.text}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-50 rounded-lg p-3">
        <textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          className="w-full border rounded p-2 mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Share your insights, observations, or recommendations..." 
          rows="3"
        />
        <button 
          onClick={submit} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
}

// ============ EXPERT VALIDATION ============
function ExpertValidation({ cluster, clusterId }) {
  const { getCommentsForCluster, currentUser } = useMockData();
  const comments = getCommentsForCluster(clusterId);
  const expertComments = comments.filter(c => c.role === "expert");

  return (
    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
        <h3 className="font-semibold text-purple-900">Expert Validation</h3>
      </div>
      
      <div className="bg-white rounded p-3 mb-3">
        {expertComments.length === 0 ? (
          <p className="text-sm text-gray-600">Waiting for expert review and technical insights...</p>
        ) : (
          <div className="space-y-2">
            {expertComments.slice(-2).map(c => (
              <div key={c.id} className="text-sm border-l-2 border-purple-300 pl-3">
                <p className="text-gray-700 italic">{c.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {currentUser?.role === "expert" && (
        <p className="text-xs text-purple-700 bg-white rounded p-2">
          💡 As an expert, add your technical analysis in the discussion above to help validate the cluster.
        </p>
      )}
    </div>
  );
}

// ============ RECOMMENDATIONS PANEL ============
function RecommendationPanel({ cluster, clusterId }) {
  const { getRecommendationsForCluster, generateRecommendations } = useMockData();
  const recs = getRecommendationsForCluster(clusterId) || [];

  const handleGenerate = () => {
    generateRecommendations(cluster);
    toast.success("Solutions recommended");
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "High": return "border-l-4 border-red-500 bg-red-50";
      case "Medium": return "border-l-4 border-yellow-500 bg-yellow-50";
      case "Low": return "border-l-4 border-green-500 bg-green-50";
      default: return "border-l-4 border-gray-500 bg-gray-50";
    }
  };

  return (
    <div>
      <div className="space-y-3 mb-4">
        {recs.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 text-center">
            Generate recommendations based on incident severity and data
          </div>
        ) : (
          recs.map((r) => (
            <div key={r.id} className={`rounded-lg p-3 ${getPriorityColor(r.priority)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-sm text-gray-900">{r.priority} Priority</div>
                  <p className="text-sm text-gray-700 mt-1">{r.text}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <button 
        onClick={handleGenerate} 
        className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition"
      >
        {recs.length > 0 ? "Regenerate" : "Generate"} Recommendations
      </button>
    </div>
  );
}

// ============ GOVERNMENT ACTIONS ============
function GovernmentActions({ cluster, clusterId }) {
  const { cases, updateCaseStatus, currentUser } = useMockData();
  const caseForCluster = cases.find(c => c.clusterId === clusterId);
  
  if (!caseForCluster) return null;

  const handleStatusChange = (newStatus) => {
    updateCaseStatus(caseForCluster.id, newStatus);
    toast.success(`Case status updated to ${newStatus}`);
  };

  const statuses = ["Pending", "Under Review", "Approved", "In Progress", "Completed"];
  const currentStatus = caseForCluster.status;
  const currentIndex = statuses.indexOf(currentStatus);

  const getStatusColor = (status) => {
    switch(status) {
      case "Pending": return "bg-gray-100 text-gray-700";
      case "Under Review": return "bg-blue-100 text-blue-700";
      case "Approved": return "bg-green-100 text-green-700";
      case "In Progress": return "bg-orange-100 text-orange-700";
      case "Completed": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
        <h3 className="font-semibold text-blue-900">Government Response</h3>
      </div>

      {/* Status Timeline */}
      <div className="bg-white rounded-lg p-3 mb-4">
        <p className="text-xs text-gray-600 mb-2 font-medium">Case Status: {caseForCluster.id}</p>
        <div className="flex gap-2 flex-wrap">
          {statuses.map((status, idx) => (
            <div key={status}>
              <button
                onClick={() => currentIndex < idx || currentUser?.role === "government" ? handleStatusChange(status) : null}
                className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                  currentStatus === status 
                    ? `${getStatusColor(status)} ring-2 ring-offset-1 ring-gray-400` 
                    : `${getStatusColor(status)} opacity-60 hover:opacity-100`
                }`}
              >
                {status}
              </button>
              {idx < statuses.length - 1 && <div className="text-gray-300 text-center">→</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Priority Badge */}
      <div className="bg-white rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Priority</span>
          <span className={`px-2 py-1 rounded text-xs font-bold ${
            caseForCluster.priority === 0 ? "bg-red-100 text-red-700" :
            caseForCluster.priority === 1 ? "bg-orange-100 text-orange-700" :
            "bg-yellow-100 text-yellow-700"
          }`}>
            {caseForCluster.priority === 0 ? "CRITICAL" : caseForCluster.priority === 1 ? "HIGH" : "MEDIUM"}
          </span>
        </div>
      </div>

      {currentUser?.role === "government" && (
        <p className="text-xs text-blue-700 bg-white rounded p-2">
          ✓ You can update the case status to coordinate field teams and track work progress.
        </p>
      )}
    </div>
  );
}

// ============ FIELD WORK TRACKING ============
function FieldWorkTracking({ caseId, clusterId }) {
  const { cases } = useMockData();
  const caseData = cases.find(c => c.id === caseId);

  if (!caseData || !caseData.workDone || caseData.workDone.length === 0) {
    return (
      <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
          <h3 className="font-semibold text-orange-900">Field Work Progress</h3>
        </div>
        <p className="text-sm text-orange-700">Waiting for field work to begin...</p>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
        <h3 className="font-semibold text-orange-900">Field Work Progress</h3>
      </div>

      <div className="space-y-2">
        {caseData.workDone.map((work, idx) => (
          <div key={idx} className="bg-white rounded-lg p-2 text-sm border-l-4 border-orange-500">
            <p className="font-medium text-gray-900">{work.description}</p>
            <p className="text-xs text-gray-500">{new Date(work.date).toLocaleString()}</p>
            {work.image && (
              <img src={work.image} alt="Work" className="mt-2 rounded w-full h-24 object-cover" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ LINKED REPORTS ============
function LinkedReports({ clusterId, reports, getUserById }) {
  const linked = reports.filter((r) => r.clusterId === clusterId);

  const getSeverityColor = (severity) => {
    switch(severity) {
      case "Critical": return "bg-red-900 text-white";
      case "High": return "bg-red-600 text-white";
      case "Medium": return "bg-yellow-500 text-white";
      default: return "bg-green-600 text-white";
    }
  };

  return (
    <div>
      {linked.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No linked reports yet.</p>}
      <div className="space-y-2">
        {linked.map((r) => (
          <div key={r.id} className="border rounded-lg p-3 hover:bg-gray-50 transition">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-semibold text-sm">{r.id}</div>
                <div className="text-xs text-gray-500">{new Date(r.timestamp).toLocaleString()}</div>
                <div className="text-xs text-gray-600 mt-1">By {getUserById(r.userId)?.name || r.userId}</div>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(r.severity)}`}>
                {r.severity}
              </div>
            </div>
            <p className="text-sm text-gray-700">{r.description || r.caption || "No description"}</p>
            {r.image && (
              <img src={r.image} alt="Report" className="mt-2 rounded w-20 h-20 object-cover" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClusterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getClusterById, cases, currentUser, reports, getUserById } = useMockData();

  const cluster = getClusterById(id || "C-4821") || {
    id: "C-4821",
    lat: 19.076,
    lng: 72.8777,
    severity: "High",
    reports: 6,
    location: "Bandra Link Road",
    status: "Under Review",
    riskScore: 82,
    waterDepth: 1.2,
    images: [
      "https://images.unsplash.com/photo-1600393336923-8a3250a3faad?q=80",
      "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80",
      "https://images.unsplash.com/photo-1541690217667-815ce5f95e4f?q=80",
    ],
  };

  const caseForCluster = cases.find(c => c.clusterId === cluster.id);

  const getSeverityBg = (severity) => {
    switch(severity) {
      case "Critical": return "bg-red-100 text-red-900";
      case "High": return "bg-red-100 text-red-900";
      case "Medium": return "bg-yellow-100 text-yellow-900";
      default: return "bg-green-100 text-green-900";
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 px-6 md:px-20 py-12">
      
      {/* ================= HEADER ================= */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-1">{cluster.name || cluster.location}</h1>
            <p className="text-gray-600 text-lg">{cluster.location}</p>
          </div>
          <button
            onClick={() => navigate("/map")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            ← Back to Map
          </button>
        </div>

        <div className="flex gap-3 flex-wrap items-center">
          <span className={`px-4 py-2 rounded-full text-sm font-bold ${getSeverityBg(cluster.severity)}`}>
            🚨 {cluster.severity}
          </span>
          <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
            {cluster.reports} Reports
          </span>
          <span className="bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full text-sm font-semibold">
            Water Depth: {cluster.waterDepth}m
          </span>
          <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
            Risk: {cluster.riskScore}%
          </span>
          {caseForCluster && (
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
              Status: {caseForCluster.status}
            </span>
          )}
        </div>
      </div>

      {/* ================= WORKFLOW VISUALIZATION ================= */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-t-4 border-blue-600">
        <h3 className="font-bold text-lg mb-4">📊 Incident Resolution Workflow</h3>
        <div className="flex items-center justify-between flex-wrap gap-3 text-center">
          <div className="flex-1 min-w-[120px]">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 font-bold text-blue-700">1</div>
            <p className="text-xs font-semibold">Citizens Report</p>
            <p className="text-xs text-gray-600">Upload photos</p>
          </div>
          <div className="hidden sm:block text-gray-400 font-bold text-lg">→</div>
          <div className="flex-1 min-w-[120px]">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 font-bold text-blue-700">2</div>
            <p className="text-xs font-semibold">Auto Cluster</p>
            <p className="text-xs text-gray-600">Deduplicate</p>
          </div>
          <div className="hidden sm:block text-gray-400 font-bold text-lg">→</div>
          <div className="flex-1 min-w-[120px]">
            <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 font-bold text-purple-700">3</div>
            <p className="text-xs font-semibold">Expert Review</p>
            <p className="text-xs text-gray-600">Validate data</p>
          </div>
          <div className="hidden sm:block text-gray-400 font-bold text-lg">→</div>
          <div className="flex-1 min-w-[120px]">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 font-bold text-blue-700">4</div>
            <p className="text-xs font-semibold">Govt Action</p>
            <p className="text-xs text-gray-600">Assign workers</p>
          </div>
          <div className="hidden sm:block text-gray-400 font-bold text-lg">→</div>
          <div className="flex-1 min-w-[120px]">
            <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 font-bold text-orange-700">5</div>
            <p className="text-xs font-semibold">Live Updates</p>
            <p className="text-xs text-gray-600">Work progress</p>
          </div>
        </div>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN - Media & Metrics */}
        <div className="lg:col-span-2 space-y-8">

          {/* MAP */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-lg font-bold mb-4">📍 Incident Location</h2>
            <div className="w-full h-80 rounded-lg overflow-hidden border">
              <MapContainer
                center={[cluster.lat || 19.0760, cluster.lng || 72.8777]}
                zoom={15}
                className="w-full h-full"
              >
                <TileLayer 
                  attribution='© OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[cluster.lat || 19.0760, cluster.lng || 72.8777]}>
                  <Popup>{cluster.id}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          {/* GALLERY */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-lg font-bold mb-4">📷 Citizen Photos & Videos</h2>
            <div className="grid grid-cols-3 gap-3">
              {cluster.images && cluster.images.length > 0 ? (
                cluster.images.map((img, i) => (
                  <img 
                    key={i}
                    src={img}
                    className="rounded-lg h-32 w-full object-cover shadow-sm hover:shadow-md transition"
                  />
                ))
              ) : (
                <p className="text-sm text-gray-600 col-span-3">No media uploaded yet</p>
              )}
            </div>
          </div>

          {/* METRICS */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-lg font-bold mb-4">📊 Cluster Metrics</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm font-medium">Total Reports</p>
                <p className="text-3xl font-bold text-blue-600">{cluster.reports}</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm font-medium">Risk Score</p>
                <p className="text-3xl font-bold text-red-600">{cluster.riskScore}%</p>
              </div>
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm font-medium">Water Depth</p>
                <p className="text-3xl font-bold text-cyan-600">{cluster.waterDepth}m</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm font-medium">Severity</p>
                <p className="text-3xl font-bold text-orange-600">{cluster.severity}</p>
              </div>
            </div>
          </div>

          {/* LINKED REPORTS */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-lg font-bold mb-4">👥 Citizen Reports ({cluster.reports})</h2>
            <LinkedReports clusterId={cluster.id} reports={reports} getUserById={getUserById} />
          </div>

        </div>

        {/* RIGHT COLUMN - Discussion, Actions, Recommendations */}
        <div className="space-y-6">

          {/* EXPERT VALIDATION */}
          <ExpertValidation cluster={cluster} clusterId={cluster.id} />

          {/* DISCUSSION THREAD */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-lg font-bold mb-4">💬 Discussion Hub</h2>
            <DiscussionThread clusterId={cluster.id} />
          </div>

          {/* RECOMMENDATIONS */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-lg font-bold mb-4">💡 Expert Recommendations</h2>
            <RecommendationPanel cluster={cluster} clusterId={cluster.id} />
          </div>

          {/* GOVERNMENT ACTIONS */}
          {caseForCluster && (
            <GovernmentActions cluster={cluster} clusterId={cluster.id} />
          )}

          {/* FIELD WORK TRACKING */}
          {caseForCluster && caseForCluster.workDone && caseForCluster.workDone.length > 0 && (
            <FieldWorkTracking caseId={caseForCluster.id} clusterId={cluster.id} />
          )}

          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-lg font-bold mb-4">⚡ Quick Actions</h2>
            <div className="space-y-2">
              <button
                onClick={() => navigate("/report")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                + Add Report
              </button>
              <button
                onClick={() => navigate("/expert/dashboard")}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                📋 Expert Review
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
