import React, { useState, useEffect } from "react";
import Sidebar from "../components/community/Sidebar";
import ChannelList from "../components/community/ChannelList";
import ChatWindow from "../components/community/ChatWindow";
import MembersPanel from "../components/community/MembersPanel";
import ResetDemoButton from "../components/community/ResetDemoButton";
import { useMockData } from "../context/MockDataContext";
import toast from "react-hot-toast";

export default function Community() {
  const { currentUser } = useMockData();
  const [selectedChannel, setSelectedChannel] = useState("general");

  const defaultChannels = [
    { id: "general", name: "general", topic: "General discussion" },
    { id: "experts", name: "experts", topic: "Expert Q&A" },
    { id: "local", name: "local", topic: "Local updates" },
  ];

  const defaultMembers = [
    { id: 1, name: "Asha (Expert)", role: "expert" },
    { id: 2, name: "Ravi", role: "citizen" },
    { id: 3, name: "Gov Team", role: "gov" },
  ];

  // Load persisted community messages from localStorage
  const [channels] = useState(defaultChannels);
  const [members, setMembers] = useState(() => {
    try {
      const raw = localStorage.getItem("community_members");
      return raw ? JSON.parse(raw) : defaultMembers;
    } catch (err) {
      return defaultMembers;
    }
  });

  const [messagesByChannel, setMessagesByChannel] = useState(() => {
    try {
      const raw = localStorage.getItem("community_messages");
      if (raw) return JSON.parse(raw);
      return {
        general: [
          { id: 1, author: "Asha", text: "Welcome to the community!", time: "09:00" },
          { id: 2, author: "Ravi", text: "Hi everyone — how do I report a blocked drain?", time: "09:05" },
        ],
        experts: [
          { id: 1, author: "Asha", text: "Experts: check the flood model updates.", time: "08:40" },
        ],
        local: [
          { id: 1, author: "Gov Team", text: "Field teams are on route to Sector 5.", time: "07:20" },
        ],
      };
    } catch (err) {
      return {
        general: [],
        experts: [],
        local: [],
      };
    }
  });

  // WebSocket connection for real-time demo
  const [ws, setWs] = useState(null);

  useEffect(() => {
    let socket;
    try {
      const url = (window.__WS_DEMO_URL__ && window.__WS_DEMO_URL__) || "ws://localhost:8080";
      socket = new WebSocket(url);
      socket.addEventListener('open', () => {
        console.log('WS connected to', url);
        toast.success('Connected to community (real-time)');
      });

      socket.addEventListener('message', (ev) => {
        try {
          const data = JSON.parse(ev.data);
          if (data.type === 'history' && data.payload) {
            setMessagesByChannel((prev) => ({ ...prev, ...data.payload }));
          }
          if (data.type === 'chat' && data.channel && data.message) {
            setMessagesByChannel((prev) => {
              const forChannel = prev[data.channel] ? [...prev[data.channel], data.message] : [data.message];
              return { ...prev, [data.channel]: forChannel };
            });
          }
        } catch (err) {
          console.warn('WS parse error', err);
        }
      });

      socket.addEventListener('close', () => {
        console.log('WS disconnected');
        toast.error('Disconnected from community');
      });
      setWs(socket);
    } catch (err) {
      console.warn('WS connection failed', err);
      toast.error('Real-time connection unavailable');
    }

    return () => {
      if (socket) socket.close();
    };
  }, []);

  // Persist messages and members
  useEffect(() => {
    try {
      localStorage.setItem("community_messages", JSON.stringify(messagesByChannel));
      localStorage.setItem("community_members", JSON.stringify(members));
    } catch (err) {
      console.warn("Failed to save community data:", err);
    }
  }, [messagesByChannel, members]);

  const handleSend = (channelId, message) => {
    // Add avatar/time if available
    const enriched = {
      ...message,
      avatar: message.avatar || currentUser?.avatar,
      author: message.author || currentUser?.name || 'You',
      time: message.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // optimistic local update
    setMessagesByChannel((prev) => {
      const forChannel = prev[channelId] ? [...prev[channelId], enriched] : [enriched];
      return { ...prev, [channelId]: forChannel };
    });

    // send to WS if available
    try {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'chat', channel: channelId, message: enriched }));
      }
    } catch (err) {
      console.warn('WS send failed, fallback to local only', err);
    }
  };

  return (
    <div className="w-full flex flex-1">
      <div className="w-full max-w-[1280px] mx-auto px-4 py-6">
        <div className="flex items-center justify-end mb-3">
          <ResetDemoButton />
        </div>

        <div className="grid grid-cols-[240px_1fr_220px] gap-4 min-h-[60vh]">
          <Sidebar />

          <div className="flex flex-col bg-white dark:bg-slate-800 rounded shadow-sm overflow-hidden">
            <ChannelList
              channels={channels}
              selected={selectedChannel}
              onSelect={setSelectedChannel}
            />

            <ChatWindow
              messages={messagesByChannel[selectedChannel] || []}
              channel={selectedChannel}
              onSend={handleSend}
              currentUserName={currentUser?.name || "You"}
            />
          </div>

          <MembersPanel members={members} />
        </div>
      </div>
    </div>
  );
}
