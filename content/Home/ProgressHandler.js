export const getWatchProgress = () => {
  return JSON.parse(localStorage.getItem("watchProgress")) || [];
};

export const removeWatchProgress = (id) => {
  let data = getWatchProgress();
  let updatedData = data.filter(item => item.id !== id);
  
  // Update localStorage to permanently remove movie
  localStorage.setItem("watchProgress", JSON.stringify(updatedData));
};
