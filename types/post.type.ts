export type TCreatePost = {
  description: string
  phoneNumber: string
  bloodType: string
  coordinates: number[]
  location: string
  userId: string
  authorFullName: string
  authorPhoto: string | null
  createdAt: Date | string
}

export type TPost = {
  authorPhoto: string | null
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
