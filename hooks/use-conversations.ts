"use client"

import { useFetch } from "./use-fetch"
import { useMutationAction } from "./use-mutation"
import { chatService } from "@/services/chat.service"
import type { CreateConversationRequest } from "@/types/chat"

export function useConversations() {
  return useFetch({
    queryKey: ["conversations"],
    queryFn: () => chatService.getConversations(),
  })
}

export function useMessages(conversationId: string, page = 1) {
  return useFetch({
    queryKey: ["messages", conversationId, page],
    queryFn: () => chatService.getMessages(conversationId, page),
    options: { enabled: !!conversationId },
  })
}

export function useCreateConversation() {
  return useMutationAction(
    (data: CreateConversationRequest) => chatService.createConversation(data),
    {
      invalidateKeys: [["conversations"]],
    }
  )
}
