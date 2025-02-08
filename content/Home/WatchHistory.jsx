import { useEffect, useState } from "react";
import ContinueWatchingCard from "@/components/Cards/ContinueWatchingCard/ContinueWatchingCard";
import { FaArrowRight } from "react-icons/fa";
import { getWatchProgress, saveWatchProgress } from "@/utils/ProgressHandler";
import Link from "next/link";

const WatchHistory = () => {
  const [mappedData, setMappedData] = useState([]);

  useEffect(() => {
    const data = getWatchProgress();
    if (data) {
      setMappedData(data);
    }
  }, []);

  // Function to handle the removal of a movie from the watch history
  const handleRemoveMovie = (id) => {
    // Remove the movie from the state
    const updatedData = mappedData.filter((movie) => movie.id !== id);
    setMappedData(updatedData);

    // Update local storage after removal
    const movieData = JSON.parse(localStorage.getItem("watch_history") || "{}");
    delete movieData[id];  // Remove the movie from watch history
    localStorage.setItem("watch_history", JSON.stringify(movieData));
  };

  return mappedData.length < 1 ? null : (
    <div className="w-full max-w-[96rem] relative mx-5">
      <div className="flex justify-between">
        <h1 className="text-[#f6f4f4ea] font-medium text-2xl font-['poppins'] max-[450px]:text-[1.2rem]">| Continue Watching</h1>
        <Link href={`/continue-watching`} className="text-[#ffffffbd] flex items-center gap-1 cursor-pointer hover:text-slate-500 transition">See All <FaArrowRight /></Link>
      </div>

      <div className="mt-8 mb-24 grid grid-cols-[repeat(auto-fit,minmax(343px,1fr))] max-[725px]:grid-cols-[repeat(auto-fit,minmax(285px,1fr))] gap-3">
        {mappedData.map((data) => (
          <ContinueWatchingCard key={data.id} data={data} onRemove={handleRemoveMovie} />
        ))}

        {mappedData.length < 4 &&
          Array.from({ length: 4 - mappedData.length }).map((_, index) => (
            <ContinueWatchingCard key={index} hidden />
          ))
        }
      </div>
    </div>
  );
};

export default WatchHistory;
