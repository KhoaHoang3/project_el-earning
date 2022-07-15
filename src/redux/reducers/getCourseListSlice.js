import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courseList: [],
};

const getCourseListSlice = createSlice({
  name: 'getCourseList',
  initialState,
  reducers: {
    getCourseList: (state, action) => {
      const { payload } = action;
      state.courseList = payload;
    },
  },
});

export const { getCourseList } = getCourseListSlice.actions;

export default getCourseListSlice.reducer;
