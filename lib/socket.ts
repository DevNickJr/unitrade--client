import { io, Socket } from "socket.io-client"
import { getTokens } from "./api-client"

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "http://localhost:4002"

let socket: Socket | null = null

export function getSocket(): Socket | null {
  return socket
}

export function connectSocket(): Socket {
  if (socket?.connected) return socket

  const tokens = getTokens()
  socket = io(SOCKET_URL, {
    auth: { token: tokens?.accessToken },
  })

  return socket
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
