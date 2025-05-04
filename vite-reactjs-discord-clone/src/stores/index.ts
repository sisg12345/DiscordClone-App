import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './slices/userSlice'
import channelReducer from './slices/channelSlice'

// Redux Persist の設定
const persistConfig = {
  key: 'discord-clone',
  // ローカルストレージを設定
  storage,
}

// 複数のリデューサーを統合
const rootReducer = combineReducers({
  user: userReducer,
  channel: channelReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // NOTE: エラー回避
      serializableCheck: {
        // 非シリアライズ可能な値を無視する
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
