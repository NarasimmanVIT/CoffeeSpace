import axiosInstance from "../axiosInstance";

export const registerUser = async (payload) => {
  try {
    const res = await axiosInstance.post("/api/register", payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Registration failed" };
  }
};