//mcu and dc
export const getMcuMovies = async (page = 1) => {
  const apiKey = "38248c047fd8ef9b0a7e25d40651e870";

  // Mapping of MCU and DC Movies with their TMDb IDs
  const movieIds = [
    1726, // Iron Man (2008)
    10138, // Iron Man 2 (2010)
    1724, // The Incredible Hulk (2008)
    10195, // Thor (2011)
    1771, // Captain America: The First Avenger (2011)
    24428, // The Avengers (2012)
    68721, // Iron Man 3 (2013)
    76338, // Thor: The Dark World (2013)
    100402, // Captain America: The Winter Soldier (2014)
    118340, // Guardians of the Galaxy (2014)
    283995, // Guardians of the Galaxy Vol. 2 (2017)
    99861, // Avengers: Age of Ultron (2015)
    102899, // Ant-Man (2015)
    271110, // Captain America: Civil War (2016)
    284052, // Doctor Strange (2016)
    284053, // Thor: Ragnarok (2017)
    363088, // Ant-Man and the Wasp (2018)
    299536, // Avengers: Infinity War (2018)
    299534, // Avengers: Endgame (2019)
    429617, // Spider-Man: Far From Home (2019)
    284287, // Black Panther (2018)
    315635, // Spider-Man: Homecoming (2017)
    299537, // Captain Marvel (2019)
    497698, // Black Widow (2021)
    566525, // Shang-Chi and the Legend of the Ten Rings (2021)
    524434, // Eternals (2021)
    634649, // Spider-Man: No Way Home (2021)
    453395, // Doctor Strange in the Multiverse of Madness (2022)
    616037, // Thor: Love and Thunder (2022)
    505642, // Black Panther: Wakanda Forever (2022)
    640146, // Ant-Man and the Wasp: Quantumania (2023)
    447365, // Guardians of the Galaxy Vol. 3 (2023)
    609681, // The Marvels (2023)
    545609, // Deadpool 3 (2024)
  ];

  try {
    const movies = [];
    
    for (const id of movieIds) {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
      const res = await fetch(url, { cache: "no-cache" });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      movies.push(data);
    }

    return movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};


//fantasy

export const getFantasyMovies = async (page = 1) => {
  const apiKey = "38248c047fd8ef9b0a7e25d40651e870";
  const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=14&sort_by=popularity.desc&page=${page}&api_key=${apiKey}`;

  try {
    const res = await fetch(url, { cache: "no-cache" });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    return data.results || []; // Ensure it always returns an array
  } catch (error) {
    console.error("Error fetching fantasy movies:", error);
    return []; // Return empty array to prevent crashes
  }
};


//recent tamil ott
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
