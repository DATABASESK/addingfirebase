export const removeWatchProgress = (id) => {
  const data = JSON.parse(localStorage.getItem("watchProgress")) || [];
  const updatedData = data.filter(item => item.id !== id);
  localStorage.setItem("watchProgress", JSON.stringify(updatedData));
};
