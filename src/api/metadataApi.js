import axios from "axios";

const API_BASE_URL = "https://bf4634a16911.ngrok-free.app/"; 

export const fetchMetadata = async () => {
  try {
    const response = await axios.get(`/metadata`);
    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching metadata:", error);
    throw error;
  }
};
