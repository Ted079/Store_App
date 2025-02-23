import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, payload);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (payload, thunkApi) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, payload);
      const token = response.data.access_token;

      const loginResponse = await axios(`${BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.setItem("token", token);

      return loginResponse.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "users, fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return thunkAPI.rejectWithValue("No token!!");

      const response = await axios(`${BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users,updateUser",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/users/${payload.id}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const checkEmail = createAsyncThunk(
  "users, checkEmail",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/is-available`,
        payload
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const addCurrentUser = () => {};

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    loginErr: null,
    token: localStorage.getItem("token") || null,
    cart: [],
    favorite: [],
    isLoading: false,
  },

  reducers: {
    logOutUser: (state) => {
      state.currentUser = null;
      state.token = null;
      state.loginErr = null;
      localStorage.removeItem("token");
    },

    addItemToCart: (state, { payload }) => {
      const exsistingItem = state.cart.find(({ id }) => id === payload.id);

      if (!exsistingItem) {
        state.cart.push({ ...payload, quantity: 1 });
      } else {
        exsistingItem.quantity = payload.quantity || exsistingItem.quantity + 1;
        console.log(exsistingItem.quantity);
      }
    },

    addItemToFavorite: (state, { payload }) => {
      const exsistingItem = state.favorite.find(({ id }) => id === payload.id);
      if (!exsistingItem) {
        state.favorite.push({
          ...payload,
          quantity: 1,
        });
      } else {
        exsistingItem.quantity = payload.quantity || exsistingItem.quantity + 1;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.loginErr = null;
      state.token = localStorage.getItem("token");
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loginErr = action.payload;
    });

    builder.addCase(fetchUserProfile.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchUserProfile.rejected, (state) => {
      state.currentUser = null;
      state.token = null;
      state.isLoading = false;
      localStorage.removeItem("token");
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export const { addItemToCart, addItemToFavorite, logOutUser } =
  userSlice.actions;

export default userSlice.reducer;
