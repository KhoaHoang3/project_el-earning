import { createSlice } from '@reduxjs/toolkit';

let saveCourseDetail = {};
if (sessionStorage.getItem('COURSE_DETAIL')) {
  saveCourseDetail = JSON.parse(
    sessionStorage.getItem('COURSE_DETAIL')
  );
}
const initialState = {
  courseDetail: saveCourseDetail,
};

const CourseDetailSlice = createSlice({
  name: 'courseDetail',
  initialState,
  reducers: {
    getCourseDetail: (state, action) => {
      const { payload } = action;
      state.courseDetail = payload;
      sessionStorage.setItem(
        'COURSE_DETAIL',
        JSON.stringify(payload)
      );
    },
  },
});

export const { getCourseDetail } = CourseDetailSlice.actions;

export default CourseDetailSlice.reducer;
