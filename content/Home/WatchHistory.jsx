"use client";
import { useEffect, useState } from "react";
import ContinueWatchingCard from "@/components/Cards/ContinueWatchingCard/ContinueWatchingCard";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import { getWatchProgress, removeWatchProgress } from "@/utils/ProgressHandler";
import Link from "next/link";

const WatchHistory = () => {
  const [watchHistory, setWatchHistory] = useState([]);

  // Load watch history from localStorage using your function
  const loadWatchHistory = () => {
    const data = getWatchProgress(); // by default, it slices to the 4 most recent items
    setWatchHistory(data);
  };

  useEffect(() => {
    loadWatchHistory();
  }, []);

  // When the bin icon is clicked, remove the movie and reload the list.
  const handleRemove = (id) => {
    removeWatchProgress(id);
    loadWatchHistory();
  };

  // If there is no watch history, render nothing.
  if (!watchHistory || watchHistory.length === 0) return null;

  return (
    <div className="w-full max-w-[96rem] relative mx-5">
      <div className="flex justify-between">
        <h1 className="text-[#f6f4f4ea] font-medium text-2xl font-['poppins'] max-[450px]:text-[1.2rem]">
          | Continue Watching
        </h1>

        <Link
          href="/continue-watching"
          className="text-[#ffffffbd] flex items-center gap-1 cursor-pointer hover:text-slate-500 transition"
        >
          See All <FaArrowRight />
        </Link>
      </div>

      <div className="mt-8 mb-24 grid grid-cols-[repeat(auto-fit,minmax(343px,1fr))] max-[725px]:grid-cols-[repeat(auto-fit,minmax(285px,1fr))] gap-3">
        {watchHistory.map((data) => (
          <div key={data.id} className="relative">
            <ContinueWatchingCard data={data} />

            {/* Bin icon to remove the movie */}
            <button
              onClick={() => handleRemove(data.id)}
              className="absolute top-2 right-2 bg-red-600 p-2 rounded-full text-white hover:bg-red-700 transition"
              title="Remove"
            >
              <FaTrash size={16} />
            </button>
          </div>
        ))}

        {/* If there are fewer than 4 movies, fill the grid with hidden cards */}
        {watchHistory.length < 4 &&
          Array.from({ length: 4 - watchHistory.length }).map((_, index) => (
            <ContinueWatchingCard key={index} hidden />
          ))}
      </div>
    </div>
  );
};

export default WatchHistory;
