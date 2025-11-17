import React from "react";

export default function ResetDemoButton() {
  const handleReset = () => {
    if (!confirm("Clear demo data from localStorage and reload the app?")) return;
    try {
      localStorage.removeItem("mockData");
      localStorage.removeItem("community_messages");
      localStorage.removeItem("community_members");
      location.reload();
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <button onClick={handleReset} className="text-xs text-red-600 hover:underline">
      Reset Demo
    </button>
  );
}
