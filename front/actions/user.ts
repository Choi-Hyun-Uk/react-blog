import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { backURL } from '../config/config';

axios.defaults.baseURL = backURL;
axios.defaults.withCredentials = true;

export interface User {
  nickname?: string;
  email: string;
  password: string;
}

export interface UserId {
  id: number;
}

export interface Nickname {
  nickname: string;
}

// 회원가입
export const signup = createAsyncThunk('/signup', async (data: User, { rejectWithValue }) => {
  try {
    const response = await axios.post('/user/signup', data);
    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response.data);
  }
});

// 로그인
export const logIn = createAsyncThunk('/logIn', async (data: User, { rejectWithValue }) => {
  try {
    const response = await axios.post('/auth/login', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 로그아웃
export const logOut = createAsyncThunk('/logOut', async () => {
  const response = await axios.get('/auth/logout');
  return response.data;
});

// 로그인 상태 불러오기
export const loadUser = createAsyncThunk('/user/loadUser', async () => {
  const response = await axios.get('/user/loadUser');
  return response.data;
});

// 유저 정보 수정하기
export const editUser = createAsyncThunk('/user/editUser', async (data: Nickname, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`/user`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response.data);
  }
});

// 섬네일 이미지 업로드
export const userImageUpload = createAsyncThunk('/user/imageupload', async (data: FormData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/user/image', data);
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response.data);
  }
});

// 섬네일 적용하기
export const profileImageUpload = createAsyncThunk(
  '/user/profileupload',
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/thumbnail', data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);
