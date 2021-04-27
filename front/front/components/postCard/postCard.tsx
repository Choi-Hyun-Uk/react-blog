import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'slices';
import { PostWrapper } from './styles';
import PostCardLayout from './postCardLayout';

const PostCard = () => {
  const post = useSelector((state: RootState) => state.post.posts);

  return (
    <PostWrapper className="post-list-wrapper">
      {post.length > 0 ? (
        <>
          {post.map((item) => (
            <PostCardLayout key={item.id} item={item} />
          ))}
        </>
      ) : (
        <div>포스트가 없습니다.</div>
      )}
    </PostWrapper>
  );
};

export default PostCard;
