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
    <div className="w-full max-w-[96rem] mx-auto px-5 mb-14 pb-14">  
      <div className="flex justify-between items-center mb-6">
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

      {/* Grid with 3 movies per row */}
      <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
        {mappedData.map((data) => (
          <div key={data.id} className="relative bg-black p-3 rounded-lg">
            {/* Full Movie Name */}
            <p className="text-white font-semibold text-lg truncate">
              {data.title}
            </p>

            <ContinueWatchingCard data={data} customClass="h-[180px]" />

            {/* Play Button at Bottom Right */}
            <button
              onClick={() => handleRemove(data.id)}
              className="absolute bottom-2 right-2 bg-red-600 p-2 rounded-full text-white hover:bg-red-700 transition"
              title="Remove"
            >
              <FaTrash size={16} />
            </button>
          </div>
        ))}

        {/* Filler Cards for Alignment */}
        {mappedData.length % 3 !== 0 &&
          Array.from({ length: 3 - (mappedData.length % 3) }).map((_, idx) => (
            <ContinueWatchingCard key={idx} hidden customClass="h-[180px]" />
          ))}
      </div>
    </div>
  );
};

export default WatchHistory;
