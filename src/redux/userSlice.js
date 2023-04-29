import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Notify } from 'notiflix';
import api from 'utils/backend';

const initialState = {
  user: {
    login: null,
    email: null,
  },
  token: null,
  isLogged: false,
};

export const userSignup = createAsyncThunk(
  'users/userSignup',
  async (data, thunkAPI) => {
    try {
      const response = await api.post('/users/signup', data);
      return response.data;
    } catch (error) {
      if (Number(error.response.data.code) === 11000) {
        Notify.failure('Ths email is already use, please sign in');
        return thunkAPI.rejectWithValue(
          'Ths email is already use, please sign in'
        );
      }
      Notify.failure('Error occured, try later');
      return thunkAPI.rejectWithValue();
    }
  }
);

export const userLogin = createAsyncThunk(
  'users/userLogin',
  async (data, thunkAPI) => {
    try {
      const response = await api.post('/users/login', data);
      return response.data;
    } catch (error) {
      Notify.failure('Incorrect email or password');
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userLogout = createAsyncThunk(
  'users/userLogout',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.users.token;
      const response = await axios.post(
        'https://connections-api.herokuapp.com/users/logout',
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch ({ message }) {
      Notify.failure(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'users/getCurrentUser',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.users.token;
      if (token === null) {
        return thunkAPI.rejectWithValue('token null');
      }
      const response = await axios.get(
        'https://connections-api.herokuapp.com/users/current',
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch ({ message }) {
      Notify.failure(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(userSignup.fulfilled, (state, { payload }) => {
        state.user.login = payload.user.name;
        state.user.email = payload.user.email;
        state.token = payload.token;
        state.isLogged = true;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.user.email = payload.user.email;
        state.token = payload.token;
        state.isLogged = true;
      })
      .addCase(userLogout.fulfilled, state => {
        Object.assign(state, initialState);
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLogged = true;
      })
      .addCase(getCurrentUser.rejected, state => {
        state.isLogged = false;
      });
  },
});

export default usersSlice.reducer;
