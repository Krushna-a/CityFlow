import React from "react";

export default function Logo({ compact = false, className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={compact ? 28 : 36} height={compact ? 28 : 36} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-none">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#22c1c3" />
            <stop offset="100%" stopColor="#2a9df4" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="12" fill="#ffffff" />
        <path d="M10 38c6-8 12-10 18-6s12 2 20-6" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M44 18c3 2 6 6 6 10 0 7-6 12-12 12s-12-5-12-12 6-10 6-10" stroke="#2a9df4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="46" cy="18" r="3" fill="#2a9df4" />
      </svg>

      {!compact && (
        <div className="leading-tight">
          <div className="text-lg font-bold text-gray-900">CityFlow</div>
          <div className="text-xs text-gray-500 -mt-0.5">Flood Response Platform</div>
        </div>
      )}
    </div>
  );
}
