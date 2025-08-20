import { useState, useEffect } from "react";
import { fetchMetadata } from "../../../api/register/metadataApi"; 
// import { fallbackExperience, fallbackGoals } from "../constants/metadataFallback";

export default function useMetadata() {
  const [metadata, setMetadata] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMetadata = async () => {
      try {
        const data = await fetchMetadata();
        if (data) {
            setMetadata(data);
        }
        
      } catch (err) {
        setError(err.message);
        console.warn("Metadata fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    getMetadata();
  }, []);

  return { metadata, loading, error };
}