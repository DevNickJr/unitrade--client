"use client"

import Link from "next/link"
import { ROUTES, CATEGORY_LABELS, CONDITION_LABELS } from "@/lib/constants"
import { formatPrice, formatRelativeTime } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"
import { ImageIcon } from "lucide-react"
import type { Listing } from "@/types/listing"

interface ListingCardProps {
  listing: Listing
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={ROUTES.LISTING_DETAIL(listing.id)}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
        <div className="aspect-[4/3] relative bg-muted">
          {listing.images?.[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          <Badge className="absolute top-2 left-2" variant="secondary">
            {CATEGORY_LABELS[listing.category]}
          </Badge>
        </div>
        <CardContent className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold line-clamp-1">{listing.title}</h3>
            <span className="font-bold text-primary whitespace-nowrap">{formatPrice(listing.price)}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {CONDITION_LABELS[listing.condition]}
            </Badge>
            <span className="text-xs text-muted-foreground">{formatRelativeTime(listing.createdAt)}</span>
          </div>
          {listing.user && (
            <div className="flex items-center gap-2 pt-1 border-t">
              <Avatar className="h-6 w-6">
                <AvatarImage src={listing.user.avatar || undefined} />
                <AvatarFallback className="text-[10px]">
                  {getInitials(listing.user.firstName, listing.user.lastName)}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">
                {listing.user.firstName} {listing.user.lastName}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
