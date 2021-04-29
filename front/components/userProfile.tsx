import React, { useCallback, useRef, useEffect } from 'react';
import { ProfileWrapper } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'slices';
import ProfileForm from './profileForm';
import { RiAddFill } from 'react-icons/ri';
import { userImageUpload, profileImageUpload } from 'actions/user';

const UserProfile = () => {
  const { imagePaths } = useSelector((state: RootState) => state.user);
  const { user } = useSelector((state: RootState) => state.user);
  const imageInput = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();

  // 첨부한 이미지 백서버로 보낸 후 받아오기 (미리보기)
  const onChangeImage = useCallback((e) => {
    console.log('선택한 파일 정보', e.target.files); // 선택한 파일에 대한 정보
    const imageFormData = new FormData(); // multipart form data로 보낼 수 있음
    imageFormData.append('image', e.target.files[0]);
    dispatch(userImageUpload(imageFormData));
  }, []);

  useEffect(() => {
    if (imagePaths) {
      submitRef.current.click();
    }
  }, [imagePaths]);

  // button 클릭 시 input 클릭 후 file 업로드 창 띄우기
  const onClickUserThumb = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onProfileImageUpload = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('image', imagePaths);
      dispatch(profileImageUpload(formData));
    },
    [imagePaths],
  );

  return (
    <ProfileWrapper>
      <div className="inner">
        <div className="user-thumb">
          {user?.Images?.length > 0 && (
            <div>
              <img src={user.Images[0].src} />
            </div>
          )}
          {/* {user.Images.length <= 0 && ( */}
          <button type="button" className="profile-upload-btn" onClick={onClickUserThumb}>
            <RiAddFill />
          </button>
          {/* )} */}
        </div>
        <form onSubmit={onProfileImageUpload} encType="multipart/form-data">
          <input type="file" name="image" hidden ref={imageInput} onChange={onChangeImage} />
          <button type="submit" ref={submitRef} hidden></button>
        </form>
        <ProfileForm user={user} />
      </div>
    </ProfileWrapper>
  );
};

export default UserProfile;
