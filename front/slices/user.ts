import { createSlice } from '@reduxjs/toolkit';
import { signup, logIn, loadUser, logOut, editUser, userImageUpload, profileImageUpload } from 'actions/user';

const initialState = {
  user: null,
  imagePaths: null,
  isLoggedIn: false,
  isSignupLoading: false,
  isSignupDone: false,
  isSignupError: null,
  isLoginLoading: false,
  isLoginDone: false,
  isLoginError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 회원가입
      .addCase(signup.pending, (state, action) => {})
      .addCase(signup.fulfilled, (state, action) => {})
      .addCase(signup.rejected, (state, action) => {
        state.isSignupError = action.payload;
      })
      // 로그인
      .addCase(logIn.pending, (state, action) => {
        state.isLoginDone = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoginDone = true;
        state.isLoginError = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoginDone = false;
        state.isLoginError = action.payload;
      })
      // 로그아웃
      .addCase(logOut.pending, (state, action) => {})
      .addCase(logOut.fulfilled, (state, action) => {
        state.user = null;
        state.isLoggedIn = false;
        state.isLoginError = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoginError = action.payload;
      })
      // 로그인 상태 불러오기
      .addCase(loadUser.pending, (state, action) => {})
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        if (action.payload !== null) {
          state.isLoggedIn = true;
        }
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoginError = action.payload;
      })
      // 닉네임 변경하기
      .addCase(editUser.pending, (state, action) => {})
      .addCase(editUser.fulfilled, (state, action) => {
        state.user.nickname = action.payload.nickname;
      })
      .addCase(editUser.rejected, (state, action) => {
        console.log(action.payload);
      })
      // 섬네일 이미지 업로드
      .addCase(userImageUpload.pending, (state, action) => {})
      .addCase(userImageUpload.fulfilled, (state, action) => {
        console.log(action.payload);
        state.imagePaths = action.payload;
      })
      .addCase(userImageUpload.rejected, (state, action) => {
        console.log(action.payload);
      })
      // 유저 섬네일 적용하기
      .addCase(profileImageUpload.pending, (state, action) => {})
      .addCase(profileImageUpload.fulfilled, (state, action) => {
        console.log('섬네일', action.payload);
        state.user.Images = action.payload.Images;
        state.imagePaths = null;
      })
      .addCase(profileImageUpload.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});

export default userSlice;
