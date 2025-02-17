import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import exerciseService from "./exerciseService";

const initialState = {
  exercises: [],
  currentExercise: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new exercise
export const createExercise = createAsyncThunk(
  "exercises/create",
  async (exerciseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await exerciseService.createExercise(exerciseData, token);
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

// Get exercises
export const getExercises = createAsyncThunk(
  "exercises/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await exerciseService.getExercises(token);
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

// Delete user exercise
export const deleteExercise = createAsyncThunk(
  "exercises/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await exerciseService.deleteExercise(id, token);
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

// Get single exercise
export const getExercise = createAsyncThunk(
  "exercises/getOne",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await exerciseService.getExercise(id, token);
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

// Update exercise
export const updateExercise = createAsyncThunk(
  "exercises/update",
  async ({ id, exerciseData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await exerciseService.updateExercise(id, exerciseData, token);
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

export const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createExercise.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExercise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exercises.push(action.payload);
      })
      .addCase(createExercise.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getExercises.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExercises.fulfilled, (state, action) => {
        state.isLoading = false;
        state.exercises = action.payload;
      })
      .addCase(getExercises.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteExercise.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExercise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.exercises = state.exercises.filter(
          (exercise) => exercise._id !== action.payload.id
        );
      })
      .addCase(deleteExercise.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getExercise.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExercise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentExercise = action.payload;
      })
      .addCase(getExercise.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateExercise.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateExercise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentExercise = action.payload;
      })
      .addCase(updateExercise.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = exerciseSlice.actions;

export const selectExercises = (state) => state.exercises;

export default exerciseSlice.reducer;
