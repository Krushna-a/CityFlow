import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMockData } from "../context/MockDataContext";
import toast from "react-hot-toast";
import Logo from "./Logo";

export default function Navbar() {
  const navigate = useNavigate();
  const { currentUser, logout } = useMockData();

  const exploreLinks = [
    { label: "Home", href: "/" },
    { label: "Map", href: "/map" },
    { label: "Community", href: "/community" },
  ];

  const actionLinks = currentUser ? (
    currentUser.role === "citizen" ? [
      { label: "Report", href: "/report" },
      { label: "Profile", href: "/profile" },
    ] : currentUser.role === "expert" ? [
      { label: "Dashboard", href: "/expert/dashboard" },
      { label: "Tasks", href: "/expert/tasks" },
    ] : currentUser.role === "government" ? [
      { label: "Dashboard", href: "/gov/dashboard" },
      { label: "Cases", href: "/gov/cases" },
    ] : [
      { label: "Tasks", href: "/field/tasks" },
    ]
  ) : [];

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white shadow-sm flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center hover:opacity-90">
          <Logo className="ml-1" />
        </Link>
      </div>

      <div className="hidden lg:flex gap-10 items-start">
        <div>
          <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Explore</div>
          <div className="flex gap-6">
            {exploreLinks.map((link) => (
              <Link key={link.href} to={link.href} className="text-sm text-gray-700 hover:text-blue-600 transition">{link.label}</Link>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Actions</div>
          <div className="flex gap-6">
            {actionLinks.map((link) => (
              <Link key={link.href} to={link.href} className="text-sm text-gray-700 hover:text-blue-600 transition">{link.label}</Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <input type="search" placeholder="Search clusters" className="border rounded px-3 py-1 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </div>

        {currentUser ? (
          <div className="flex items-center gap-3">
            <Link to="/profile" className="text-sm text-gray-700 hover:text-blue-600 transition">{currentUser.name}</Link>
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm transition">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm transition">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
