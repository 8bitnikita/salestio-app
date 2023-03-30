import { configureStore } from '@reduxjs/toolkit'

import { cardSliceReducer } from './reducers/ cardSlice'

export const store = configureStore({
  reducer: {
    card: cardSliceReducer,
  },
})

export type AppRootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
