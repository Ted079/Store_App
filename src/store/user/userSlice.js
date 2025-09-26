import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { shuffle } from "../../utils/common";

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
      localStorage.setItem("token", token); //local token

      return loginResponse.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "users/fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token"); //local token
      if (!token) return thunkAPI.rejectWithValue("No token!!");

      const response = await axios(`${BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token"); //local
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
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
    cartRelatedItems: [],
    isLoading: false,
    showSidebar:false,
  },

  reducers: {
    logOutUser: (state) => {
      const userId = state.currentUser?.id;
      state.currentUser = null;
      state.loginErr = null;

      state.favorite = [];
      state.cart = [];
      state.token = null;
      localStorage.removeItem("token");
    },

    toggleForm: (state, { payload }) => {
      state.showSidebar = payload; 
    },

    relatedCartProducts: (state, { payload }) => {
      const items = state.cart.filter(({ category: { id } }) => id === payload);
      state.cartRelatedItems = shuffle(items);
    },///!!!!!

    addItemToCart: (state, { payload }) => {
      const exsistingItem = state.cart.find(({ id }) => id === payload.id);

      if (!exsistingItem) {
        state.cart.push({ ...payload, quantity: 1 });
      } else {
        exsistingItem.quantity = payload.quantity || exsistingItem.quantity + 1;
      }

      const userId = state.currentUser?.id;
      if (userId) {
        localStorage.setItem(`cart_${userId}`, JSON.stringify(state.cart));
      }
    },

    removeItemToCart: (state, { payload }) => {
      state.cart = state.cart.filter(({ id }) => id !== payload);
      
      const userId = state.currentUser?.id;
      if (userId) {
        localStorage.setItem(`cart_${userId}`, JSON.stringify(state.cart)); // local cart
      }
    },

    addItemToFavorite: (state, { payload }) => {
      const exsistingItem = state.favorite.find(({ id }) => id === payload.id);
      if (!exsistingItem) {
        state.favorite.push({
          ...payload,
        });
      }


      const userId = state.currentUser?.id;
      if (userId) {
        localStorage.setItem(`fav_${userId}`, JSON.stringify(state.favorite));
      }
    },

    removeItemToFavorite: (state, { payload }) => {
      state.favorite = state.favorite.filter(({ id }) => id !== payload);
      const userId = state.currentUser?.id;
      if (userId) {
        localStorage.setItem(`fav_${userId}`, JSON.stringify(state.favorite)); // local cart
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

      state.token = localStorage.getItem("token"); //local token

      const userId = action.payload.id;
      const storedCart = localStorage.getItem(`cart_${userId}`); //local cart
      state.cart = storedCart ? JSON.parse(storedCart) : [];
      const storedFav = localStorage.getItem(`fav_${userId}`); //local fav
      state.favorite = storedFav ? JSON.parse(storedFav) : [];
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

      const userId = action.payload.id;
      const storedCart = localStorage.getItem(`cart_${userId}`);
      state.cart = storedCart ? JSON.parse(storedCart) : [];
      const storedFav = localStorage.getItem(`fav_${userId}`);
      state.favorite = storedFav ? JSON.parse(storedFav) : [];
    });

    builder.addCase(fetchUserProfile.rejected, (state) => {
      const userId = state.currentUser?.id;
      state.currentUser = null;
      state.token = null;
      state.isLoading = false;
      if (userId) {
        localStorage.removeItem(`cart_${userId}`);
        localStorage.removeItem(`fav_${userId}`);
      }
      state.cart = [];
      state.favorite = [];
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export const {
  addItemToCart,
  addItemToFavorite,
  logOutUser,
  toggleForm,
  removeItemToCart,
  removeItemToFavorite,
  relatedCartProducts,
} = userSlice.actions;

export default userSlice.reducer;
