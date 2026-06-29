"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useMessages } from "@/hooks/use-conversations"
import { MessageBubble } from "./message-bubble"
import { PageLoader } from "@/components/shared/loading-spinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { useSocketContext } from "@/contexts/socket-context"
import { useQueryClient } from "@tanstack/react-query"
import type { Message } from "@/types/chat"

interface ChatViewProps {
  conversationId: string
}

export function ChatView({ conversationId }: ChatViewProps) {
  const { user } = useAuth()
  const { data, isLoading } = useMessages(conversationId)
  const socket = useSocketContext()
  const queryClient = useQueryClient()
  const [input, setInput] = useState("")
  const [realtimeMessages, setRealtimeMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const typingTimeout = useRef<NodeJS.Timeout | null>(null)

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [data, realtimeMessages, scrollToBottom])

  useEffect(() => {
    if (!socket || !conversationId) return

    socket.emit("join_conversation", { conversationId })
    socket.emit("mark_read", { conversationId })

    const handleNewMessage = (msg: { message: Message }) => {
      setRealtimeMessages((prev) => [...prev, msg.message])
      queryClient.invalidateQueries({ queryKey: ["conversations"] })
    }

    const handleTyping = (data: { conversationId: string; userId: string }) => {
      if (data.conversationId === conversationId && data.userId !== user?.id) {
        setIsTyping(true)
      }
    }

    const handleStopTyping = (data: { conversationId: string; userId: string }) => {
      if (data.conversationId === conversationId && data.userId !== user?.id) {
        setIsTyping(false)
      }
    }

    socket.on("new_message", handleNewMessage)
    socket.on("user_typing", handleTyping)
    socket.on("user_stop_typing", handleStopTyping)

    return () => {
      socket.emit("leave_conversation", { conversationId })
      socket.off("new_message", handleNewMessage)
      socket.off("user_typing", handleTyping)
      socket.off("user_stop_typing", handleStopTyping)
      setRealtimeMessages([])
    }
  }, [socket, conversationId, user?.id, queryClient])

  const handleSend = () => {
    if (!input.trim() || !socket) return

    socket.emit("send_message", {
      conversationId,
      content: input.trim(),
      type: "text",
    })
    setInput("")

    if (typingTimeout.current) clearTimeout(typingTimeout.current)
    socket.emit("stop_typing", { conversationId })
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    if (!socket) return

    socket.emit("typing", { conversationId })

    if (typingTimeout.current) clearTimeout(typingTimeout.current)
    typingTimeout.current = setTimeout(() => {
      socket.emit("stop_typing", { conversationId })
    }, 2000)
  }

  if (isLoading) return <PageLoader />

  const apiMessages = data?.data || []
  const allMessages = [...[...apiMessages].reverse(), ...realtimeMessages]

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {allMessages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} isOwn={msg.senderId === user?.id} />
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl px-4 py-2 rounded-bl-md">
              <p className="text-sm text-muted-foreground">typing...</p>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
