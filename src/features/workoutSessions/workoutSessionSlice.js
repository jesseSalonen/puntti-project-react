import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import workoutSessionService from "./workoutSessionService";

const initialState = {
  workoutSessions: [],
  recentSessions: {
    programSessions: [],
    standaloneSessions: []
  },
  currentWorkoutSession: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create a new workout session
export const createWorkoutSession = createAsyncThunk(
  "workoutSessions/create",
  async (workoutSessionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await workoutSessionService.createWorkoutSession(workoutSessionData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get workout sessions
export const getWorkoutSessions = createAsyncThunk(
  "workoutSessions/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await workoutSessionService.getWorkoutSessions(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user's recent workout sessions (both program and standalone)
export const getRecentWorkoutSessions = createAsyncThunk(
  "workoutSessions/getRecent",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await workoutSessionService.getRecentWorkoutSessions(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete workout session
export const deleteWorkoutSession = createAsyncThunk(
  "workoutSessions/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await workoutSessionService.deleteWorkoutSession(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get single workout session
export const getWorkoutSession = createAsyncThunk(
  "workoutSessions/getOne",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await workoutSessionService.getWorkoutSession(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update workout session
export const updateWorkoutSession = createAsyncThunk(
  "workoutSessions/update",
  async ({ id, workoutSessionData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await workoutSessionService.updateWorkoutSession(id, workoutSessionData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const workoutSessionSlice = createSlice({
  name: "workoutSession",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createWorkoutSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWorkoutSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workoutSessions.push(action.payload);
      })
      .addCase(createWorkoutSession.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getWorkoutSessions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWorkoutSessions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workoutSessions = action.payload;
      })
      .addCase(getWorkoutSessions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRecentWorkoutSessions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecentWorkoutSessions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recentSessions = action.payload;
      })
      .addCase(getRecentWorkoutSessions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteWorkoutSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWorkoutSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workoutSessions = state.workoutSessions.filter(
          (workoutSession) => workoutSession._id !== action.payload.id
        );
      })
      .addCase(deleteWorkoutSession.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getWorkoutSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWorkoutSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentWorkoutSession = action.payload;
      })
      .addCase(getWorkoutSession.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateWorkoutSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWorkoutSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentWorkoutSession = action.payload;
      })
      .addCase(updateWorkoutSession.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = workoutSessionSlice.actions;

export const selectWorkoutSessions = (state) => state.workoutSessions;

export default workoutSessionSlice.reducer;
