import { io } from "socket.io-client";

export default function socketInstance() {
  const socket = io("http://localhost:8000", {
    withCredentials: true,
  });

  return socket;
}