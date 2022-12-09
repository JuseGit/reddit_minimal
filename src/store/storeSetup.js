import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from './services/api'

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
})

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
      getDefaultMiddleware({immutableCheck: false, serializableCheck: false}).concat(api.middleware),
    preloadedState,
  })
}