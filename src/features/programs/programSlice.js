import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import programService from "./programService";

const initialState = {
  programs: [],
  currentProgram: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new program
export const createProgram = createAsyncThunk(
  "programs/create",
  async (programData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await programService.createProgram(programData, token);
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

// Get programs
export const getPrograms = createAsyncThunk(
  "programs/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await programService.getPrograms(token);
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

// Delete program
export const deleteProgram = createAsyncThunk(
  "programs/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await programService.deleteProgram(id, token);
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

// Get single program
export const getProgram = createAsyncThunk(
  "programs/getOne",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await programService.getProgram(id, token);
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

// Update program
export const updateProgram = createAsyncThunk(
  "programs/update",
  async ({ id, programData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await programService.updateProgram(id, programData, token);
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

export const programSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProgram.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProgram.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.programs.push(action.payload);
      })
      .addCase(createProgram.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPrograms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPrograms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.programs = action.payload;
      })
      .addCase(getPrograms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProgram.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProgram.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.programs = state.programs.filter(
          (program) => program._id !== action.payload.id
        );
      })
      .addCase(deleteProgram.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProgram.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProgram.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProgram = action.payload;
      })
      .addCase(getProgram.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProgram.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProgram.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentProgram = action.payload;
      })
      .addCase(updateProgram.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = programSlice.actions;

export const selectPrograms = (state) => state.programs;

export default programSlice.reducer;