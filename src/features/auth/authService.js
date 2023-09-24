import axios from "../../AxiosConfig";
import CommonHelpers from "../../helpers/CommonHelpers";
const API_URL = "/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

// Check user login
const checkLogin = async (token) => {
  const config = CommonHelpers.getAuthHeader(token);

  const response = await axios.get(API_URL + "me", config);

  return response.data;
};

const authService = {
  register,
  logout,
  login,
  checkLogin,
};

export default authService;
