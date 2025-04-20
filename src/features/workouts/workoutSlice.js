import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import workoutService from "./workoutService";

const initialState = {
  workouts: [],
  currentWorkout: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new workout
export const createWorkout = createAsyncThunk(
  "workouts/create",
  async (workoutData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await workoutService.createWorkout(workoutData, token);
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

// Get workouts
export const getWorkouts = createAsyncThunk(
  "workouts/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await workoutService.getWorkouts(token);
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

// Delete user workout
export const deleteWorkout = createAsyncThunk(
  "workouts/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await workoutService.deleteWorkout(id, token);
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

// Get single workout
export const getWorkout = createAsyncThunk(
  "workouts/getOne",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await workoutService.getWorkout(id, token);
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

// Update workout
export const updateWorkout = createAsyncThunk(
  "workouts/update",
  async ({ id, workoutData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await workoutService.updateWorkout(id, workoutData, token);
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

export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWorkout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workouts.push(action.payload);
      })
      .addCase(createWorkout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getWorkouts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWorkouts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workouts = action.payload;
      })
      .addCase(getWorkouts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workouts = state.workouts.filter(
          (workout) => workout._id !== action.payload.id
        );
      })
      .addCase(deleteWorkout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWorkout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentWorkout = action.payload;
      })
      .addCase(getWorkout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWorkout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentWorkout = action.payload;
      })
      .addCase(updateWorkout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = workoutSlice.actions;

export const selectWorkouts = (state) => state.workouts;

export default workoutSlice.reducer;
