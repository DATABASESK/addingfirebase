// Retrieves the watch history as an array.
// isSlice = true means only the 4 most recent items are returned.
export const getWatchProgress = (isSlice = true) => {
  const movieData = JSON.parse(localStorage.getItem("watch_history") || "{}");
  const entries = Object.entries(movieData);

  // Sort the entries based on the date property (most recent first)
  const sortedData = entries.sort(([, a], [, b]) => {
    return new Date(b?.date || 0) - new Date(a?.date || 0);
  });

  // Slice the array if needed
  const processedData = isSlice ? sortedData.slice(0, 4) : sortedData;

  // Map the entries into an array of objects with the desired properties
  return processedData.map(([key, item]) => ({
    id: key,
    movieid: item.movieid,
    title: item.title,
    episode: item.episode_number,
    totalepisode: item.totalepisode,
    season: item.season_number || 1,
    description: item.description || "",
    runtime: item.runtime || "",
    media_type: item.media_type || "movie",
    date: item.date || 0,
    thumbnail: item.thumbnail || "",
  }));
};

// Saves watch progress
export const saveWatchProgress = (data, episodes, episode) => {
  const existed_data = JSON.parse(localStorage.getItem("watch_history") || "{}");
  const id = data?.id;

  if (episodes.length === 0 || !episodes[episode - 1]?.title) {
    return;
  }

  const episodeInfo = episodes[episode - 1];

  const historyData = {
    [id]: {
      title: episodeInfo?.title || data?.original_name || data?.title || "",
      episode_number: episodeInfo?.episode_number || 1,
      season_number: episodeInfo?.season_number || 1,
      totalepisode: episodes?.length || 1,
      description: episodeInfo?.overview || "",
      runtime: episodeInfo?.runtime || 1,
      media_type: data?.type || "movie",
      date: Date.now(),
      movieid: id,
      // Use a higher-resolution thumbnail to avoid blurriness
      thumbnail: `https://image.tmdb.org/t/p/w500${episodeInfo?.still_path || ""}`,
    },
  };

  localStorage.setItem("watch_history", JSON.stringify({ ...existed_data, ...historyData }));
};

// Remove a movie from the watch history (by its key/id)
export const removeWatchProgress = (id) => {
  const movieData = JSON.parse(localStorage.getItem("watch_history") || "{}");
  if (movieData.hasOwnProperty(id)) {
    delete movieData[id];
    localStorage.setItem("watch_history", JSON.stringify(movieData));
  }
};
