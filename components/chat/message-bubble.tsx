"use client"

import { cn } from "@/lib/utils"
import { formatRelativeTime } from "@/lib/utils"
import type { Message } from "@/types/chat"

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <div className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2",
          isOwn
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-muted rounded-bl-md"
        )}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        <p className={cn("text-[10px] mt-1", isOwn ? "text-primary-foreground/70" : "text-muted-foreground")}>
          {formatRelativeTime(message.createdAt)}
        </p>
      </div>
    </div>
  )
}
