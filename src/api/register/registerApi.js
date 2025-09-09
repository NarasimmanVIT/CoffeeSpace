import axiosInstance from "../axiosInstance";

export const registerUser = async (payload) => {
  try {
    const res = await axiosInstance.post("/api/register", payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Registration failed" };
  }
};

export const viewProfile = async () => {
  try {
    const res = await axiosInstance.get("/api/profile/me");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch profile" };
  }
};

export const editProfile = async (payload) => {
  try {
    const res = await axiosInstance.put("/api/editProfile", payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to update profile" };
  }
};