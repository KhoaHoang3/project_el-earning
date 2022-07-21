import { createSlice } from '@reduxjs/toolkit';
import { courseInfo } from '../../_core/models/courseInfo';
let saveCourse = [];
if (sessionStorage.getItem('COURSE')) {
  saveCourse = JSON.parse(sessionStorage.getItem('COURSE'));
}
const initialState = {
  course: saveCourse,
};

const CourseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    courseBaseOnCode: (state, action) => {
      const { payload } = action;
      state.course = payload;
      sessionStorage.setItem('COURSE', JSON.stringify(payload));
    },
  },
});

export const { courseBaseOnCode } = CourseSlice.actions;

export default CourseSlice.reducer;
