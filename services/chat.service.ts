import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"
import type { Conversation, Message, CreateConversationRequest } from "@/types/chat"

export const chatService = {
  async getConversations() {
    return apiClient.get<ApiResponse<Conversation[]>>("/conversations")
  },

  async createConversation(data: CreateConversationRequest) {
    return apiClient.post<ApiResponse<Conversation>>("/conversations", data)
  },

  async getMessages(conversationId: string, page = 1, limit = 50) {
    return apiClient.get<PaginatedResponse<Message>>(`/conversations/${conversationId}/messages`, { page, limit })
  },
}
