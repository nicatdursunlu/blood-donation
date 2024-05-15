import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { TUser } from 'types/user.type'

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

export const { setUser, setAuthStatus, logOut } = authSlice.actions

export default authSlice.reducer
