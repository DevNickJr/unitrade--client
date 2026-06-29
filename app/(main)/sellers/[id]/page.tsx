"use client"

import { use, useState } from "react"
import { useFetch } from "@/hooks/use-fetch"
import { userService } from "@/services/user.service"
import { listingService } from "@/services/listing.service"
import { PageLoader } from "@/components/shared/loading-spinner"
import { ListingGrid } from "@/components/listings/listing-grid"
import { Pagination } from "@/components/shared/pagination"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials, formatDate } from "@/lib/utils"
import { CalendarDays, GraduationCap } from "lucide-react"

export default function SellerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [page, setPage] = useState(1)

  const { data: userData, isLoading: userLoading } = useFetch({
    queryKey: ["user", id],
    queryFn: () => userService.getUser(id),
  })

  const { data: listingsData, isLoading: listingsLoading } = useFetch({
    queryKey: ["user-listings", id, page],
    queryFn: () => listingService.getUserListings(id, page),
  })

  if (userLoading) return <PageLoader />

  const seller = userData?.data
  if (!seller) return <div className="container mx-auto px-4 py-8 text-center">User not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="h-16 w-16">
          <AvatarImage src={seller.avatar || undefined} />
          <AvatarFallback className="text-lg">{getInitials(seller.firstName, seller.lastName)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{seller.firstName} {seller.lastName}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
            {seller.school && (
              <span className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4" />
                {seller.school.name}
              </span>
            )}
            <span className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              Joined {formatDate(seller.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Listings</h2>
      {listingsLoading ? (
        <PageLoader />
      ) : (
        <>
          <ListingGrid listings={listingsData?.data || []} />
          {listingsData && (
            <div className="mt-8">
              <Pagination
                page={listingsData.page}
                totalPages={listingsData.totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
