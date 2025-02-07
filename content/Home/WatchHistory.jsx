"use client";
import { useEffect, useState } from "react";
import ContinueWatchingCard from "@/components/Cards/ContinueWatchingCard/ContinueWatchingCard";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import { getWatchProgress, removeWatchProgress } from "@/utils/ProgressHandler";
import Link from "next/link";

const WatchHistory = () => {
  const [mappedData, setMappedData] = useState([]);

  useEffect(() => {
    const data = getWatchProgress();
    if (data) {
      setMappedData(data);
    }
  }, []);

  // Remove the movie from both localStorage and state
  const handleRemove = (id) => {
    removeWatchProgress(id);
    setMappedData((prevData) => prevData.filter(item => item.id !== id));
  };

  return mappedData.length < 1 ? null : (
    <div className="w-full max-w-[96rem] relative mx-5">
      <div className="flex justify-between">
        <h1 className="text-[#f6f4f4ea] font-medium text-xl font-['poppins'] max-[450px]:text-[1rem]">
          | Continue Watching
        </h1>

        <Link
          href={`/continue-watching`}
          className="text-[#ffffffbd] flex items-center gap-1 cursor-pointer hover:text-slate-500 transition"
        >
          See All <FaArrowRight />
        </Link>
      </div>

      {/* Reduced height for movie cards */}
      <div className="mt-6 mb-16 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] max-[725px]:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-2">
        {mappedData.map(data => (
          <div key={data.id} className="relative">
            <ContinueWatchingCard data={data} customClass="h-[120px]" /> {/* Adjust height */}
            {/* Bin (trash) icon button */}
            <button
              onClick={() => handleRemove(data.id)}
              className="absolute top-1 right-1 bg-red-600 p-1 rounded-full text-white hover:bg-red-700 transition"
              title="Remove"
            >
              <FaTrash size={14} />
            </button>
          </div>
        ))}

        {(mappedData?.length < 4) ? Array.from({ length: 4 - mappedData?.length }).map((_, idx) => (
          <ContinueWatchingCard key={idx} hidden customClass="h-[120px]" />
        )) : null}
      </div>
    </div>
  );
}

export default WatchHistory;
