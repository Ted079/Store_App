import { createSlice } from "@reduxjs/toolkit";

// export const getProducts = createAsyncThunk(
//     "products/getProducts",
//     async (_, thunkAPI) => {
//       try {
//         const response = await axios(`${BASE_URL}/products`);
//         return response.data;
//       } catch (err) {
//         console.log(err);
//         return thunkAPI.rejectWithValue(err);
//       }
//     }
//   );

const userSlice = createSlice({
  name: "user",
  initialState: {
    cart: [],
    favorite: [],
    currentUser: [],
    isLoading: false,
  },

  reducers: {
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
    // builder.addCase(getProducts.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(getProducts.fulfilled, (state, action) => {
    //   state.list = action.payload;
    //   state.isLoading = false;
    // });
    // builder.addCase(getProducts.rejected, (state) => {
    //   state.isLoading = false;
    // });
  },
});

export const { addItemToCart, addItemToFavorite } = userSlice.actions;

export default userSlice.reducer;
