import React, { useState } from "react";

export default function ChatWindow({ messages = [], channel, onSend, currentUserName = "You" }) {
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const payload = {
      id: Date.now(),
      author: currentUserName,
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    if (typeof onSend === "function") onSend(channel, payload);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between">
        <div>
          <h5 className="text-sm font-semibold">#{channel}</h5>
          <div className="text-xs text-gray-400">Channel topic or description</div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto bg-white dark:bg-slate-800">
        {messages?.map((m) => (
          <div key={m.id} className="mb-3 flex items-start gap-3">
            <div>
              {m.avatar ? (
                <img src={m.avatar} alt={m.author} className="w-8 h-8 rounded object-cover" />
              ) : (
                <div className="w-8 h-8 rounded bg-black/80" />
              )}
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium">
                {m.author} <span className="text-xs text-gray-400 ml-2">{m.time}</span>
              </div>
              <div className="text-sm text-gray-800 dark:text-gray-200">{m.text}</div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-3 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3 py-2 rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            placeholder={`Message #${channel}`}
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded">Send</button>
        </div>
      </form>
    </div>
  );
}
