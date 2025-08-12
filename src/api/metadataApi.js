import axiosInstance from "../api/axiosInstance"; 

export const fetchMetadata = async () => {
  try {
    const response = await axiosInstance.get("/metadata");
    return response.data;
  } catch (error) {
    console.error("Error fetching metadata:", error);
    throw error;
  }
};
