import axios from "../../AxiosConfig";
import CommonHelpers from "../../helpers/CommonHelpers";

const API_URL = "api/workouts/";

// Create a new workout
const createWorkout = async (workoutData, token) => {
  const config = CommonHelpers.getAuthHeader(token);

  const response = await axios.post(API_URL, workoutData, config);

  return response.data;
};

// Get user exercises
const getWorkouts = async (token) => {
  const config = CommonHelpers.getAuthHeader(token);

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get single workout
const getWorkout = async (workoutId, token) => {
  const config = CommonHelpers.getAuthHeader(token);

  const response = await axios.get(API_URL + workoutId, config);

  return response.data;
};

// Update workout
const updateWorkout = async (workoutId, workoutData, token) => {
  const config = CommonHelpers.getAuthHeader(token);

  const response = await axios.put(API_URL + workoutId, workoutData, config);

  return response.data;
};

// Delete user exercise
const deleteWorkout = async (workoutId, token) => {
  const config = CommonHelpers.getAuthHeader(token);

  const response = await axios.delete(API_URL + workoutId, config);

  return response.data;
};

const workoutService = {
  createWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
};

export default workoutService;
