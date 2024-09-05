import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import conversationSlice from './conversationSlice';
import socketSlice from './socketSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        conversation: conversationSlice,
        socket: socketSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
    }),
});

export default store;