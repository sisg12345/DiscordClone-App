import type { User } from '@/types/data'
import { createSlice } from '@reduxjs/toolkit'
import { Nullable } from '../../types/data'

const initialState: Nullable<User> = {
  id: null,
  email: null,
  displayName: null,
  photoURL: null,
}

interface Action {
  payload: Nullable<User>
  type: string
}

/**
 * ユーザー情報のSlice
 */
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: Action) => {
      state.id = action.payload.id
      state.email = action.payload.email
      state.displayName = action.payload.displayName
      state.photoURL = action.payload.photoURL
    },
    logout: () => {
      // ストレージをクリア (redux-persist情報をクリア)
      localStorage.clear()
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
