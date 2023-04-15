import React, { useEffect, useState } from 'react';
import FormComponent from './form/Form';
import * as Yup from 'yup';
import FriendList from './list/List';
import SearchBar from './finder/SearchBar';
import { Container } from './form/Form.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, fetchContacts } from 'redux/apiSlice';
import { Span } from './list/List.styled';
import {
  selectError,
  selectFilterdContacts,
  selectLoading,
} from 'selectors/selectors';

const initialValues = {
  name: '',
  phoneNumber: '',
};

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Invalid phone number'),
});

const App = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  const contacts = useSelector(selectFilterdContacts);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  useEffect(() => {
    dispatch(fetchContacts()); // eslint-disable-next-line
  }, []);

  const handleFormSubmit = (values, { resetForm }) => {
    if (contacts.some(contact => contact.name === values.name)) {
      alert(`${values.name} is already in your contacts`);
    } else {
      dispatch(addContact(values));
      resetForm();
    }
  };

  return (
    <Container>
      <h2>Phonebook</h2>
      <FormComponent
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={FormSchema}
      />
      <h2 style={{ marginTop: '3rem', marginBottom: '0px' }}>Contacts</h2>
      <SearchBar setFilter={setFilter} filter={filter} />
      {error ?? <p>{error}</p>}

      <Span>Your contacts:</Span>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <FriendList contacts={contacts} filter={filter} />
      )}
    </Container>
  );
};

export default App;
