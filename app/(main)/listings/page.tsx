"use client"

import { useListings } from "@/hooks/use-listings"
import { ListingGrid } from "@/components/listings/listing-grid"
import { ListingFilters } from "@/components/listings/listing-filters"
import { Pagination } from "@/components/shared/pagination"
import { PageLoader } from "@/components/shared/loading-spinner"

export default function ListingsPage() {
  const { data, isLoading, filters, updateFilters, resetFilters } = useListings()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Listings</h1>
      <ListingFilters filters={filters} onUpdate={updateFilters} onReset={resetFilters} />
      <div className="mt-8">
        {isLoading ? (
          <PageLoader />
        ) : (
          <>
            <ListingGrid listings={data?.data || []} />
            {data && (
              <div className="mt-8">
                <Pagination
                  page={data.page}
                  totalPages={data.totalPages}
                  onPageChange={(page) => updateFilters({ page })}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
