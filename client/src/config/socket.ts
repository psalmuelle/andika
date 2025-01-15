import { io } from "socket.io-client";

export default function socketInstance() {
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
    withCredentials: true,
  });

  return socket;
}
