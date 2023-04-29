import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { getState }) => {
    const state = getState();
    const token = state.users.token;
    const response = await axios.get(
      'https://connections-api.herokuapp.com/contacts',
      { headers: { Authorization: token } }
    );
    return response.data;
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, { getState }) => {
    const state = getState();
    const token = state.users.token;
    const response = await axios.post(
      'https://connections-api.herokuapp.com/contacts',
      contact,
      { headers: { Authorization: token } }
    );
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { getState }) => {
    const state = getState();
    const token = state.users.token;
    await axios.delete(`https://connections-api.herokuapp.com/contacts/${id}`, {
      headers: { Authorization: token },
    });
    return id;
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async (contact, { getState }) => {
    const state = getState();
    const token = state.users.token;
    const { contacts } = getState().contacts;
    const index = contacts.findIndex(c => c.id === contact.id);
    if (index === -1) {
      throw new Error('Contact not found');
    }
    const response = await axios.patch(
      `https://connections-api.herokuapp.com/contacts/${contact.id}`,
      contact,
      { headers: { Authorization: token } }
    );
    return response.data;
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
  reducers: {
    updateFilter(state, { payload }) {
      state.filter = payload;
    },
  },
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
      })
      .addCase(updateContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        const { contacts } = state;
        const index = contacts.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          contacts[index] = action.payload;
        }
      });
  },
});

export default contactsSlice.reducer;
export const { updateFilter } = contactsSlice.actions;
