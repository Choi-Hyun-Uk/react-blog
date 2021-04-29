import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { backURL } from '../config/config';

axios.defaults.baseURL = backURL;
axios.defaults.withCredentials = true;

export interface Comment {
  postId: number;
  commentId?: number;
  content: string;
}

export interface Image {
  id: number;
}

export interface PostId {
  postId: number;
}

export interface CommentId {
  id: number;
  postId: PostId;
}

export interface User {
  id?: number;
  nickname?: string;
  lastId?: LastId;
}

export interface Post {
  nickname: string;
  title: string;
}

export interface LastId {
  lastId?: number | undefined;
}

export interface Key {
  text: string;
}

// 게시글 작성하기
export const addPost = createAsyncThunk('/post/add', async (data: FormData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/post', data);
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response.data);
  }
});

// 게시글 삭제하기
export const removePost = createAsyncThunk('/post/remove', async (data: PostId) => {
  const response = await axios.delete(`/post/${data.postId}`);
  return response.data;
});

// 게시글 수정하기
export const editPost = createAsyncThunk('/post/edit', async (data: FormData, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`/post`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response.data);
  }
});

// 게시글 여러개 불러오기
export const postsLoad = createAsyncThunk('/posts/postsload', async (data: LastId) => {
  // 최초 로드 시에는 데이터가 없으므로 undefind며, action data에는 0을 보낸다
  const response = await axios.get(`/posts?last=${data?.lastId || 0}`);
  return response.data;
});

// 게시글 좋아요 추가하기
export const postLike = createAsyncThunk('/post/like', async (data: PostId, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`/post/${data.postId}/like`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response.data);
  }
});

// 게시글 좋아요 취소하기
export const postUnLike = createAsyncThunk('/post/unlike', async (data: PostId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/post/${data.postId}/like`);
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response.data);
  }
});

// 댓글 작성하기
export const addComment = createAsyncThunk('/post/comment/add', async (data: Comment, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/post/${data.postId}/comment`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 댓글 수정하기
export const editComment = createAsyncThunk('/post/comment/edit', async (data: Comment, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`/post/${data.postId}/comment`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 댓글 삭제하기
export const deleteComment = createAsyncThunk('/post/comment/delete', async (data: CommentId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/post/${data.postId}/comment/${data.id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 내 포스트만 불러오기
export const myPostLoad = createAsyncThunk('/post/myPostLoad', async (data: User, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/post/${encodeURIComponent(data.nickname)}/?last=${data.lastId || 0}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 개별 포스트만 불러오기
export const singlePostLoad = createAsyncThunk('/post/singlePostLoad', async (data: Post, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/post/${encodeURIComponent(data.nickname)}/${encodeURIComponent(data.title)}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response.data);
  }
});

// 이미지 업로드
export const uploadImages = createAsyncThunk('/post/imageupload', async (data: FormData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/post/images`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response.data);
  }
});

// 이미지 삭제하기
export const removeImage = createAsyncThunk('/post/image/remove', async (data: Image, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/post/image/${data.id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response.data);
  }
});

// 이미지 검색하기
export const searchPost = createAsyncThunk('/posts/searchPost', async (data: string) => {
  const response = await axios.get(`/posts/${encodeURIComponent(data)}`);
  return response.data;
});
