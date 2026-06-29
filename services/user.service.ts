import { apiClient } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse } from "@/types/api"
import type { User, School, UpdateProfileRequest } from "@/types/user"

export const userService = {
  async getMe() {
    return apiClient.get<ApiResponse<User>>("/users/me")
  },

  async updateProfile(data: UpdateProfileRequest) {
    return apiClient.put<ApiResponse<User>>("/users/me", data)
  },

  async getUser(id: string) {
    return apiClient.get<ApiResponse<User>>(`/users/${id}`)
  },

  async getNearbyUsers(params: { lat: number; lng: number; radius?: number; page?: number; limit?: number }) {
    return apiClient.get<PaginatedResponse<User>>("/users/nearby", params as Record<string, string | number>)
  },

  async getSchoolUsers(schoolId: string, page = 1, limit = 20) {
    return apiClient.get<PaginatedResponse<User>>(`/users/school/${schoolId}`, { page, limit })
  },

  async getSchools() {
    return apiClient.get<ApiResponse<School[]>>("/users/schools")
  },
}
