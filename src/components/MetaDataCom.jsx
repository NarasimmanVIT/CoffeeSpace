import React, { useEffect, useState } from "react";
import { fetchMetadata } from "../api/metadataApi";

const MetadataPage = () => {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const data = await fetchMetadata();
        setMetadata(data);
        console.log("Fetched Metadata:", data);
      } catch (error) {
        console.error("Failed to load metadata:", error);
      }
    };

    loadMetadata();
  }, []);
  return 
}

export default MetadataPage;
