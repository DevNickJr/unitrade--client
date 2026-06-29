"use client"

import { useEffect, useRef } from "react"
import { io, Socket } from "socket.io-client"
import { getTokens } from "@/lib/api-client"

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "http://localhost:4002"

export function useSocket() {
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    const tokens = getTokens()
    if (!tokens?.accessToken) return

    const socket = io(SOCKET_URL, {
      auth: { token: tokens.accessToken },
    })

    socketRef.current = socket

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [])

  return socketRef.current
}
