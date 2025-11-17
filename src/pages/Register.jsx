import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMockData } from "../context/MockDataContext";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useMockData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("citizen");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e && e.preventDefault();
    if (password !== confirm) return toast.error("Passwords do not match");
    setLoading(true);
    const res = register(name, email, password, role);
    setTimeout(() => {
      setLoading(false);
      if (res.success) {
        toast.success("Account created");
        if (res.user.role === "expert") navigate("/expert/dashboard");
        else if (res.user.role === "government") navigate("/gov/dashboard");
        else if (res.user.role === "field-worker") navigate("/field/tasks");
        else navigate("/");
      } else {
        toast.error(res.error || "Registration failed");
      }
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold mb-2 text-center">Create Account</h1>
        <p className="text-gray-600 text-center mb-6">Join CityFlow today</p>

        {/* NAME */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-600">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-lg mt-1"
            placeholder="John Doe"
          />
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-600">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg mt-1"
            placeholder="you@example.com"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg mt-1"
            placeholder="Create password"
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-gray-600">Confirm Password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border p-3 rounded-lg mt-1"
            placeholder="Confirm password"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-600">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border p-3 rounded-lg mt-1">
            <option value="citizen">Citizen</option>
            <option value="expert">Expert</option>
            <option value="government">Government</option>
            <option value="field-worker">Field Worker</option>
          </select>
        </div>

        {/* REGISTER BUTTON */}
        <button type="submit" disabled={loading} className={`w-full ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white py-3 rounded-lg font-medium mb-4`}>
          {loading ? "Creating..." : "Create Account"}
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-gray-700">
          Already have an account? {" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login</Link>
        </p>

      </form>

    </div>
  );
}
