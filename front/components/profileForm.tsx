import React, { useState, useCallback, useRef } from 'react';
import { ProfileFormBox } from './styles';
import { RiEdit2Line, RiCheckFill, RiCloseFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { editUser } from 'actions/user';

const ProfileForm = ({ user }) => {
  const [nickname, setNickname] = useState(user.nickname);
  const [editMode, setEditMode] = useState(true);
  const dispatch = useDispatch();

  const onChangeNickname = useCallback(
    (e) => {
      setNickname(e.target.value);
    },
    [nickname],
  );

  const onSubmitEdit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        editUser({
          nickname,
        }),
      );
      setEditMode(true);
    },
    [nickname],
  );

  const onEditMode = useCallback(() => {
    setEditMode((prev) => !prev);
  }, [editMode]);

  return (
    <ProfileFormBox className="user-info">
      <form onSubmit={onSubmitEdit}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <input type="text" name="user-email" value={user.email} disabled />
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          {editMode ? (
            <>
              <input type="text" name="user-nickname" value={nickname} placeholder={nickname} disabled />
              <RiEdit2Line onClick={onEditMode} />
            </>
          ) : (
            <>
              <input
                type="text"
                name="user-nickname"
                value={nickname}
                placeholder={nickname}
                onChange={onChangeNickname}
              />
              <button type="submit">
                <RiCheckFill />
              </button>
              <RiCloseFill onClick={onEditMode} />
            </>
          )}
        </div>
      </form>
    </ProfileFormBox>
  );
};

export default ProfileForm;
