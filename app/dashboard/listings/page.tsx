"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useFetch } from "@/hooks/use-fetch"
import { useDeleteListing } from "@/hooks/use-listings"
import { listingService } from "@/services/listing.service"
import { ROUTES, CATEGORY_LABELS, CONDITION_LABELS, STATUS_LABELS, ListingStatus } from "@/lib/constants"
import { formatPrice, formatDate } from "@/lib/utils"
import { PageLoader } from "@/components/shared/loading-spinner"
import { EmptyState } from "@/components/shared/empty-state"
import { Pagination } from "@/components/shared/pagination"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, MoreVertical, Pencil, Trash2, Package, ImageIcon } from "lucide-react"

export default function MyListingsPage() {
  const { user } = useAuth()
  const [page, setPage] = useState(1)
  const deleteListing = useDeleteListing()

  const { data, isLoading } = useFetch({
    queryKey: ["my-listings", user?.id, page],
    queryFn: () => listingService.getUserListings(user!.id, page),
    options: { enabled: !!user },
  })

  if (isLoading) return <PageLoader />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Listings</h1>
        <Button render={<Link href={ROUTES.DASHBOARD_NEW_LISTING} />}>
          <Plus className="h-4 w-4 mr-2" />
          New Listing
        </Button>
      </div>

      {!data?.data?.length ? (
        <EmptyState
          icon={Package}
          title="No listings yet"
          description="Create your first listing to start selling."
          action={{ label: "Create Listing", onClick: () => {} }}
        />
      ) : (
        <>
          <div className="space-y-3">
            {data.data.map((listing) => (
              <Card key={listing.id}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                    {listing.images?.[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={listing.images[0]} alt={listing.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{listing.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-medium text-primary">{formatPrice(listing.price)}</span>
                      <Badge variant="outline" className="text-xs">{CATEGORY_LABELS[listing.category]}</Badge>
                      <Badge variant="outline" className="text-xs">{CONDITION_LABELS[listing.condition]}</Badge>
                      <Badge
                        variant={listing.status === ListingStatus.ACTIVE ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {STATUS_LABELS[listing.status]}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{formatDate(listing.createdAt)}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
                      <MoreVertical className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem render={<Link href={ROUTES.DASHBOARD_EDIT_LISTING(listing.id)} />}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => deleteListing.mutate(listing.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            ))}
          </div>
          <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  )
}
