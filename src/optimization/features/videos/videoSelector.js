import { createSelector } from "@reduxjs/toolkit";

export const selectAllVideos = (state) => {
    console.log("running input selector", state);
    return state.videos.videos;
};
export const selectWatchedVideos = (state) =>
    state.videos.videos.filter((v) => v.watched === true);
export const selectUnWatchedVideos = (state) =>
    state.videos.videos.filter((v) => v.watched === false);

export const selectMemoizedWatchedVideos = createSelector(
    selectAllVideos,
    (allVideos) => {
        console.log("333333");
        return allVideos.filter((v) => v.watched === true);
    }
);

export const selectMemoizedUnWatchedVideos = createSelector(
    selectAllVideos,
    (allVideos) => {
        console.log("running output selector");
        return allVideos.filter((v) => v.watched === false);
    }
);