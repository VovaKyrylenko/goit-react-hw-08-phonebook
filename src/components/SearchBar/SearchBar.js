import React from 'react';
import { Input } from './SearchBar.styled';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from 'redux/apiSlice';
import { selectFilter } from 'selectors/selectors';

function SearchBar() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  return (
    <Input
      type="text"
      placeholder="Search contacts by name"
      value={filter}
      onChange={event => {
        dispatch(updateFilter(event.target.value));
      }}
    />
  );
}

export default SearchBar;
