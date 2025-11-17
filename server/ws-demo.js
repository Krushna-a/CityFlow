import { WebSocketServer } from 'ws';

const PORT = process.env.PORT || 8080;
const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket demo server listening on ws://localhost:${PORT}`);

// In-memory message history per channel
const history = {
  general: [],
  experts: [],
  local: [],
};

function broadcast(data, exclude) {
  const raw = JSON.stringify(data);
  for (const client of wss.clients) {
    if (client.readyState === 1 && client !== exclude) {
      client.send(raw);
    }
  }
}

wss.on('connection', (ws) => {
  console.log('client connected');

  // Send current history to client
  ws.send(JSON.stringify({ type: 'history', payload: history }));

  ws.on('message', (raw) => {
    try {
      const msg = JSON.parse(raw.toString());
      if (msg?.type === 'chat' && msg.channel && msg.message) {
        // attach server id/time
        const serverMessage = {
          ...msg.message,
          id: Date.now() + Math.floor(Math.random() * 1000),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        history[msg.channel] = history[msg.channel] ? [...history[msg.channel], serverMessage] : [serverMessage];
        broadcast({ type: 'chat', channel: msg.channel, message: serverMessage }, null);
      }
    } catch (err) {
      console.warn('invalid message', err);
    }
  });

  ws.on('close', () => {
    console.log('client disconnected');
  });
});

process.on('SIGINT', () => {
  console.log('Shutting down ws server');
  wss.close(() => process.exit(0));
});
