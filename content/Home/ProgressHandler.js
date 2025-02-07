// Ensure these functions run on the client
export const getWatchProgress = () => {
  if (typeof window !== "undefined") {
    // Parse localStorage data or return an empty array if none exists
    return JSON.parse(localStorage.getItem("watchProgress")) || [];
  }
  return [];
};

export const removeWatchProgress = (id) => {
  if (typeof window !== "undefined") {
    // Get the current watch progress
    const data = JSON.parse(localStorage.getItem("watchProgress")) || [];
    // Filter out the item with the matching id
    const updatedData = data.filter(item => item.id !== id);
    // Update localStorage with the new data array
    localStorage.setItem("watchProgress", JSON.stringify(updatedData));
  }
};
