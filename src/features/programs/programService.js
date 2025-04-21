// src/features/programs/programService.js
import axios from "axios";

const API_URL = "/api/programs/";

// Create new program
const createProgram = async (programData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, programData, config);
  return response.data;
};

// Get programs
const getPrograms = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Delete program
const deleteProgram = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

// Get single program
const getProgram = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + id, config);
  return response.data;
};

// Update program
const updateProgram = async (id, programData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + id, programData, config);
  return response.data;
};

const programService = {
  createProgram,
  getPrograms,
  deleteProgram,
  getProgram,
  updateProgram,
};

export default programService;