import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import muscleService from "./muscleService";

const initialState = {
  muscles: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new muscle
export const createMuscle = createAsyncThunk(
  "muscles/create",
  async (muscleData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await muscleService.createMuscle(muscleData, token);
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

// Get muscles
export const getMuscles = createAsyncThunk(
  "muscles/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await muscleService.getMuscles(token);
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

// Delete muscle
export const deleteMuscle = createAsyncThunk(
  "muscles/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await muscleService.deleteMuscle(id, token);
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

export const muscleSlice = createSlice({
  name: "muscle",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMuscle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMuscle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.muscles.push(action.payload);
      })
      .addCase(createMuscle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMuscles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMuscles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.muscles = action.payload;
      })
      .addCase(getMuscles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteMuscle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMuscle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.muscles = state.muscles.filter(
          (muscle) => muscle._id !== action.payload.id
        );
      })
      .addCase(deleteMuscle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = muscleSlice.actions;
export default muscleSlice.reducer;
