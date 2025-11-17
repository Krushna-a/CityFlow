import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useMockData } from "../context/MockDataContext";
import toast from "react-hot-toast";

export default function FieldWorker() {
  const { currentUser, getFieldTasks, completeFieldTask, updateFieldTaskPhotos } = useMockData();
  const [upload, setUpload] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [loading, setLoading] = useState(false);

  const tasks = getFieldTasks(currentUser.id);
  const activeTasks = tasks.filter(t => !t.completed);
  const selectedTask = activeTasks[0] || { 
    id: "FT-001", 
    description: "Complete field assessment", 
    location: "Central Zone", 
    lat: 19.0760, 
    long: 72.8777, 
    priority: "High" 
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpload(URL.createObjectURL(file));
    }
  };

  const handleCompleteTask = async () => {
    if (!upload) {
      toast.error("Please upload a photo before completing");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      completeFieldTask(selectedTask.id);
      updateFieldTaskPhotos(selectedTask.id, [upload]);
      setUpload(null);
      setLoading(false);
      toast.success("Task completed and photos saved!");
    }, 600);
  };

  const severityColor = selectedTask.priority === "High"
    ? "bg-red-600"
    : selectedTask.priority === "Medium"
    ? "bg-yellow-600"
    : "bg-green-600";

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 md:px-20">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">Field Tasks</h1>
      <p className="text-gray-600 mb-6">Active: {activeTasks.length} | Completed: {tasks.filter(t => t.completed).length}</p>

      {/* SEVERITY BADGE */}
      <span
        className={`${severityColor} text-white px-4 py-1 rounded-full text-sm font-semibold`}
      >
        Priority: {selectedTask.priority || "Medium"}
      </span>

      {/* MAP PREVIEW */}
      <div className="bg-white p-4 rounded-xl shadow mt-6">
        <h2 className="text-lg font-semibold mb-2">Task Location</h2>

        <div className="h-60 rounded-lg overflow-hidden">
          <MapContainer
            center={[selectedTask.lat || 19.0760, selectedTask.lng || selectedTask.long || 72.8777]}
            zoom={16}
            className="w-full h-full"
          >
            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[selectedTask.lat || 19.0760, selectedTask.lng || selectedTask.long || 72.8777]} />
          </MapContainer>
        </div>

        <p className="text-gray-600 mt-3">{selectedTask.location || "Field location"}</p>
      </div>

      {/* TASK DESCRIPTION */}
      <div className="bg-white p-4 rounded-xl shadow mt-6">
        <h2 className="text-lg font-semibold mb-3">Task Details</h2>

        <div className="space-y-3">
          <div>
            <p className="text-gray-600 text-sm">Task ID</p>
            <p className="font-semibold">{selectedTask.id}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Description</p>
            <p className="font-semibold">{selectedTask.description}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Priority</p>
            <p className="font-semibold capitalize">{selectedTask.priority || "Medium"}</p>
          </div>
        </div>
      </div>

      {/* PHOTO UPLOAD */}
      <div className="bg-white p-4 rounded-xl shadow mt-6">
        <h2 className="text-lg font-semibold mb-3">Upload Work Photo</h2>

        {!upload ? (
          <label
            className="cursor-pointer bg-blue-600 text-white px-4 py-3 rounded-lg block text-center hover:bg-blue-700 transition"
          >
            Take/Upload Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        ) : (
          <div>
            <img
              src={upload}
              className="rounded-lg w-full h-48 object-cover mb-3"
            />
            <button
              onClick={() => setUpload(null)}
              className="w-full bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
            >
              Replace Photo
            </button>
          </div>
        )}
      </div>

      {/* COMPLETE TASK */}
      <div className="bg-white p-4 rounded-xl shadow mt-6">
        <button
          onClick={handleCompleteTask}
          disabled={loading || !upload}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-3 rounded-lg font-medium transition"
        >
          {loading ? "Completing..." : "Complete Task & Submit"}
        </button>
      </div>

      {/* TASK LIST */}
      {activeTasks.length > 1 && (
        <div className="bg-white p-4 rounded-xl shadow mt-6">
          <h2 className="text-lg font-semibold mb-3">Other Active Tasks</h2>

          <div className="space-y-3">
            {activeTasks.slice(1).map((t) => (
              <div key={t.id} className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                <p className="font-semibold">{t.id}</p>
                <p className="text-gray-600 text-sm">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
