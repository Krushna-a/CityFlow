import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Report from "./pages/Report";
import Map from "./pages/Map";
import ClusterDetails from "./pages/ClusterDetails";
import Insights from "./pages/Insights";
import Profile from "./pages/Profile";
import ExpertDashboard from "./pages/ExpertDashboard";
import ExpertClusterReview from "./pages/ExpertClusterReview";
import SolutionEditor from "./pages/SolutionEditor";
import GovDashboard from "./pages/GovDashboard";
import CaseManagement from "./pages/CaseManagement";
import GovClusters from "./pages/GovClusters";
import GovCaseDetails from "./pages/GovCaseDetails";
import ActionPlanner from "./pages/ActionPlanner";
import FieldWorker from "./pages/FieldWorker";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import ExpertTasks from "./pages/ExpertTasks";
import Community from "./pages/Community";


export default function App() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/map" element={<Map />} />
          <Route path="/cluster/:id" element={<ClusterDetails />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/expert/dashboard" element={<ExpertDashboard />} />
          <Route path="/expert/cluster/:id" element={<ExpertClusterReview />} />
          <Route path="/expert/solutions/:id" element={<SolutionEditor />} />
          <Route path="/expert/tasks" element={<ExpertTasks />} />

          <Route path="/gov/dashboard" element={<GovDashboard />} />
          <Route path="/gov/cases" element={<CaseManagement />} />
          <Route path="/gov/clusters" element={<GovClusters />} />
          <Route path="/gov/cases/:id" element={<GovCaseDetails />} />
          <Route path="/gov/actions" element={<ActionPlanner />} />
          <Route path="/gov/field/:id" element={<FieldWorker />} />
          <Route path="/gov/analytics" element={<AnalyticsDashboard />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
