import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [
    {
      id: 1,
      title: "Why redux?",
      link: "https://youtu.be/91HdW69lAVo",
      watched: true,
    },
    {
      id: 2,
      title: "4 ways to fetch data",
      link: "https://youtu.be/7exOfIAKuWU",
      watched: false,
    },
    {
      id: 3,
      title: "What is React and How it works",
      link: "https://youtu.be/5Xy-t8k_M4A",
      watched: true,
    },
  ],
};

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    addVideo: (state, action) => {
      state.videos.push(action.payload);
    },
    updateVideo: (state, action) => {
      const videoIndexToUpdate = state.videos.findIndex(
        (v) => v.id === action.payload
      );
      state.videos[videoIndexToUpdate].watched =
        !state.videos[videoIndexToUpdate].watched;
    },
  },
});

export default videoSlice.reducer;
export const { addVideo, updateVideo } = videoSlice.actions;
