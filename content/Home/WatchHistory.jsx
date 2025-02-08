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

  const handleRemove = (id) => {
    removeWatchProgress(id);
    setMappedData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return mappedData.length < 1 ? null : (
    <div className="w-full max-w-[96rem] mx-5 mb-10 pb-10">  
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[#f6f4f4ea] font-medium text-2xl font-['poppins']">
          | Continue Watching
        </h1>

        <Link
          href={`/continue-watching`}
          className="text-[#ffffffbd] flex items-center gap-1 cursor-pointer hover:text-slate-500 transition"
        >
          See All <FaArrowRight />
        </Link>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {mappedData.map((data) => (
          <div key={data.id} className="relative bg-black p-2 rounded-lg">
            {/* Display Full Movie Name */}
            <p className="text-white font-semibold text-lg truncate">
              {data.title}
            </p>

            <ContinueWatchingCard data={data} customClass="h-[160px]" />

            {/* Move Play Button to Bottom Right */}
            <button
              onClick={() => handleRemove(data.id)}
              className="absolute bottom-2 right-2 bg-red-600 p-2 rounded-full text-white hover:bg-red-700 transition"
              title="Remove"
            >
              <FaTrash size={16} />
            </button>
          </div>
        ))}

        {/* Filler Cards for Consistent UI */}
        {mappedData.length < 4 &&
          Array.from({ length: 4 - mappedData.length }).map((_, idx) => (
            <ContinueWatchingCard key={idx} hidden customClass="h-[160px]" />
          ))}
      </div>
    </div>
  );
};

export default WatchHistory;
