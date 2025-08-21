import axiosInstance from "../../api/axiosInstance";

export const fetchMetadata = async () => {
  try {
    const res = await axiosInstance.get("/metadata"
    //  , {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`, 
    //   },
    // }
  );
    return res.data.data; 
  } catch (err) {
    console.error("Metadata fetch error:", err);A
    throw err;
  }
};