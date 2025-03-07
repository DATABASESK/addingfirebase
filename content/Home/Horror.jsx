"use client";

import Card from "@/components/Cards/Card/Card";
import { getHorrorMovies } from "@/lib/MoviesFunctions";
import { useEffect, useState } from "react";

const Horror = () => {
  const [page, setPage] = useState(1);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHorrorMovies = async () => {
      setLoading(true);
      const data = await getHorrorMovies(page);

      if (data.length > 0) {
        setHorrorMovies((prev) => [...prev, ...data]); // Append new movies
      }

      setLoading(false);
    };

    fetchHorrorMovies();
  }, [page]); // Fetch data whenever page changes

  return (
    <div className="w-full max-w-[96rem] relative bottom-28 mx-5 mt-16 max-[1270px]:-mt-2">
      <h1 className="text-[#ffffffbd] font-medium text-2xl font-['poppins']">
        | Horror Movies
      </h1>

      <div className="mt-8 grid grid-auto-fit gap-3">
        {horrorMovies.length > 0 ? (
          horrorMovies.map((item, index) => <Card data={item} key={index} />)
        ) : (
          !loading && <p className="text-gray-400">No movies found.</p>
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

export default Horror;
