import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import authReducer from "./state";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

/**
 * Configuration object for the redux-persist library.
 * @constant
 * @type {object}
 */
const persistConfig = { key: "root", storage, version: 1 };

/**
 * Persisted reducer using the authReducer and the persistConfig.
 * @constant
 * @type {function}
 */
const persistedReducer = persistReducer(persistConfig, authReducer);

/**
 * The Redux store configured with the persisted reducer and middleware.
 * @constant
 * @type {object}
 */
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

/**
 * Top level file
 * Renders the main application wrapped with React.StrictMode,
 * Redux Provider, and the PersistGate for persisting the store.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
          <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
