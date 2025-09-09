/**
 * Utility functions for profile management
 */

/**
 * Save profileId to localStorage
 * @param {string|number|null} profileId - The profile ID to save
 */
export const saveProfileId = (profileId) => {
  localStorage.setItem("profileId", profileId || "null");
};

/**
 * Get profileId from localStorage
 * @returns {string|null} The profile ID or null if not found
 */
export const getProfileId = () => {
  return localStorage.getItem("profileId");
};

/**
 * Check if profileId exists and is valid
 * @returns {boolean} True if profileId exists and is valid
 */
export const hasValidProfileId = () => {
  const profileId = getProfileId();
  return profileId && profileId !== "null" && profileId !== "" && parseInt(profileId) > 0;
};

/**
 * Clear profileId from localStorage
 */
export const clearProfileId = () => {
  localStorage.removeItem("profileId");
};

/**
 * Get profileId as number (returns 0 if invalid)
 * @returns {number} The profile ID as number or 0 if invalid
 */
export const getProfileIdAsNumber = () => {
  const profileId = getProfileId();
  if (!profileId || profileId === "null" || profileId === "") {
    return 0;
  }
  const numId = parseInt(profileId);
  return isNaN(numId) ? 0 : numId;
};
