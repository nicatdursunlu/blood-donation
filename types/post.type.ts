export type TCreatePost = {
  description: string
  phoneNumber: string
  bloodType: string
  coordinates: number[]
  location: string
  userId: string
  authorFullName: string
  createdAt: Date | string
}

export type TPost = {
  authorFullName: string
  bloodType: string
  coordinates: number[]
  description: string
  id: string
  location: string
  phoneNumber: string
  userId: string
  createdAt: Date
}
