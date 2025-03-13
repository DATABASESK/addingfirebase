import Card from "@/components/Cards/Card/Card";
import { getMcuMovies } from "@/lib/MoviesFunctions";
import { useEffect, useState } from "react";

const MarvelMovies = () => {
  const [page, setPage] = useState(1);
  const [marvelMovies, setMarvelMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMarvelMovies = async () => {
      setLoading(true);
      const data = await getMcuMovies(page);
      
      // Log the fetched data for debugging
      console.log("Fetched movies:", data);

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
        | Marvel Movies
      </h1>

      <div className="mt-8 grid grid-auto-fit gap-3">
        {marvelMovies.length > 0 ? (
          marvelMovies.map((item, index) => <Card data={item} key={index} />)
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

export default MarvelMovies;
