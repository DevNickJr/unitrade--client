import type { User } from "./user"

export interface Conversation {
  id: string
  participant1Id: string
  participant2Id: string
  listingId: string | null
  lastMessage: string | null
  lastMessageAt: string | null
  createdAt: string
  participant1: User
  participant2: User
  listing?: { id: string; title: string; images: string[] } | null
  unreadCount?: number
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  content: string
  type: "text" | "image"
  isRead: boolean
  createdAt: string
  sender: User
}

export interface CreateConversationRequest {
  participantId: string
  listingId?: string
}

export interface SendMessagePayload {
  conversationId: string
  content: string
  type?: "text" | "image"
}
