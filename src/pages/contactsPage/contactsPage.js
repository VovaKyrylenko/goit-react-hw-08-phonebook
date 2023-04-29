import { AddContactFormComponent } from 'components/AddContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/apiSlice';
import { selectFilterdContacts } from 'selectors/selectors';
import { FlexContainer } from './contactsPage.styled';
import { ContactListComponent } from 'components/ContactList';
import Notiflix from 'notiflix';

const initialValues = {
  name: '',
  number: '',
};

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilterdContacts);

  const handleFormSubmit = (values, { resetForm }) => {
    if (contacts.some(contact => contact.name === values.name)) {
      Notiflix.Notify.failure(`${values.name} is already in your contacts`);
    } else {
      dispatch(addContact(values));
      resetForm();
    }
  };
  return (
    <FlexContainer>
      <AddContactFormComponent
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
      />
      <ContactListComponent />
    </FlexContainer>
  );
};
export default ContactsPage;
