import axios from "../../AxiosConfig";

const API_URL = "api/exercises/";

// Create new exercise
const createExercise = async (exerciseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, exerciseData, config);

  return response.data;
};

// Get user exercises
const getExercises = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const exerciseService = {
  createExercise,
  getExercises,
};

export default exerciseService;
