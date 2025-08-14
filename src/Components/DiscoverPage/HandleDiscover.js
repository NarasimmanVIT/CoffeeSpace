export const handleNext = (index, setIndex, profilesLength) => {
  if (index < profilesLength - 1) {
    setIndex(index + 1);
  }
};
