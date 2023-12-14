import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import updateProductApi, {
  createProductApi,
  deleteProductApi,
  getAllProductsApi,
  getProductApi,
} from "../../services/apiProducts";
// import cartSlice from "../cart/cartSlice";
// import store from "../../store/store";

const initialState = {
  products: {
    results: [],
    isLoading: false,
    isError: false,
    error: "",
  },

  createProduct: {
    isLoading: false,
    isError: false,
    error: "",
    isSuccess: false,
  },

  updateProduct: {
    id: "",
    isLoading: false,
    isError: false,
    error: "",
    isSuccess: false,
  },

  deleteProduct: {
    id: "",
    isLoading: false,
    isError: false,
    error: "",
    isSuccess: false,
  },
};

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async function () {
    const data = await getAllProductsApi();
    return data;
  }
);

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async function (id) {
    const data = await getProductApi(id);
    return data;
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async function (productData) {
    const data = await createProductApi(productData);
    return data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async function ({ id, productData }) {
    const data = await updateProductApi({ id, productData });
    return data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async function (id) {
    const data = await deleteProductApi(id);
    return data;
  }
);

// need to work when coming from cart page to home page then products quantity goes to the original quantity as all the products are loaded again from the server but in redux cart store we still have our total cart quantity as it is because of course page was not reload in react app and therefore redux store will not reset untill unless the page is reloaded again.

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    decreaseProductQuantity(state, action) {
      state.products.results = state.products.results.map((product) =>
        product.id === action.payload
          ? { ...product, quantity: product.quantity - 1 }
          : { ...product }
      );
    },

    increaseProductQuantity(state, action) {
      state.products.results = state.products.results.map((product) =>
        product.id === action.payload
          ? { ...product, quantity: product.quantity + 1 }
          : { ...product }
      );
    },

    updateCreateProduct(state) {
      state.createProduct.isSuccess = false;
    },

    updateDeleteProduct(state) {
      state.deleteProduct.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.products.isLoading = true;
        state.products.isError = false;
        state.products.error = "";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.products.isLoading = false;
        state.products.results = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.products.isLoading = false;
        state.products.results = [];
        state.products.isError = true;
        state.products.error = action.error?.message;
      });

    builder
      .addCase(createProduct.pending, (state) => {
        state.createProduct.isLoading = true;
        state.createProduct.isError = false;
        state.createProduct.error = "";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.createProduct.isLoading = false;
        state.createProduct.isSuccess = true;
        state.products.results.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createProduct.isLoading = false;
        state.createProduct.isError = true;
        state.createProduct.error = action.error?.message;
        state.createProduct.isSuccess = false;
      });

    builder
      .addCase(updateProduct.pending, (state, action) => {
        state.updateProduct.id = action.meta.arg;
        state.updateProduct.isLoading = true;
        state.updateProduct.isError = false;
        state.updateProduct.error = "";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updateProduct.id = "";
        state.updateProduct.isLoading = false;
        state.updateProduct.isSuccess = true;
        state.products.results = state.products.results.map((product) => {
          if (product.id === action.payload.id) {
            return { ...action.payload };
          }
          return { ...product };
        });
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateProduct.id = "";
        state.updateProduct.isLoading = false;
        state.updateProduct.isError = true;
        state.updateProduct.error = action.error?.message;
      });

    builder
      .addCase(deleteProduct.pending, (state, action) => {
        state.deleteProduct.id = action.meta.arg;
        state.deleteProduct.isLoading = true;
        state.deleteProduct.isError = false;
        state.deleteProduct.error = "";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteProduct.id = "";
        state.deleteProduct.isLoading = false;
        state.products.results = state.products.results.filter(
          (product) => product.id !== action.meta.arg
        );
        state.deleteProduct.isSuccess = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteProduct.id = "";
        state.deleteProduct.isLoading = false;
        state.deleteProduct.isError = true;
        state.deleteProduct.error = action.error?.message;
      });
  },
});

export const {
  updateCreateProduct,
  updateDeleteProduct,
  decreaseProductQuantity,
  increaseProductQuantity,
} = productsSlice.actions;

export default productsSlice.reducer;

export const getProductsState = (state) => state.products;
