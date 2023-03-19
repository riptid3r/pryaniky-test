import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'

import { appReducer } from './slices/app.slice'
import { userReducer } from './slices/user.slice'

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      app: appReducer
    }
  })
}

export const store = makeStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
