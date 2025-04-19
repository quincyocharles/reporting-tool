import axios from "axios";

const API_BASE_URL = "https://reports.ryleq.com:4100/api";

export const fetchReports = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reports`, {
      // Fixed template literal syntax
      withCredentials: true, // Use if the backend requires cookies or authentication
      headers: {
        "Content-Type": "application/json", // Ensure correct content type
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

// Insert a new report (POST request)
// export const insertReport = async (reportData) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/reports`, reportData);
//     return response.data;
//   } catch (error) {
//     console.error("Error inserting report:", error);
//     throw error;
//   }
// };

// Login (POST request)
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      credentials
    );
    return response.data; // Assuming the API returns a token
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// ✅ Create user (admin only)
export const createUser = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/create-user`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // If cookies/session are required
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error.response?.data || error);
    throw error;
  }
};

// Get User Info
export const getUserProfile = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/auth/getUserInfo/?userName=alex`,
      {
        withCredentials: true, // if using cookies/sessions
        headers: {
          "Content-Type": "application/json",
          // Include token here if needed:
          // Authorization: `Bearer ${yourToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
