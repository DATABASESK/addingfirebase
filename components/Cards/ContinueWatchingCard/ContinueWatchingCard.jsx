"use client";
import Image from "next/image";
import Link from "next/link";
import { FaPlay, FaTrashAlt } from "react-icons/fa";
import { removeFromWatchHistory } from "@/utils/ProgressHandler";

const ContinueWatchingCard = ({ data, hidden }) => {
  if (hidden) return <div className="hidden"></div>;

  const handleRemove = () => {
    removeFromWatchHistory(data?.id);
    window.location.reload(); // Reload page to reflect changes
  };

  // ✅ Upgrade image quality if API provides multiple resolutions
  const highResThumbnail = data?.thumbnail?.replace("/w300", "/w1280") || data?.thumbnail;

  return (
    <Link
      className="w-full h-full aspect-video cursor-pointer rounded-xl relative overflow-hidden border-2 border-[#22212c] bg-[#22212c] group"
      href={`/watch/${data?.id}?media_type=${data?.media_type}&se=${data?.season}&ep=${data?.episode}`}
    >
      {/* ✅ High-Quality Image Fix */}
      <Image
        src={highResThumbnail}
        alt={data?.title || "thumbnail"}
        height={284}
        width={388}
        quality={100}  // Maximum image quality
        priority       // Faster loading for important images
        className="object-cover w-full h-full group-hover:h-[106%] duration-200"
      />

      {/* Overlay Content */}
      <div className="w-full h-20 absolute flex flex-col justify-between bottom-0 after:content-[''] after:w-full after:h-28 after:absolute after:bottom-0 after:bg-[linear-gradient(360deg,#060602,#00000069,transparent)]">
        <div className="flex flex-col mx-3 justify-between gap-3 z-10">
          <div className="flex items-center justify-between w-full">
            <div>
              <div className="text-white text-wrap break-words overflow-hidden text-ellipsis line-clamp-1 font-['poppins'] text-lg cursor-pointer hover:text-slate-200">
                {data?.title}
              </div>
              <div className="text-[#ffffff8a] font-['poppins'] text-[14px]">
                Episode: {data?.episode}
              </div>
            </div>

            {/* Play Button */}
            <div className="p-[13px] rounded-full flex items-center justify-center bg-[#1a212bd0] text-[#8c97a7] cursor-pointer border border-[#242b35] backdrop-blur-sm hover:bg-[#2c3440d0] hover:text-[#abbcd5] duration-100">
              <FaPlay />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#404141] h-1 rounded-md">
            <div
              className="h-full bg-[#dd8dae] rounded-md"
              style={{ width: `${(data?.episode * 100) / data?.totalepisode || 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <div className="absolute top-2 right-2 p-2 cursor-pointer text-white" onClick={handleRemove}>
        <FaTrashAlt />
      </div>
    </Link>
  );
};

export default ContinueWatchingCard;
