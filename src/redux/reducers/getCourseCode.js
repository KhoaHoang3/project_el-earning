import { createSlice } from '@reduxjs/toolkit';
import { courseCode } from '../../_core/models/courseCode';

const initialState = {
  courseCode: new courseCode(),
};

const getCourseCode = createSlice({
  name: 'courseCode',
  initialState,
  reducers: {
    getCourseCodePage: (state, action) => {
      const { payload } = action;
      state.courseCode = payload;
    },
  },
});

export const { getCourseCodePage } = getCourseCode.actions;

export default getCourseCode.reducer;
