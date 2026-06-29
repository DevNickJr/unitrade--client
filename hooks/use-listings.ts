"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { useFetch } from "./use-fetch"
import { useMutationAction } from "./use-mutation"
import { listingService } from "@/services/listing.service"
import type { ListingFilters, CreateListingRequest, UpdateListingRequest } from "@/types/listing"

export function useListings(initialFilters?: ListingFilters) {
  const [apiFilters, setAPIFilters] = useState<ListingFilters>({
    page: 1,
    limit: 12,
    ...initialFilters,
  })

  const [filters, setFilters] = useState<ListingFilters>({
    page: 1,
    limit: 12,
    ...initialFilters,
  })

  const timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setAPIFilters((prev) => ({ ...prev, ...filters, page: filters.page ?? 1, limit: filters.limit ?? 12 }))
    }, 600)
  }, [filters])

  const query = useFetch({
    queryKey: ["listings", apiFilters],
    queryFn: () => listingService.getListings(apiFilters),
  })

  const updateFilters = useCallback((newFilters: Partial<ListingFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: newFilters.page ?? 1 }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters({ page: 1, limit: 12 })
  }, [])

  return { ...query, filters, updateFilters, resetFilters }
}

export function useListing(id: string) {
  return useFetch({
    queryKey: ["listing", id],
    queryFn: () => listingService.getListing(id),
    options: { enabled: !!id },
  })
}

export function useMyListings(page = 1, limit = 20) {
  return useFetch({
    queryKey: ["my-listings", page, limit],
    queryFn: () => listingService.getUserListings("me", page, limit),
  })
}

export function useCreateListing() {
  return useMutationAction(
    (data: CreateListingRequest) => listingService.createListing(data),
    {
      successMessage: "Listing created successfully",
      invalidateKeys: [["my-listings"], ["listings"]],
    }
  )
}

export function useUpdateListing(id: string) {
  return useMutationAction(
    (data: UpdateListingRequest) => listingService.updateListing(id, data),
    {
      successMessage: "Listing updated successfully",
      invalidateKeys: [["my-listings"], ["listings"], ["listing", id]],
    }
  )
}

export function useDeleteListing() {
  return useMutationAction(
    (id: string) => listingService.deleteListing(id),
    {
      successMessage: "Listing deleted successfully",
      invalidateKeys: [["my-listings"], ["listings"]],
    }
  )
}

export function useUpdateListingStatus(id: string) {
  return useMutationAction(
    (status: string) => listingService.updateStatus(id, status),
    {
      successMessage: "Status updated",
      invalidateKeys: [["my-listings"], ["listings"], ["listing", id]],
    }
  )
}
