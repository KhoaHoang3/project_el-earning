import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courseDetail: {},
};

const courseDetailEditSlice = createSlice({
  name: 'courseDetailEdit',
  initialState,
  reducers: {
    getCourseDetailEdit: (state, action) => {
      const { payload } = action;
      state.courseDetail = payload;
    },
  },
});

export const { getCourseDetailEdit } = courseDetailEditSlice.actions;

export default courseDetailEditSlice.reducer;
