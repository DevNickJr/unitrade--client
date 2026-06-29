import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"
import type { Listing, CreateListingRequest, UpdateListingRequest, ListingFilters } from "@/types/listing"

export const listingService = {
  async getListings(filters?: ListingFilters) {
    const params = filters as Record<string, string | number | boolean | undefined> | undefined
    return apiClient.get<PaginatedResponse<Listing>>("/listings", params)
  },

  async getListing(id: string) {
    return apiClient.get<ApiResponse<Listing>>(`/listings/${id}`)
  },

  async createListing(data: CreateListingRequest) {
    return apiClient.post<ApiResponse<Listing>>("/listings", data)
  },

  async updateListing(id: string, data: UpdateListingRequest) {
    return apiClient.put<ApiResponse<Listing>>(`/listings/${id}`, data)
  },

  async deleteListing(id: string) {
    return apiClient.delete<ApiResponse<{ message: string }>>(`/listings/${id}`)
  },

  async updateStatus(id: string, status: string) {
    return apiClient.patch<ApiResponse<Listing>>(`/listings/${id}/status`, { status })
  },

  async getUserListings(userId: string, page = 1, limit = 20) {
    return apiClient.get<PaginatedResponse<Listing>>(`/listings/user/${userId}`, { page, limit })
  },
}
