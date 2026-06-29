import type { User } from "./user"
import { ListingCategory, ListingCondition, ListingStatus } from "@/lib/constants"

export interface Listing {
  id: string
  userId: string
  title: string
  description: string
  price: number
  images: string[]
  category: ListingCategory
  condition: ListingCondition
  status: ListingStatus
  latitude: number | null
  longitude: number | null
  user: User
  createdAt: string
  updatedAt: string
}

export interface CreateListingRequest {
  title: string
  description: string
  price: number
  images: string[]
  category: ListingCategory
  condition: ListingCondition
  latitude?: number
  longitude?: number
}

export interface UpdateListingRequest {
  title?: string
  description?: string
  price?: number
  images?: string[]
  category?: ListingCategory
  condition?: ListingCondition
}

export interface ListingFilters {
  search?: string
  category?: ListingCategory
  condition?: ListingCondition
  minPrice?: number
  maxPrice?: number
  lat?: number
  lng?: number
  radius?: number
  page?: number
  limit?: number
}
