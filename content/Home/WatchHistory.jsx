"use client";
import { useEffect, useState } from "react";
import ContinueWatchingCard from "@/components/Cards/ContinueWatchingCard/ContinueWatchingCard";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import { getWatchProgress, removeWatchProgress } from "@/utils/ProgressHandler";
import Link from "next/link";

const WatchHistory = () => {
  const [mappedData, setMappedData] = useState([]);

  // Function to load watch history from localStorage
  const loadWatchHistory = () => {
    const data = getWatchProgress() || [];
    setMappedData(data);
  };

  useEffect(() => {
    loadWatchHistory(); // Load data on component mount
  }, []);

  // Function to remove a movie permanently
  const handleRemove = (id) => {
    removeWatchProgress(id); // Remove from local storage
    setMappedData(prevData => prevData.filter(item => item.id !== id)); // Update UI immediately
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
          <div key={data.id} className="relative">
            <ContinueWatchingCard data={data} />

            {/* Bin Icon Button */}
            <button
              onClick={() => handleRemove(data.id)}
              className="absolute top-2 right-2 bg-red-600 p-2 rounded-full text-white hover:bg-red-700 transition"
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
