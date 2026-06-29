"use client"

import { ListingCard } from "./listing-card"
import { EmptyState } from "@/components/shared/empty-state"
import { Package } from "lucide-react"
import type { Listing } from "@/types/listing"

interface ListingGridProps {
  listings: Listing[]
}

export function ListingGrid({ listings }: ListingGridProps) {
  if (listings.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="No listings found"
        description="Try adjusting your filters or check back later for new listings."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  )
}
