import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createJob, getAllJobs } from "../../services/jobsApi";

const initialState = {
  jobs: {
    results: [],
    isLoading: false,
    isError: false,
    error: "",
  },

  createJob: {
    isCreating: false,
    isError: false,
    error: "",
    status: "idle",
  },
};

export const fetchAllJobs = createAsyncThunk(
  "job/fetchAllJobs",
  async function () {
    const data = await getAllJobs();
    return data;
  }
);

export const createNewJob = createAsyncThunk(
  "job/createNewJob",
  async function (jobData) {
    const data = await createJob(jobData);
    return data;
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    initializeCreateJobStatus(state) {
      state.createJob.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        state.jobs.isLoading = true;
        state.jobs.isError = false;
        state.jobs.error = "";
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.jobs.isLoading = false;
        state.jobs.isError = false;
        state.jobs.error = "";
        state.jobs.results = action.payload;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.jobs.isLoading = false;
        state.jobs.results = [];
        state.jobs.isError = true;
        state.jobs.error = action.error?.message;
      });

    builder
      .addCase(createNewJob.pending, (state) => {
        state.createJob.isCreating = true;
        state.createJob.isError = false;
        state.createJob.error = "";
        state.createJob.status = "loading";
      })
      .addCase(createNewJob.fulfilled, (state, action) => {
        state.createJob.isCreating = false;
        state.createJob.isError = false;
        state.createJob.error = "";
        state.jobs.results.push(action.payload);
        state.createJob.status = "success";
      })
      .addCase(createNewJob.rejected, (state, action) => {
        state.createJob.isCreating = false;
        state.createJob.isError = true;
        state.createJob.error = action.error?.message;
        state.createJob.status = "error";
      });
  },
});

export const { initializeCreateJobStatus } = jobSlice.actions;
export default jobSlice.reducer;

export const selectJobsState = (state) => state.job.jobs;
export const selectCreateJobState = (state) => state.job.createJob;
