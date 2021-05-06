import { createSlice } from '@reduxjs/toolkit';
import _find from 'lodash/find';
import _concat from 'lodash/concat';
import _remove from 'lodash/remove';
import {
  addPost,
  addComment,
  editPost,
  postsLoad,
  postLike,
  postUnLike,
  removePost,
  editComment,
  deleteComment,
  myPostLoad,
  singlePostLoad,
  uploadImages,
  removeImage,
  searchPost,
} from '../actions/post';

const initialState = {
  singlePost: null, // 개별 포스트
  imagePaths: [], // 이미지 첨부 시 미리보기
  // images: [],
  posts: [], // 모든 포스트
  searchPosts: [], // 결과 결과 포스트

  myPosts: [], // 나의 포스트
  loadMyPostsMore: true,
  loadMyPostsLoading: false,

  loadPostsMore: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsFail: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  updatePostLoading: false,
  updatePostDone: false,
  likePostLoading: false,
  notMyLoadPost: false,
  addCommentLoading: false,
  addCommentDone: false,
  editCommentLoading: false,
  editCommentDone: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 포스트 추가
      .addCase(addPost.pending, (state, action) => {})
      .addCase(addPost.fulfilled, (state, { payload }: any) => {
        state.posts.unshift(payload);
        state.imagePaths = [];
        // const lastId = state.posts[state.posts.length - 1];
        // state.posts = state.posts.filter((v) => v.id !== lastId.id);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.addPostError = action.payload;
      })
      // 포스트 삭제
      .addCase(removePost.pending, (state, action) => {
        state.removePostLoading = true;
      })
      .addCase(removePost.fulfilled, (state, { payload }: any) => {
        state.posts = state.posts.filter((v) => v.id !== payload.postId);
        state.removePostDone = true;
        state.removePostLoading = false;
      })
      .addCase(removePost.rejected, (state, action) => {
        state.removePostError = action.payload;
        state.removePostLoading = false;
      })
      // 포스트 수정
      .addCase(editPost.pending, (state, action) => {
        state.updatePostDone = false;
        state.updatePostLoading = true;
      })
      .addCase(editPost.fulfilled, (state, { payload }: any) => {
        state.singlePost.title = payload.title;
        state.singlePost.content = payload.content;
        if (payload.image.length > 1) {
          payload.image.map((v) => {
            state.singlePost.Images.push(v);
          });
        } else {
          state.singlePost.Images.push(payload.image);
        }
        state.updatePostDone = true;
        state.updatePostLoading = false;
        state.imagePaths = [];
      })
      .addCase(editPost.rejected, (state, action) => {
        state.updatePostLoading = false;
        state.imagePaths = [];
      })

      // 포스트 불러오기
      .addCase(postsLoad.pending, (state, action) => {
        state.loadPostsLoading = true;
      })
      .addCase(postsLoad.fulfilled, (state, { payload }: any) => {
        state.posts = _concat(state.posts, payload);
        // 마지막 포스트가 0 혹은 9보다 아래면 false 처리하여, 더 이상 불러오지 못하게 막음
        state.loadPostsMore = payload.length === 9;
        state.loadPostsLoading = false;
      })
      .addCase(postsLoad.rejected, (state, action) => {
        state.loadPostsLoading = false;
        // state.loadPostsFail = action.payload;
      })

      // 포스트 좋아요 누르기
      .addCase(postLike.pending, (state, action) => {
        state.likePostLoading = true;
      })
      .addCase(postLike.fulfilled, (state, { payload }: any) => {
        state.singlePost.Likers.push({ id: payload.UserId });
        state.likePostLoading = false;
      })
      .addCase(postLike.rejected, (state, action) => {})
      // 포스트 좋아요 취소
      .addCase(postUnLike.pending, (state, action) => {
        state.likePostLoading = true;
      })
      .addCase(postUnLike.fulfilled, (state, { payload }: any) => {
        state.singlePost.Likers = state.singlePost.Likers.filter((v) => v.id !== payload.UserId);
        state.likePostLoading = false;
      })
      .addCase(postUnLike.rejected, (state, action) => {})

      // 포스트 댓글 작성
      .addCase(addComment.pending, (state, action) => {
        state.addCommentLoading = true;
      })
      .addCase(addComment.fulfilled, (state, { payload }: any) => {
        state.singlePost.Comments.push(payload);
        state.addCommentDone = true;
        state.addCommentLoading = false;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.addCommentLoading = false;
      })
      // 포스트 댓글 수정
      .addCase(editComment.pending, (state, action) => {
        state.editCommentDone = false;
        state.editCommentLoading = true;
      })
      .addCase(editComment.fulfilled, (state, { payload }) => {
        const comment = _find(state.singlePost.Comments, { id: payload.commentId });
        comment.content = payload.content;
        state.editCommentDone = true;
        state.editCommentLoading = false;
      })
      .addCase(editComment.rejected, (state, action) => {
        state.editCommentLoading = false;
      })

      // 포스트 댓글 삭제
      .addCase(deleteComment.pending, (state, action) => {})
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        state.singlePost.Comments = state.singlePost.Comments.filter((v) => v.id !== payload.commentId);
      })
      .addCase(deleteComment.rejected, (state, action) => {})

      // 해당 유저 포스트만 불러오기
      .addCase(myPostLoad.pending, (state, action) => {
        state.loadMyPostsLoading = true;
      })
      .addCase(myPostLoad.fulfilled, (state, { payload }) => {
        state.loadMyPostsLoading = false;
        state.myPosts = _concat(state.myPosts, payload);
        state.loadMyPostsMore = payload.length === 5;
      })
      .addCase(myPostLoad.rejected, (state, action) => {
        state.loadMyPostsLoading = false;
      })

      // 개별 포스트만 불러오기
      .addCase(singlePostLoad.pending, (state, action) => {
        console.log('개별포스트 실행');
      })
      .addCase(singlePostLoad.fulfilled, (state, { payload }) => {
        state.singlePost = payload;
      })
      .addCase(singlePostLoad.rejected, (state, action) => {})

      // 이미지 업로드
      .addCase(uploadImages.pending, (state, action) => {
        console.log('이미지 업로드 중');
      })
      .addCase(uploadImages.fulfilled, (state, { payload }) => {
        console.log('이미지 업로드 완료');
        payload.map((v) => state.imagePaths.push(v));
      })
      .addCase(uploadImages.rejected, (state, action) => {
        console.log('이미지 업로 실패');
      })

      // 이미지 삭제하기
      .addCase(removeImage.pending, (state, action) => {
        console.log('이미지 삭제 중');
      })
      .addCase(removeImage.fulfilled, (state, { payload }) => {
        state.singlePost.Images = state.singlePost.Images.filter((v) => v.id !== payload.imageId);
      })
      .addCase(removeImage.rejected, (state, action) => {
        console.log('이미지 삭제 실패');
      })

      // 포스트 검색하기
      .addCase(searchPost.pending, (state, action) => {
        console.log('포스트 검색 중');
      })
      .addCase(searchPost.fulfilled, (state, { payload }) => {
        state.searchPosts = _concat(state.posts, payload);
      })
      .addCase(searchPost.rejected, (state, action) => {
        console.log('포스트 검색 실패');
      });
  },
});

export default postSlice;
