import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

import { SearchPostCard } from './styles';

const SearchPost = ({ post }) => {
  const date = dayjs(post.createdAt);

  // 정규표현식 - url 타이틀 특수문자 및 공백 '-'변환 후 마지막 '-'은 제거
  const regex = /[\s\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+/g;
  const regex2 = post.title.replace(regex, '-');
  const title = regex2.replace(/-$/, '');

  return (
    <SearchPostCard>
      <div>
        <div className="post-title">
          <h1>
            <Link
              href={{
                pathname: '/[pagename]/[id]',
                query: { pageId: `${post.id}`, type: 'myBlog' },
              }}
              as={`/${post.User.nickname}/${encodeURIComponent(title)}`}
            >
              <a>
                <div>{post.title}</div>
              </a>
            </Link>
          </h1>
        </div>
        <div className="user-info">
          {post.User.Images.length > 0 && (
            <div>
              <img src={post.User.Images[0].src} />
            </div>
          )}
          <p>{post.User.nickname}</p>
        </div>
        <div className="post-desc">
          {post.Images.length > 0 && (
            <div className="image">
              <img src={post.User.Images[0].src} />
            </div>
          )}
          <p>{post.content}</p>
        </div>
        <div className="post-info">
          <div>{post.Comments.length}개 댓글</div>
          <span>{date.format('YYYY년 MM월 DD일')}</span>
        </div>
      </div>
    </SearchPostCard>
  );
};

export default SearchPost;
