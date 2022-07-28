import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  userInfo: {},
};

const getUserListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    getUserList: (state, action) => {
      const { payload } = action;
      state.users = payload;
    },
    getUserInfo: (state, action) => {
      const { payload } = action;
      state.userInfo = payload;
    },
  },
});

export const { getUserList, getUserInfo } = getUserListSlice.actions;

export default getUserListSlice.reducer;
