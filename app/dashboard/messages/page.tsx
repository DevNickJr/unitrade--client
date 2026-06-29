"use client"

import { useConversations } from "@/hooks/use-conversations"
import { ConversationList } from "@/components/chat/conversation-list"
import { PageLoader } from "@/components/shared/loading-spinner"
import { EmptyState } from "@/components/shared/empty-state"
import { MessageSquare } from "lucide-react"

export default function MessagesPage() {
  const { data, isLoading } = useConversations()

  if (isLoading) return <PageLoader />

  const conversations = data?.data || []

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      {conversations.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No messages yet"
          description="When you message a seller or someone messages you, conversations will appear here."
        />
      ) : (
        <ConversationList conversations={conversations} />
      )}
    </div>
  )
}
