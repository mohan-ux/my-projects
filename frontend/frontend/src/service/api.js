import axios from "axios";

const API_URL = "http://localhost:5000"; // Update this with your backend URL

export const submitUserData = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/user/analysis`, userData);
    return response.data;
  } catch (error) {
    console.error("Error submitting user data", error);
    throw error;
  }
};

export const getLearningPath = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/user/learning-path`);
    return response.data;
  } catch (error) {
    console.error("Error fetching learning path", error);
    throw error;
  }
};
