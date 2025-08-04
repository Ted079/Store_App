import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { shuffle } from "../../utils/common";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios(`${BASE_URL}/products`);
      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/CreateProduct",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/products`, payload);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    filtered: [],
    related: [],
    categoryFilter: [],
    isLoading: false,
  },
  reducers: {
    filteredByPrice: (state, action) => {
      state.filtered = state.list.filter(({ price }) => price < action.payload);
      state.isLoading = false;
    },

    filteredByCategory: (state, action) => {
      state.categoryFilter = state.list.filter(
        ({ category: { name } }) => name === action.payload
      );
      state.isLoading = false;
    },

    relatedProducts: (state, { payload }) => {
      const items = state.list.filter(({ category: { id } }) => id === payload);
      state.related = shuffle(items);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.list = action.payload;

      state.isLoading = false;
    });

    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
    });

    //============================================

    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
    });

    builder.addCase(createProduct.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { filteredByPrice, relatedProducts, filteredByCategory } = productsSlice.actions;

export default productsSlice.reducer;
