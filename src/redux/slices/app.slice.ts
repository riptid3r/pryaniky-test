import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IAppState } from '@/types/interfaces/app.interfaces'
import { IDataRecord } from '@/types/interfaces/records.interfaces'

import { RootState } from '../store'

const initialState: IAppState = {
  records: [],
  selectedRow: null
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppData: (state, action: PayloadAction<Partial<IAppState>>) => {
      return { ...state, ...action.payload }
    },
    addRecord: (state, action: PayloadAction<IDataRecord>) => {
      state.records.push(action.payload)
      return state
    },
    updateRecord: (
      state,
      action: PayloadAction<{ id: string; data: Partial<IDataRecord> }>
    ) => {
      const idx = state.records.findIndex((e) => e.id === action.payload.id)

      if (idx !== -1)
        state.records.splice(idx, 1, {
          ...state.records[idx],
          ...action.payload.data
        })

      return state
    },
    removeRecord: (state, action: PayloadAction<{ id: string }>) => {
      const idx = state.records.findIndex((e) => e.id === action.payload.id)

      if (idx !== -1) state.records.splice(idx, 1)

      return state
    }
  }
})

export const { setAppData, addRecord, updateRecord, removeRecord } =
  appSlice.actions

export const selectAppData = (state: RootState) => state.app

export const appReducer = appSlice.reducer
