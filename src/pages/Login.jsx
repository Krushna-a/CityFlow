import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMockData } from "../context/MockDataContext";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useMockData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e && e.preventDefault();
    setLoading(true);
    const res = login(email, password);
    setTimeout(() => {
      setLoading(false);
      if (res.success) {
        toast.success("Login successful");
        const role = res.user.role;
        if (role === "expert") navigate("/expert/dashboard");
        else if (role === "government") navigate("/gov/dashboard");
        else if (role === "field-worker") navigate("/field/tasks");
        else navigate("/");
      } else {
        toast.error(res.error || "Login failed");
      }
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-600 text-center mb-6">Log in to continue</p>

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
            placeholder="Enter password"
          />
        </div>

        <div className="text-right mb-4">
          <Link to="/forgot" className="text-blue-600 text-sm hover:underline">Forgot Password?</Link>
        </div>

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white py-3 rounded-lg font-medium mb-4`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* REGISTER LINK */}
        <p className="text-center text-gray-700">
          Don’t have an account? {" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">Register</Link>
        </p>

      </form>

    </div>
  );
}
