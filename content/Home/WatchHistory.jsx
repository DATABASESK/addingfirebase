"use client";
import { useEffect, useState } from "react";
import ContinueWatchingCard from "@/components/Cards/ContinueWatchingCard/ContinueWatchingCard";
import { FaArrowRight } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6"; // Import bin icon
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

  // Function to remove an item from watch history
  const handleRemove = (id) => {
    removeWatchProgress(id); // Remove from storage
    setMappedData((prevData) => prevData.filter(item => item.id !== id)); // Update UI
  };

  return mappedData.length < 1 ? null : (
    <div className="w-full max-w-[96rem] relative mx-5">
      <div className="flex justify-between">
        <h1 className="text-[#f6f4f4ea] font-medium text-2xl font-['poppins'] max-[450px]:text-[1.2rem]">
          | Continue Watching
        </h1>

        <Link
          href={`/continue-watching`}
          className="text-[#ffffffbd] flex items-center gap-1 cursor-pointer hover:text-slate-500 transition"
        >
          See All <FaArrowRight />
        </Link>
      </div>

      <div className="mt-8 mb-24 grid grid-cols-[repeat(auto-fit,minmax(343px,1fr))] max-[725px]:grid-cols-[repeat(auto-fit,minmax(285px,1fr))] gap-3">
        {mappedData.map((data) => (
          <div key={data.id} className="relative group">
            <ContinueWatchingCard data={data} />
            
            {/* Bin Icon (Delete Button) */}
            <button
              onClick={() => handleRemove(data.id)}
              className="absolute top-2 right-2 bg-red-600 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition duration-300"
              title="Remove"
            >
              <FaTrash size={16} />
            </button>
          </div>
        ))}

        {mappedData.length < 4
          ? Array.from({ length: 4 - mappedData.length }).map((_, index) => (
              <ContinueWatchingCard key={index} hidden />
            ))
          : null}
      </div>
    </div>
  );
};

export default WatchHistory;
