import { createSlice } from '@reduxjs/toolkit';
import { ACCESSTOKEN } from '../../axios/config';
import { userInfoData } from '../../_core/models/userInfo';

const initialState = {
  userData: new userInfoData(),
};

const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    userLoginData: (state, action) => {
      const { payload } = action;
      const { accessToken } = payload;
      state.userData = payload;
      localStorage.setItem(ACCESSTOKEN, accessToken);
    },
  },
});

export const { userLoginData } = userLoginSlice.actions;

export default userLoginSlice.reducer;
