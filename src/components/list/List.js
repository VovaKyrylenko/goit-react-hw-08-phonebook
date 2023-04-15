import React from 'react';
import { FriendListContainer } from './List.styled';
import FriendItem from 'components/ListItem/ListItem';

function FriendList({ contacts, filter }) {
  const filteredContacts = filter
    ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase().trim())
      )
    : contacts;

  const friendItems = filteredContacts.map(friend => (
    <FriendItem friend={friend} key={friend.id} />
  ));
  return (
    <>
      {friendItems.length === 0 ? (
        <p>Nothing here</p>
      ) : (
        <FriendListContainer>{friendItems}</FriendListContainer>
      )}
    </>
  );
}
export default FriendList;
