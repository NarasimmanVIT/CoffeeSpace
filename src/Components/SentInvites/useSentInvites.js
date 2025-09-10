import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance"; 

const useSentInvites = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSentInvites = async () => {
      try {
        const response = await axiosInstance.get("/api/invites/sent?page=0&size=10");

        if (response.data.success && response.data.data?.items) {
          setInvites(response.data.data.items);
          console.log("Sent Invites:", response.data.data.items);
        } else {
          setError(response.data.message || "Failed to fetch sent invites");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchSentInvites();
  }, []);

  return { invites, loading, error };
};

export default useSentInvites;
