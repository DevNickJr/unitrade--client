export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4002/api/v1"

export const ROUTES = {
  HOME: "/",
  LISTINGS: "/listings",
  LISTING_DETAIL: (id: string) => `/listings/${id}`,
  SELLER_PROFILE: (id: string) => `/sellers/${id}`,
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  DASHBOARD_PROFILE: "/dashboard/profile",
  DASHBOARD_LISTINGS: "/dashboard/listings",
  DASHBOARD_NEW_LISTING: "/dashboard/listings/new",
  DASHBOARD_EDIT_LISTING: (id: string) => `/dashboard/listings/${id}/edit`,
  DASHBOARD_MESSAGES: "/dashboard/messages",
  DASHBOARD_CONVERSATION: (id: string) => `/dashboard/messages/${id}`,
} as const

export enum ListingCategory {
  ELECTRONICS = "electronics",
  CLOTHING = "clothing",
  BOOKS = "books",
  FURNITURE = "furniture",
  SERVICES = "services",
  OTHER = "other",
}

export enum ListingCondition {
  NEW = "new",
  LIKE_NEW = "like_new",
  USED = "used",
  WORN = "worn",
}

export enum ListingStatus {
  ACTIVE = "active",
  SOLD = "sold",
  ARCHIVED = "archived",
}

export const CATEGORY_LABELS: Record<ListingCategory, string> = {
  [ListingCategory.ELECTRONICS]: "Electronics",
  [ListingCategory.CLOTHING]: "Clothing",
  [ListingCategory.BOOKS]: "Books",
  [ListingCategory.FURNITURE]: "Furniture",
  [ListingCategory.SERVICES]: "Services",
  [ListingCategory.OTHER]: "Other",
}

export const CONDITION_LABELS: Record<ListingCondition, string> = {
  [ListingCondition.NEW]: "New",
  [ListingCondition.LIKE_NEW]: "Like New",
  [ListingCondition.USED]: "Used",
  [ListingCondition.WORN]: "Worn",
}

export const STATUS_LABELS: Record<ListingStatus, string> = {
  [ListingStatus.ACTIVE]: "Active",
  [ListingStatus.SOLD]: "Sold",
  [ListingStatus.ARCHIVED]: "Archived",
}
