import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  course: [],
};

const getCourseSlice = createSlice({
  name: 'getCourse',
  initialState,
  reducers: {
    getCourse: (state, action) => {
      const { payload } = action;
      state.course = payload;
    },
  },
});

export const { getCourse } = getCourseSlice.actions;

export default getCourseSlice.reducer;
