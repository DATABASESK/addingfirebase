"use client";

import Card from "@/components/Cards/Card/Card";
import { getMcuMovies } from "@/lib/MoviesFunctions"; // Assuming this function is updated with Marvel movies
import { useEffect, useState } from "react";

const MarvelMovies = () => {
  const [page, setPage] = useState(1);
  const [marvelMovies, setMarvelMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMarvelMovies = async () => {
      setLoading(true);
      const data = await getMcuMovies(page); // Fetch MCU movies

      if (data.length > 0) {
        setMarvelMovies((prev) => [...prev, ...data]); // Append new movies
      }

      setLoading(false);
    };

    fetchMarvelMovies();
  }, [page]); // Fetch data whenever page changes

  return (
    <div className="w-full max-w-[96rem] relative bottom-28 mx-5 mt-16 max-[1270px]:-mt-2">
      <h1 className="text-[#ffffffbd] font-medium text-2xl font-['poppins']">
        | (MCU) and (DC) Collections
      </h1>

      <div className="mt-8 grid grid-auto-fit gap-3">
        {marvelMovies.length > 0 ? (
          marvelMovies.map((item, index) => <Card data={item} key={index} />)
        ) : (
          !loading && <p className="text-gray-400">No Marvel movies found.</p>
        )}

        {loading &&
          Array(20)
            .fill(0)
            .map((_, index) => <Card key={index} loading />)}
      </div>

      <div className="mt-8 w-full flex justify-center">
        {!loading && (
          <div
            className="bg-[#22212c] hover:bg-[#2d2c3e] cursor-pointer w-full max-w-96 text-center py-2 rounded-lg text-slate-200"
            onClick={() => setPage((prev) => prev + 1)} // Load more pages
          >
            Load More
          </div>
        )}
      </div>
    </div>
  );
};

export default MarvelMovies;
