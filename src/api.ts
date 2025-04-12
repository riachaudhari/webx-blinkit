import axios from "axios";

const API_URL = "http://127.0.0.1:5000"; // Flask backend URL

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-categories`);
    return response.data; // Return categories JSON data
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
