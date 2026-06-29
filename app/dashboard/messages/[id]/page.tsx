"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { useConversations } from "@/hooks/use-conversations"
import { useAuth } from "@/hooks/use-auth"
import { ChatView } from "@/components/chat/chat-view"
import { ConversationList } from "@/components/chat/conversation-list"
import { SocketProvider } from "@/contexts/socket-context"
import { PageLoader } from "@/components/shared/loading-spinner"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"

export default function ConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { user } = useAuth()
  const { data, isLoading } = useConversations()

  if (isLoading) return <PageLoader />

  const conversations = data?.data || []
  const current = conversations.find((c) => c.id === id)
  const other = current
    ? current.participant1Id === user?.id
      ? current.participant2
      : current.participant1
    : null

  return (
    <SocketProvider>
      <div className="flex h-[calc(100vh-8rem)] -m-4 md:-m-6 lg:-m-8">
        {/* Sidebar - conversations list */}
        <div className="hidden lg:block w-80 border-r overflow-y-auto p-4">
          <h2 className="font-semibold mb-4">Messages</h2>
          <ConversationList conversations={conversations} activeId={id} />
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="border-b p-4 flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            {other && (
              <>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={other.avatar || undefined} />
                  <AvatarFallback>{getInitials(other.firstName, other.lastName)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{other.firstName} {other.lastName}</p>
                  {current?.listing && (
                    <p className="text-xs text-muted-foreground">Re: {current.listing.title}</p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Messages */}
          <ChatView conversationId={id} />
        </div>
      </div>
    </SocketProvider>
  )
}
