import { FiTrash2 } from 'react-icons/fi';
import {
  FriendListItem,
  Name,
  PhoneNumber,
  DeleteButton,
} from 'components/list/List.styled';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/apiSlice';
function FriendItem({ friend }) {
  const dispatch = useDispatch();
  return (
    <FriendListItem>
      <Name>{friend.name}</Name>
      <PhoneNumber>{friend.phoneNumber}</PhoneNumber>
      <DeleteButton
        onClick={event => {
          dispatch(deleteContact(event.currentTarget.id));
        }}
        id={friend.id}
      >
        <FiTrash2 />
      </DeleteButton>
    </FriendListItem>
  );
}
export default FriendItem;
