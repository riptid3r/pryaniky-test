import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IUserState } from '@/types/interfaces/user.interfaces'

import { LocalStorageApi } from '@/utils/localStorage.utils'

import { RootState } from '../store'

const initialState: Record<'data', IUserState | null> = {
  data: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IUserState | null>) => {
      state.data = action.payload

      if (action.payload != null) {
        LocalStorageApi.setData(action.payload)
      } else {
        LocalStorageApi.clearData()
      }

      return state
    }
  }
})

export const { setUserData } = userSlice.actions

export const selectUserData = (state: RootState) => state.user

export const userReducer = userSlice.reducer
