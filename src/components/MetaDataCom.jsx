import React, { useEffect, useState } from "react";
import { fetchMetadata } from "../api/metadataApi";

const MetadataPage = () => {
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const data = await fetchMetadata();
        setMetadata(data);
        console.log("Fetched Metadata:", data);
      } catch (error) {
        console.error("Failed to load metadata:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMetadata();
  }, []);

  return 
};

export default MetadataPage;
