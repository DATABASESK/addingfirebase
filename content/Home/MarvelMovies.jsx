"use client";

import Card from "@/components/Cards/Card/Card";
import { getMcuMovies } from "@/lib/MoviesFunctions"; // Assuming this function is updated with Marvel movies
import { useEffect, useState } from "react";

const MarvelMovies = () => {
  const [page, setPage] = useState(1);
  const [marvelMovies, setMarvelMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if more movies are available
  const [endMessage, setEndMessage] = useState(""); // Message when collection ends

  // Movies should be displayed in rows of 3
  const moviesPerPage = 3;

  useEffect(() => {
    const fetchMarvelMovies = async () => {
      setLoading(true);
      const data = await getMcuMovies(page); // Fetch MCU movies

      if (data.length > 0) {
        setMarvelMovies((prev) => [...prev, ...data]); // Append new movies
      }

      // Check if we've reached the end (The Losers movie)
      if (data.some((movie) => movie.title === "The Losers")) {
        setHasMore(false);
        setEndMessage("MCU and DC collection ended!");
      }

      setLoading(false);
    };

    fetchMarvelMovies();
  }, [page]); // Fetch data whenever page changes

  // Render movies in chunks of 3
  const renderMovieRows = () => {
    const rows = [];
    for (let i = 0; i < marvelMovies.length; i += moviesPerPage) {
      rows.push(
        <div key={i} className="movie-row grid grid-cols-3 gap-3">
          {marvelMovies.slice(i, i + moviesPerPage).map((movie, index) => (
            <Card data={movie} key={index} />
          ))}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="w-full max-w-[96rem] relative bottom-28 mx-5 mt-16 max-[1270px]:-mt-2">
      <h1 className="text-[#ffffffbd] font-medium text-2xl font-['poppins']">
        | (MCU) and (DC) Collections
      </h1>

      <div className="mt-8">
        {renderMovieRows()}

        {loading &&
          Array(20)
            .fill(0)
            .map((_, index) => <Card key={index} loading />)}
      </div>

      {/* Load More Button */}
      <div className="mt-8 w-full flex justify-center">
        {!loading && hasMore && (
          <div
            className="bg-[#22212c] hover:bg-[#2d2c3e] cursor-pointer w-full max-w-96 text-center py-2 rounded-lg text-slate-200"
            onClick={() => setPage((prev) => prev + 1)} // Load more pages
          >
            Load More
          </div>
        )}

        {!hasMore && !loading && (
          <p className="text-gray-400 mt-4">{endMessage}</p> // Show the end message
        )}
      </div>
    </div>
  );
};

export default MarvelMovies;
