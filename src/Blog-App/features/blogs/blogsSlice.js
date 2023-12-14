import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createBlogApi, getBlogsApi } from "../../services/blogsApi";

const initialState = {
  blogs: [],
  isBlogsLoading: false,
  isBlogsError: false,
  blogsError: "",
  length: 0,

  createBlog: {
    isLoading: false,
    isError: false,
    error: "",
    isSuccess: false,
  },
};

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async function ({ sortBy, filter, page }) {
    const blogsData = await getBlogsApi({
      sortBy: sortBy ? sortBy : undefined,
      filter: filter ? filter : undefined,
      page: page,
    });
    console.log(blogsData);
    return blogsData;
  }
);

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async function (newData) {
    const data = await createBlogApi(newData);
    console.log(newData);
    console.log(data);
    return data;
  }
);

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.isBlogsLoading = true;
        state.isBlogsError = false;
        state.blogsError = "";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.isBlogsLoading = false;
        state.blogs = action.payload.data;
        state.length = Number(action.payload.length);
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isBlogsLoading = false;
        state.isBlogsError = true;
        state.blogsError = action.error?.message;
        state.blogs = [];
      });

    builder
      .addCase(createBlog.pending, (state) => {
        state.createBlog.isLoading = true;
        state.createBlog.isError = false;
        state.createBlog.error = "";
        state.createBlog.isSuccess = false;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.createBlog.isLoading = false;
        state.createBlog.isError = false;
        state.createBlog.error = "";
        state.createBlog.isSuccess = true;
        state.blogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.createBlog.isLoading = false;
        state.createBlog.isSuccess = false;
        state.createBlog.isError = true;
        state.createBlog.error = action.error?.message;
      });
  },
});

export default blogsSlice.reducer;

export const getBlogsState = (state) => state.blogs;
