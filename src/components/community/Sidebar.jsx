import React from "react";

export default function Sidebar() {
  return (
    <aside className="bg-gray-50 dark:bg-slate-900 rounded p-3 flex flex-col gap-4">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-sm font-semibold">Community</h3>
        <button className="text-xs text-blue-500">+ Join</button>
      </div>

      <div className="px-2">
        <div className="text-xs text-gray-500 mb-2">Servers</div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer">
            <div className="w-8 h-8 rounded bg-black/80 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="s1" x1="0" x2="1">
                    <stop offset="0%" stopColor="#22c1c3" />
                    <stop offset="100%" stopColor="#2a9df4" />
                  </linearGradient>
                </defs>
                <path d="M8 28c4-6 8-8 12-5s8 1 14-5" stroke="url(#s1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-sm">CityFlow</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
