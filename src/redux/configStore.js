import {
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import courseDetailEditSlice from './reducers/courseDetailEditSlice';
import CourseDetailSlice from './reducers/CourseDetailSlice';
import CourseSlice from './reducers/CourseSlice';
import getCourseCode from './reducers/getCourseCode';
import getCourseListSlice from './reducers/getCourseListSlice';
import getCourseSlice from './reducers/getCourseSlice';
import getUserListSlice from './reducers/getUserListSlice';
import userAccountInfoSlice from './reducers/userAccountInfoSlice';
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
    getCourse: getCourseSlice,
    courseCode: getCourseCode,
    course: CourseSlice,
    courseDetail: CourseDetailSlice,
    accountInfo: userAccountInfoSlice,
    courseDetailEdit: courseDetailEditSlice,
    users: getUserListSlice,
  },
});
