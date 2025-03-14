export const getEpisodes = async (TMDBID, season) => {
  const url = `https://api.themoviedb.org/3/tv/${TMDBID}/season/${season || 1}?language=en-US?&api_key=${process.env.TMDB_API_KEY}`;

  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      caches: "no-cache"
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.error}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};


export const getTopNetflixSeriesGlobal = async (page = 1) => {
   const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  // Netflix OTT Provider ID
  const netflixProvider = 8;

  // Watch region (required for provider filtering)
  const watchRegion = "US"; // Change if needed

  // Mystery Genre ID = 9648
  const mysteryGenreId = 9648;

  const url = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&first_air_date.lte=${today}&with_watch_providers=${netflixProvider}&watch_region=${watchRegion}&with_genres=${mysteryGenreId}&include_adult=true&page=${page}&api_key=38248c047fd8ef9b0a7e25d40651e870`;

  console.log("Fetching URL:", url); // Debugging: Check the API request

  try {
    const res = await fetch(url, { cache: "no-cache" });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    console.log("API Response:", data); // Debugging: Check the response

    return data.results || []; // Return only the fetched Mystery series
  } catch (error) {
    console.error("Error fetching Netflix Mystery series:", error);
    return []; // Return empty array to prevent crashes
  }
};
