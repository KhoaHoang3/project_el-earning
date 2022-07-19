import { createSlice } from '@reduxjs/toolkit';
import { courseInfo } from '../../_core/models/courseInfo';

const initialState = {
  course: new courseInfo(),
};

const CourseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    courseBaseOnCode: (state, action) => {
      const { payload } = action;
      state.course = payload;
    },
  },
});

export const { courseBaseOnCode } = CourseSlice.actions;

export default CourseSlice.reducer;
