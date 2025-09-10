import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance"; 

const useConnectedInvites = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await axiosInstance.get("/api/connections?page=0&size=10");
        if (response.data.success && response.data.data?.items) {
          setConnections(response.data.data.items);
          console.log("Connections:", response.data.data.items);
        } else {
          setError(response.data.message || "Failed to fetch connections");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  return { connections, loading, error };
};

export default useConnectedInvites;
