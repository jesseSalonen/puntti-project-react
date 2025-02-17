import axios from "../../AxiosConfig";
import CommonHelpers from "../../helpers/CommonHelpers";

const API_URL = "api/exercises/";

// Create new exercise
const createExercise = async (exerciseData, token) => {
  const config = CommonHelpers.getAuthHeader(token);

  const response = await axios.post(API_URL, exerciseData, config);

  return response.data;
};

// Get user exercises
const getExercises = async (token) => {
  const config = CommonHelpers.getAuthHeader(token);

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get single exercise
const getExercise = async (exerciseId, token) => {
  const config = CommonHelpers.getAuthHeader(token);

  const response = await axios.get(API_URL + exerciseId, config);

  return response.data;
};

// Update exercise
const updateExercise = async (exerciseId, exerciseData, token) => {
  const config = CommonHelpers.getAuthHeader(token);

  const response = await axios.put(API_URL + exerciseId, exerciseData, config);

  return response.data;
};

// Delete user exercise
const deleteExercise = async (exerciseId, token) => {
  const config = CommonHelpers.getAuthHeader(token);

  const response = await axios.delete(API_URL + exerciseId, config);

  return response.data;
};

const exerciseService = {
  createExercise,
  getExercises,
  getExercise,
  updateExercise,
  deleteExercise,
};

export default exerciseService;
