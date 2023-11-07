import io from "socket.io-client";
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://universe-backend-dogg.onrender.com"
    : "//localhost:3030";

export const socketService = createSocketService();

socketService.setup();

function createSocketService() {
  var socket = null;
  const socketService = {
    setup() {
      socket = io(BASE_URL);
    },

    on(eventName, cb) {
      socket.on(eventName, cb);
    },

    off(eventName, cb) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName);
      else socket.off(eventName, cb);
    },

    emit(eventName, data) {
      socket.emit(eventName, data);
    },

    terminate() {
      socket = null;
    },
  };
  return socketService;
}
