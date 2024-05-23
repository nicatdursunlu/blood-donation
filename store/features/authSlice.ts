import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { TUpdateUser, TUser } from 'types/user.type'

type AuthState = {
  status: boolean
  user: TUser
}

const initialState: AuthState = {
  status: false,
  user: {} as TUser,
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserPhoto(state, action: PayloadAction<TUpdateUser['photo']>) {
      state.user = {
        ...state.user,
        photo: action.payload,
      }
    },
    updateUserInfo(state, action: PayloadAction<TUpdateUser>) {
      state.user = { ...state.user, ...action.payload }
    },
    setUser(state, action: PayloadAction<TUser>) {
      state.status = true
      state.user = action.payload
    },
    setAuthStatus(state, action: PayloadAction<boolean>) {
      state.status = action.payload
    },
    logOut(state) {
      state.status = false
      state.user = {} as TUser
    },
  },
})

export const { setUser, setAuthStatus, logOut, updateUserInfo, setUserPhoto } =
  authSlice.actions

export default authSlice.reducer
