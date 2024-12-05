import { createSlice} from "@reduxjs/toolkit";

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
    currentUser: [],
    isLoading: false,
  },

  // reducers: {
  //   addItemToCart: (state, action) => {
  //     let newCart = [...state.cart];
  //     const existingItem = state.cart.find(
  //       ({ id }) => id === action.payload.id
  //     );

  //     if (existingItem) {
  //       newCart = newCart.map((item) => {
  //         return item.id === action.payload.id
  //           ? {
  //               ...item,
  //               quantity: action.payload.quantity || item.quantity + 1,
  //             }
  //           : item;
  //       });
  //     } else newCart.push({ ...action.payload, quantity: 1 });

  //     state.cart = newCart;
  //   },
  // },

  // extraReducers: (builder) => {
  //     builder.addCase(getProducts.pending, (state) => {
  //       state.isLoading = true;
  //     });

  //     builder.addCase(getProducts.fulfilled, (state, action) => {
  //       state.list = action.payload;

  //       state.isLoading = false;
  //     });

  //     builder.addCase(getProducts.rejected, (state) => {
  //       state.isLoading = false;
  //     });
  //   },
});

export const {addItemToCart} = userSlice.actions;

export default userSlice.reducer;
