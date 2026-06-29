"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { ROUTES } from "@/lib/constants"
import { formatRelativeTime, getInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Conversation } from "@/types/chat"

interface ConversationListProps {
  conversations: Conversation[]
  activeId?: string
}

export function ConversationList({ conversations, activeId }: ConversationListProps) {
  const { user } = useAuth()

  return (
    <div className="space-y-1">
      {conversations.map((conv) => {
        const other = conv.participant1Id === user?.id ? conv.participant2 : conv.participant1
        const isActive = conv.id === activeId

        return (
          <Link
            key={conv.id}
            href={ROUTES.DASHBOARD_CONVERSATION(conv.id)}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg transition-colors",
              isActive ? "bg-muted" : "hover:bg-muted/50"
            )}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={other?.avatar || undefined} />
              <AvatarFallback>{getInitials(other?.firstName, other?.lastName)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm truncate">
                  {other?.firstName} {other?.lastName}
                </p>
                {conv.lastMessageAt && (
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {formatRelativeTime(conv.lastMessageAt)}
                  </span>
                )}
              </div>
              {conv.lastMessage && (
                <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
              )}
              {conv.listing && (
                <p className="text-xs text-primary truncate">Re: {conv.listing.title}</p>
              )}
            </div>
          </Link>
        )
      })}
    </div>
  )
}
