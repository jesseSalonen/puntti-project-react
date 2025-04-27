import axios from "../../AxiosConfig";
import CommonHelpers from "../../helpers/CommonHelpers";

const API_URL = "api/workout-sessions/";

// Create a new workout session
const createWorkoutSession = async (workoutSessionData, token) => {
  const config = CommonHelpers.getAuthHeader(token);

  const response = await axios.post(API_URL, workoutSessionData, config);

  return response.data;
};

// Get user workout sessions
const getWorkoutSessions = async (token) => {
  const config = CommonHelpers.getAuthHeader(token);

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get recent sessions
const getRecentWorkoutSessions = async (token) => {
  const config = CommonHelpers.getAuthHeader(token);

  const response = await axios.get(API_URL + 'recent', config);

  return response.data;
};

// Get single workout session
const getWorkoutSession = async (workoutSessionId, token) => {
  const config = CommonHelpers.getAuthHeader(token);

  const response = await axios.get(API_URL + workoutSessionId, config);

  return response.data;
};

// Update workout session
const updateWorkoutSession = async (workoutSessionId, workoutSessionData, token) => {
  const config = CommonHelpers.getAuthHeader(token);

  const response = await axios.put(API_URL + workoutSessionId, workoutSessionData, config);

  return response.data;
};

// Delete workout session
const deleteWorkoutSession = async (workoutSessionId, token) => {
  const config = CommonHelpers.getAuthHeader(token);

  const response = await axios.delete(API_URL + workoutSessionId, config);

  return response.data;
};

const workoutSessionService = {
  createWorkoutSession,
  getWorkoutSessions,
  getRecentWorkoutSessions,
  getWorkoutSession,
  updateWorkoutSession,
  deleteWorkoutSession,
};

export default workoutSessionService;
