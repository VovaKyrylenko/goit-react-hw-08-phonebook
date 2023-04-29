import { FriendListContainer, NothingSpan } from './ContactList.styled';
import { ListItemComponent } from 'components/ListItem';
import { SearchBar } from 'components/SearchBar';
import { useSelector } from 'react-redux';
import { selectFilterdContacts } from 'selectors/selectors';

function ContactList() {
  const contacts = useSelector(selectFilterdContacts);
  const friendItems = contacts.map(friend => (
    <ListItemComponent friend={friend} key={friend.id} />
  ));
  return (
    <>
      {friendItems.length === 0 ? (
        <NothingSpan>Nothing here</NothingSpan>
      ) : (
        <>
          <FriendListContainer>
            <SearchBar />
            {friendItems}
          </FriendListContainer>
        </>
      )}
    </>
  );
}
export default ContactList;
