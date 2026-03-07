import { io } from 'socket.io-client';

let socket = null;

export const getSocket = () => socket;

export function connectSocket(token) {
  if (socket?.connected) return socket;
  socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001', {
    auth: { token },
    transports: ['websocket'],
  });
  socket.on('connect',       () => console.log('🔌 Socket connected'));
  socket.on('disconnect',    (r) => console.log('🔌 Disconnected:', r));
  socket.on('connect_error', (e) => console.error('Socket error:', e.message));
  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}
