"use client";

import { useWatchContext } from "@/context/Watch";
import Option from "./Option";
import Server from "./Server";
import { useEffect, useState } from "react";

const VideoPlayer = () => {
  const { watchInfo, MovieInfo, episode, season } = useWatchContext();
  const [videoUrl, setVideoUrl] = useState(watchInfo?.url);

  // Update video source when episode or season changes
  useEffect(() => {
    if (MovieInfo?.type === "tv" && MovieInfo?.seasons) {
      const newEpisodeUrl = MovieInfo?.seasons[season - 1]?.episodes?.[episode - 1]?.url || watchInfo?.url;
      setVideoUrl(newEpisodeUrl);
    }
  }, [episode, season, MovieInfo, watchInfo]);

  return (
    <div className="w-full bg-[#22212c] rounded-md p-2 !pb-0 flex flex-col">
      
      {/* Video Player */}
      <iframe
        src={videoUrl}
        className="aspect-video"
        allowFullScreen
        loading="lazy"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title={MovieInfo?.title || MovieInfo?.name || MovieInfo?.original_name || MovieInfo?.original_title}
      />

      {/* Options for navigation */}
      <Option />

      {/* Server selection */}
      <div className="h-full min-h-[124px] bg-[#484460] text-slate-100 flex rounded-md overflow-hidden mt-4 shadow-[3px_13px_29px_0px_#48455fbd] max-[880px]:flex-col">
        <Server />
      </div>

    </div>
  );
};

export default VideoPlayer;
