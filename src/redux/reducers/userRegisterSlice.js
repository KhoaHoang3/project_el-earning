import { createSlice } from '@reduxjs/toolkit';
import { ACCESSTOKEN } from '../../axios/config';

const initialState = {
  userAccount: '',
};

const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState,
  reducers: {
    userRegister: (state, action) => {
      const { payload } = action;
      state.userAccount = payload;
      console.log('payload', payload);
    },
  },
});

export const { userRegister } = userRegisterSlice.actions;

export default userRegisterSlice.reducer;
