import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import socketSlice from './socketSlice';
import reloadSlice from './reloadSlice';
import contactSlice from './contactSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        contact: contactSlice,
        socket: socketSlice,
        refresh: reloadSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
    }),
});

export default store;