import React from 'react';
import { HiHeart } from 'react-icons/hi';
import { PostLayout, DefaultContent, UserInfoContent } from './styles';
import dayjs from 'dayjs';
import Link from 'next/link';

const PostCardLayout = ({ item }) => {
  const date = dayjs(item.createdAt);

  // 정규표현식 - url 타이틀 특수문자 및 공백 '-'변환 후 마지막 '-'은 제거
  const regex = /[\s\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+/g;
  const regex2 = item.title.replace(regex, '-');
  const title = regex2.replace(/-$/, '');

  return (
    <PostLayout>
      <div className="postLayout-inner">
        {item.Images.length > 0 ? (
          <Link
            href={{
              pathname: '/[pagename]/[id]',
              query: { postId: item.id },
            }}
            as={`/${item.User.nickname}/${title}`}
          >
            <a>
              <div className="thumb">
                <img src={item.Images[0].src} />
                {item.Images.length > 1 && <div>+ {item.Images.length}</div>}
              </div>
            </a>
          </Link>
        ) : null}
        <DefaultContent>
          <Link
            href={{
              pathname: '/[pagename]/[id]',
              query: { postId: item.id },
            }}
            as={`/${item.User.nickname}/${title}`}
          >
            <a className="title">{item.title}</a>
          </Link>
          <p className="content">{item.content}</p>
          <div className="post-option">
            <span>{date.format('YYYY년 MM월 DD일')}</span>
            <span>{item.Comments.length}개의 댓글</span>
          </div>
        </DefaultContent>
        <UserInfoContent>
          <p className="user-info">
            {item.User.Images.length > 0 && (
              <span>
                <img src={item.User.Images[0].src} />
              </span>
            )}
            {item.User.nickname}
          </p>
          <div className="like">
            <HiHeart />
            <p>{item.Likers.length}</p>
          </div>
        </UserInfoContent>
      </div>
    </PostLayout>
  );
};

export default PostCardLayout;
