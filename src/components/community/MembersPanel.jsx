import React from "react";

export default function MembersPanel({ members = [] }) {
  return (
    <aside className="bg-gray-50 dark:bg-slate-900 rounded p-3 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Members</h4>
        <div className="text-xs text-gray-400">{members.length}</div>
      </div>

      <ul className="flex flex-col gap-2 text-sm">
        {members.map((m) => (
          <li key={m.id} className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800 cursor-default">
            {m.avatar ? (
              <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded object-cover" />
            ) : (
              <div className="w-8 h-8 rounded bg-black/80" />
            )}

            <div className="flex-1 text-left">
              <div className="font-medium">{m.name}</div>
              <div className="text-xs text-gray-400">{m.role}</div>
            </div>
            <div className="text-xs text-green-500">●</div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
