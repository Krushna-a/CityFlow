import React from "react";

export default function ChannelList({ channels = [], selected, onSelect }) {
  return (
    <div className="border-b border-gray-100 dark:border-slate-700 p-3">
      <div className="flex items-center justify-between mb-2 px-1">
        <h4 className="text-sm font-medium">Channels</h4>
        <button className="text-xs text-blue-500">New</button>
      </div>

      <ul className="flex flex-col gap-1 px-1">
        {channels.map((ch) => (
          <li
            key={ch.id}
            onClick={() => onSelect(ch.id)}
            className={`text-sm px-2 py-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 ${
              selected === ch.id ? "bg-gray-100 dark:bg-slate-800 font-semibold" : ""
            }`}
          >
            #{ch.name}
            <div className="text-xs text-gray-400">{ch.topic}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
