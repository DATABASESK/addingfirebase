"use client";

import Card from "@/components/Cards/Card/Card";
import { getMcuMovies } from "@/lib/MoviesFunctions";
import { useState, useEffect } from "react";

const MarvelMovies = () => {
  const [page, setPage] = useState(0);
  const [marvelMovies, setMarvelMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cachedPages, setCachedPages] = useState(new Set());

  const fetchMarvelMovies = async (pageNumber) => {
    if (cachedPages.has(pageNumber)) return;

    setLoading(true);
    try {
      const data = await getMcuMovies(pageNumber);
      if (data.length > 0) {
        setMarvelMovies((prev) => [...prev, ...data]);
        setCachedPages((prev) => new Set(prev).add(pageNumber));
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch first 21 movies when component mounts
  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      fetchMarvelMovies(i);
    }
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMarvelMovies(nextPage);
  };

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
          Array(10)
            .fill(0)
            .map((_, index) => <Card key={index} loading />)}
      </div>

      <div className="mt-8 w-full flex justify-center">
        {!loading && (
          <button
            className="bg-[#22212c] hover:bg-[#2d2c3e] cursor-pointer w-full max-w-96 text-center py-2 rounded-lg text-slate-200"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default MarvelMovies;
