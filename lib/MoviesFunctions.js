export const getRecentTamilMovies = async (page = 1) => {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  // OTT Provider IDs (Netflix, Prime, Zee5, Aha, SunNXT, SonyLIV, JioCinema, Disney+ Hotstar)
  const ottProviders = [8, 9, 119, 122, 224, 237, 339, 619];

  const url = `https://api.themoviedb.org/3/discover/movie?language=ta-IN&region=IN&with_original_language=ta&sort_by=release_date.desc&release_date.lte=${today}&with_watch_providers=${ottProviders.join(
    "|"
  )}&watch_region=IN&with_release_type=3|4&page=${page}&api_key=38248c047fd8ef9b0a7e25d40651e870`;

  console.log("Fetching URL:", url); // Debugging: Check the API request

  try {
    const res = await fetch(url, { cache: "no-cache" });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    console.log("API Response:", data); // Debugging: Check the response

    return data.results || []; // Ensure an array is always returned
  } catch (error) {
    console.error("Error fetching recent Tamil movies on OTT:", error);
    return []; // Return empty array to prevent crashes
  }
};

export const getTopNetflixSeriesGlobal = async (page = 1) => {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  // Netflix OTT Provider ID
  const netflixProvider = 8;

  // Watch region (required for provider filtering)
  const watchRegion = "US"; // Change if needed

  const url = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&first_air_date.lte=${today}&with_watch_providers=${netflixProvider}&watch_region=${watchRegion}&include_adult=true&page=${page}&api_key=38248c047fd8ef9b0a7e25d40651e870`;

  console.log("Fetching URL:", url); // Debugging: Check the API request

  try {
    const res = await fetch(url, { cache: "no-cache" });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    console.log("API Response:", data); // Debugging: Check the response

    // ✅ Filter for specific popular Netflix series
    const popularNetflixSeries = [
      "Stranger Things",
      "Squid Game",
      "The Umbrella Academy",
      "Dark",
      "Money Heist",
      "Alice in Borderland",
      "The Witcher",
      "Black Mirror",
      "You",
      "Wednesday",
      "Arcane",
      "Breaking Bad",
      "Better Call Saul",
      "The Sandman",
      "Narcos",
      "Peaky Blinders",
      "Love Death + Robots",
      "Sex Education",
      "Ozark"
    ];

    // ✅ Additional popular Mystery and Sci-Fi Netflix series
    const mysterySciFiSeries = [
      "Stranger Things",
      "Dark",
      "The Umbrella Academy",
      "The Witcher",
      "Black Mirror",
      "Altered Carbon",
      "Travelers",
      "The OA",
      "3% (Three Percent)",
      "The 100",
      "Star Trek: Discovery",
      "The Man in the High Castle",
      "Sense8",
      "The Expanse",
      "Fringe",
      "The Rain",
      "Raising Dion",
      "Inside No. 9",
      "The Stranger",
      "The Haunting of Hill House"
    ];

    // ✅ Combine the two lists (Popular Netflix + Mystery/Sci-Fi Series)
    const combinedSeriesList = [...new Set([...popularNetflixSeries, ...mysterySciFiSeries])];

    // ✅ Filter API results to only include these series
    const filteredSeries = data.results.filter(series =>
      combinedSeriesList.includes(series.name)
    );

    return filteredSeries || []; // Return only the filtered results
  } catch (error) {
    console.error("Error fetching top Netflix series globally:", error);
    return []; // Return empty array to prevent crashes
  }
};

// Fetch Romantic Movies
export const getRomanticMovies = async (page) => {
  const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=10749&sort_by=popularity.desc&page=${page}&api_key=38248c047fd8ef9b0a7e25d40651e870`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 * 24 } });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`Error: ${res.status} - ${errorBody}`);
    }

    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching romantic movies:", error);
    return [];
  }
};


// Trending Movies
export const getTrendingMovies = async (type = "all", page = 1) => {
  const url = `https://api.themoviedb.org/3/trending/${(type === "movies" ? "movie" : type) || "all"}/day?language=en-US&page=${page}&api_key=${process.env.TMDB_API_KEY}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 * 24 } });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

//TamilTrendingMovies

// Fetch Tamil Trending Movies
export const getTamilTrendingMovies = async (page = 1) => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=38248c047fd8ef9b0a7e25d40651e870&language=ta-IN&region=IN&sort_by=popularity.desc&page=${page}`;

  try {
    const res = await fetch(url, { cache: "no-cache" });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    return data.results || []; // Ensure it always returns an array
  } catch (error) {
    console.error("Error fetching Tamil trending movies:", error);
    return []; // Return empty array to prevent crashes
  }
};
// Fetch Vijay Movies
export const getVijayMovies = async (page = 1) => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=38248c047fd8ef9b0a7e25d40651e870&language=ta-IN&region=IN&sort_by=popularity.desc&with_cast=12246&page=${page}`;

  try {
    const res = await fetch(url, { cache: "no-cache" });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    return data.results || []; // Ensure it always returns an array
  } catch (error) {
    console.error("Error fetching Vijay movies:", error);
    return []; // Return empty array to prevent crashes
  }
};

// Popular Movies
export const getPopularMovies = async (page) => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&api_key=38248c047fd8ef9b0a7e25d40651e870`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 * 24 } });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`Error: ${res.status} - ${errorBody}`);
    }


    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Fetch Horror Movies
export const getHorrorMovies = async (page = 1) => {
  const apiKey = "38248c047fd8ef9b0a7e25d40651e870";
  const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=27&sort_by=popularity.desc&page=${page}&api_key=${apiKey}`;

  try {
    const res = await fetch(url, { cache: "no-cache" });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    return data.results || []; // Ensure it always returns an array
  } catch (error) {
    console.error("Error fetching horror movies:", error);
    return []; // Return empty array to prevent crashes
  }
};

// Top Rated Movies
// Fetch Top Rated Movies
export const getTopRatedMovies = async (page = 1) => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}&api_key=38248c047fd8ef9b0a7e25d40651e870`;

  try {
    const res = await fetch(url, { cache: "no-cache" });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    return data.results || []; // Ensure it always returns an array
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
    return []; // Return empty array to prevent crashes
  }
};



// Top TV / MOVIES INFO
export const getInfoTMDB = async (TMDBID, media_type) => {
  // Validate media_type
  const validMediaTypes = ["movie", "tv"];
  if (!validMediaTypes.includes(media_type)) {
    return "media_type_error";
  }

  const baseUrl = `https://api.themoviedb.org/3`;
  const url = media_type === "movie"
    ? `${baseUrl}/movie/${TMDBID}?language=en-US&api_key=${process.env.TMDB_API_KEY}`
    : `${baseUrl}/tv/${TMDBID}?language=en-US&api_key=${process.env.TMDB_API_KEY}`;

  const maxRetries = 5; // Maximum number of retries
  let attempts = 0; // Counter for the number of attempts

  while (attempts < maxRetries) {
    try {
      // Fetch the data based on the media type
      const res = await fetch(url, { cache: "no-cache" });

      if (res.status === 404) {
        // Return media_type_error if no media is found (404 response)
        return "media_type_error";
      }

      if (res.ok) {
        const data = await res.json();
        data.type = media_type; // Add type based on the media_type argument
        return data; // Return modified data
      }

      throw new Error(`Unexpected error for ${media_type} with TMDB ID ${TMDBID}.`);

    } catch (error) {
      attempts++; // Increment the attempts counter
      console.error(`Attempt ${attempts} - Error fetching TMDB data: ${error.message}`);

      if (attempts >= maxRetries) {
        return null; // Return null or handle the error accordingly after max retries
      }

      // Optional: wait before the next attempt
      await new Promise(res => setTimeout(res, 10)); // Wait for 1 second before retrying
    }
  }

  return null; // Return null if all attempts fail
};







// GET TV / MOVIES RECOMMENDATION
export const getRecommendation = async (TMDBID, Type) => {
  const url = `https://api.themoviedb.org/3/${Type || "movie"}/${TMDBID}/recommendations?&api_key=${process.env.TMDB_API_KEY}`;

  try {
    const res = await fetch(url,
      { next: { revalidate: 21600 } }
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();

    if (data?.results?.length <= 5) {
      const data = getTrendingMovies()

      return data;
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};
