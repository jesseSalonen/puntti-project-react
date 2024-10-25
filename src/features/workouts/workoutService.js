import axios from "../../AxiosConfig";
import CommonHelpers from "../../helpers/CommonHelpers";

const API_URL = "api/workouts/";

// Create new workout
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

// Delete user exercise
const deleteWorkout = async (workoutId, token) => {
  const config = CommonHelpers.getAuthHeader(token);

  const response = await axios.delete(API_URL + workoutId, config);

  return response.data;
};

const workoutService = {
  createWorkout,
  getWorkouts,
  deleteWorkout,
};

export default workoutService;
