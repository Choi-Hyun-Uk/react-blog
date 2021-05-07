import React, { useState, useCallback, useRef } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import { SearchFormWrap } from './styles';
import { debounce } from 'lodash';
import { searchPost } from 'actions/post';
import { useDispatch } from 'react-redux';

const SearchForm = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const searchDispatch = useRef(debounce((text) => dispatch(searchPost(text)), 1000)).current;

  // const onChangeInput = useCallback(
  //   (e) => {
  //     setValue(e.target.value);
  //     if (value.length > 0) {
  //       searchDispatch(e.target.value);
  //     }
  //   },
  //   [value],
  // );

  const onChangeInput = useCallback(
    (e) => {
      setValue(e.currentTarget.value);
      if (value.length > 0) {
        searchDispatch(e.currentTarget.value);
      }
    },
    [value],
  );

  return (
    <SearchFormWrap>
      <RiSearch2Line />
      <div>
        <input type="text" value={value} onChange={onChangeInput} placeholder="검색어를 입력해주세요." />
      </div>
    </SearchFormWrap>
  );
};

export default SearchForm;
