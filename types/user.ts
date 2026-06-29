export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar: string | null
  provider: string
  role: string
  isVerified: boolean
  latitude: number | null
  longitude: number | null
  schoolId: string | null
  school: School | null
  createdAt: string
  updatedAt: string
}

export interface School {
  id: string
  name: string
  domain: string
  latitude: number
  longitude: number
  createdAt: string
}

export interface UpdateProfileRequest {
  firstName?: string
  lastName?: string
  avatar?: string
  schoolId?: string
  latitude?: number
  longitude?: number
}
