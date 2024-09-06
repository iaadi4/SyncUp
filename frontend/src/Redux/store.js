import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import conversationSlice from './conversationSlice';
import socketSlice from './socketSlice';
import reloadSlice from './reloadSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        conversation: conversationSlice,
        socket: socketSlice,
        refresh: reloadSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
    }),
});

export default store;