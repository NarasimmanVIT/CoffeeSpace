import { useState } from "react";
import profiles from "../../Data/Profiles";

const useDiscoverProfiles = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < profiles.length - 1) {
      setIndex(index + 1);
    }
  };

  const current = profiles[index];
  const remaining = profiles.length - index - 1;

  return {
    current,
    remaining,
    handleNext,
  };
};

export default useDiscoverProfiles;
