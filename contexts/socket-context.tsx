"use client"

import { createContext, useContext, useEffect, useRef } from "react"
import { Socket } from "socket.io-client"
import { useAuth } from "@/hooks/use-auth"
import { connectSocket, disconnectSocket } from "@/lib/socket"

const SocketContext = createContext<Socket | null>(null)

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      socketRef.current = connectSocket()
    } else {
      disconnectSocket()
      socketRef.current = null
    }

    return () => {
      disconnectSocket()
      socketRef.current = null
    }
  }, [isAuthenticated])

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocketContext() {
  return useContext(SocketContext)
}
