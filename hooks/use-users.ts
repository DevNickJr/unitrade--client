"use client"

import { useFetch } from "./use-fetch"
import { useMutationAction } from "./use-mutation"
import { userService } from "@/services/user.service"
import type { UpdateProfileRequest } from "@/types/user"

export function useNearbyUsers(lat: number, lng: number, radius = 10) {
  return useFetch({
    queryKey: ["nearby-users", lat, lng, radius],
    queryFn: () => userService.getNearbyUsers({ lat, lng, radius }),
    options: { enabled: !!lat && !!lng },
  })
}

export function useSchoolUsers(schoolId: string, page = 1) {
  return useFetch({
    queryKey: ["school-users", schoolId, page],
    queryFn: () => userService.getSchoolUsers(schoolId, page),
    options: { enabled: !!schoolId },
  })
}

export function useSchools() {
  return useFetch({
    queryKey: ["schools"],
    queryFn: () => userService.getSchools(),
  })
}

export function useUpdateProfile() {
  return useMutationAction(
    (data: UpdateProfileRequest) => userService.updateProfile(data),
    {
      successMessage: "Profile updated successfully",
    }
  )
}
