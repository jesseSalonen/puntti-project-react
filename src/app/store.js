import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import exerciseReducer from "../features/exercises/exerciseSlice";
import muscleReducer from "../features/muscles/muscleSlice";
import workoutReducer from "../features/workouts/workoutSlice";
import programReducer from "../features/programs/programSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exercises: exerciseReducer,
    muscles: muscleReducer,
    workouts: workoutReducer,
    programs: programReducer,
  },
});