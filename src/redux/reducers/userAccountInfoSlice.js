import { createSlice } from '@reduxjs/toolkit';

let saveUserAccountInfo = {};
if (sessionStorage.getItem('USER_ACCOUNT_INFO')) {
  saveUserAccountInfo = JSON.parse(
    sessionStorage.getItem('USER_ACCOUNT_INFO')
  );
}

const initialState = {
  userAccountInfo: saveUserAccountInfo,
};

const userAccountInfoSlice = createSlice({
  name: 'userAccountInfo',
  initialState,
  reducers: {
    getUserAccountInfo: (state, action) => {
      const { payload } = action;
      state.userAccountInfo = payload;
      sessionStorage.setItem(
        'USER_ACCOUNT_INFO',
        JSON.stringify(payload)
      );
    },
  },
});

export const { getUserAccountInfo } = userAccountInfoSlice.actions;

export default userAccountInfoSlice.reducer;
