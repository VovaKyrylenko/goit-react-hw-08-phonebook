import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await axios.get(
    'https://642c79a3208dfe2547310ec2.mockapi.io/contacts'
  );
  return response.data;
});

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async contact => {
    const response = await axios.post(
      'https://642c79a3208dfe2547310ec2.mockapi.io/contacts',
      contact
    );
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async id => {
    await axios.delete(
      `https://642c79a3208dfe2547310ec2.mockapi.io/contacts/${id}`
    );
    return id;
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filter: '',
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts.push(action.payload);
      })
      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload
        );
      });
  },
});

export default contactsSlice.reducer;
