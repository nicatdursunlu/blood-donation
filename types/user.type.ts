export type TSignUpUser = {
  fullName: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

export type TLoginUser = {
  email: string
  password: string
}

export type TUser = {
  uid: string
  fullName: string
  username: string
  email: string
  bloodType: string | null
  photo: string | null
}

export type TUpdateUser = {
  uid: string
  fullName: string
  username: string
  bloodType: string | null
}
