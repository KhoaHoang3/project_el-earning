import { createSlice } from '@reduxjs/toolkit';
import { courseCode } from '../../_core/models/courseCode';
let saveCourseName = '';
if (sessionStorage.getItem('COURSE_NAME')) {
  saveCourseName = JSON.parse(sessionStorage.getItem('COURSE_NAME'));
}

const initialState = {
  courseCode: new courseCode(),
  courseName: saveCourseName,
};

const getCourseCode = createSlice({
  name: 'courseCode',
  initialState,
  reducers: {
    getCourseCodePage: (state, action) => {
      const { payload } = action;
      state.courseCode = payload;
    },
    getCourseName: (state, action) => {
      const { payload } = action;
      state.courseName = payload;
      sessionStorage.setItem('COURSE_NAME', JSON.stringify(payload));
    },
  },
});

export const { getCourseCodePage, getCourseName } =
  getCourseCode.actions;

export default getCourseCode.reducer;
