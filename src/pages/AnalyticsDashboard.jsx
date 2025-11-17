import React from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function AnalyticsDashboard() {
  const rainfallData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Rainfall (mm)",
        data: [22, 40, 12, 55, 78, 32, 15],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const severityData = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        label: "Cluster Severity",
        data: [12, 22, 8],
        backgroundColor: ["#dc2626", "#ca8a04", "#16a34a"],
      },
    ],
  };

  const reportsTrend = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Reports",
        data: [200, 320, 150, 420, 500, 390],
        backgroundColor: "#2563eb",
      },
    ],
  };

  const accuracyData = {
    labels: ["Accurate", "Needs Review"],
    datasets: [
      {
        label: "AI Model Accuracy",
        data: [85, 15],
        backgroundColor: ["#16a34a", "#dc2626"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 py-12">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
      <p className="text-gray-600 mb-10">
        Real-time insights on rainfall, clustering, AI performance, and flood patterns.
      </p>

      {/* METRIC CARDS */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Active Clusters</p>
          <p className="text-3xl font-bold text-blue-600">42</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Reports (Month)</p>
          <p className="text-3xl font-bold text-green-600">1,245</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">High Severity</p>
          <p className="text-3xl font-bold text-red-600">12</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">AI Accuracy</p>
          <p className="text-3xl font-bold text-purple-600">85%</p>
        </div>
      </div>

      {/* ANALYTICS CHART GRID */}
      <div className="grid lg:grid-cols-3 gap-10">

        {/* RAINFALL LINE CHART */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Weekly Rainfall</h2>
          <Line data={rainfallData} />
        </div>

        {/* SEVERITY DOUGHNUT */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Severity Distribution</h2>
          <Doughnut data={severityData} />
        </div>

        {/* REPORT TREND BAR */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Monthly Reports</h2>
          <Bar data={reportsTrend} />
        </div>

        {/* AI ACCURACY */}
        <div className="bg-white p-6 rounded-xl shadow lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">AI Model Accuracy</h2>
          <Doughnut data={accuracyData} />
        </div>

        {/* PLACEHOLDER FOR HEATMAP */}
        <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Flood Heatmap Overview</h2>

          <div className="h-52 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            Heatmap (Integrate later with Mapbox/Leaflet)
          </div>
        </div>

      </div>
    </div>
  );
}
