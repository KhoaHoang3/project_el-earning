import {
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import getCourseListSlice from './reducers/getCourseListSlice';
import userLoginSlice from './reducers/userLoginSlice';
import userRegisterSlice from './reducers/userRegisterSlice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    userRegister: userRegisterSlice,
    userLogin: userLoginSlice,
    getCourseList: getCourseListSlice,
  },
});
