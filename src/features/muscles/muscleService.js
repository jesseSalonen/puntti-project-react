import axios from "../../AxiosConfig";

const API_URL = "api/muscles/";

// Create new muscle
const createMuscle = async (muscleData, token) => {
  const config = CommonHelpers.getAuthHeader(token);

  const response = await axios.post(API_URL, muscleData, config);

  return response.data;
};

// Get muscles
const getMuscles = async (token) => {
  const config = CommonHelpers.getAuthHeader(token);

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete muscle
const deleteMuscle = async (muscleId, token) => {
  const config = CommonHelpers.getAuthHeader(token);

  const response = await axios.delete(API_URL + muscleId, config);

  return response.data;
};

const muscleService = {
  createMuscle,
  getMuscles,
  deleteMuscle,
};

export default muscleService;
