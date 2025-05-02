import { configureStore, applyMiddleware, combineReducers } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// import { configureStore } from 'redux'
// import rootReducer from "./"

// import { getProfileData } from './services/auth/authService'

const persistConfig = {
  key:'auth',
  storage
}

// const rootReducer = combineReducers({
//   auth: authReducer,
//   no:
// })

const rootReducer = combineReducers({
  auth: authReducer

})
const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store= createStore (persistedReducer, applyMiddleware);

// export(Persistor);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  // reducer: {
  //   auth: authReducer
  //   // [authApi.reducerPath]: authApi.reducer
  // },
  // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(authApi.middleware)
}, applyMiddleware)

const persistor = persistStore(store);
export {persistor} ;
export default store