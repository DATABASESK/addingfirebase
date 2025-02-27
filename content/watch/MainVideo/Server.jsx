import React, { useEffect } from "react";
import { useWatchContext } from "@/context/Watch";

const Server = () => {
  const { MovieId, setWatchInfo, watchInfo, MovieInfo, episode, season } = useWatchContext();

  // Load URLs from environment variables
  const MovieVideoPlayers = {
    Server1: `${process.env.NEXT_PUBLIC_PIKASHOW}${MovieInfo?.imdb_id}?d=pikachu.app&sinku`,
    Server2: `${process.env.NEXT_PUBLIC_VIDLINK}${MovieId}`,
    Server3: `${process.env.NEXT_PUBLIC_VIDSRCDEV}${MovieId}`,
    Server4: `${process.env.NEXT_PUBLIC_VIDSRC_CC}${MovieId}`,
    Server5: `${process.env.NEXT_PUBLIC_VIDSRC_IN}${MovieId}`,
    Server6: `${process.env.NEXT_PUBLIC_VIDSRC_PRO}${MovieId}`,
    Server7: `${process.env.NEXT_PUBLIC_AUTOEMBED}${MovieId}`,
    Server8: `${process.env.NEXT_PUBLIC_MOVIESAPI}${MovieId}`,
    Server9: `${process.env.NEXT_PUBLIC_111MOVIES}${MovieId}`,
    Server10: `${process.env.NEXT_PUBLIC_RGSHOWS}${MovieId}`,
    Server11: `${process.env.NEXT_PUBLIC_MULTIEMBED}${MovieId}&tmdb=1`
  };

  const TVVideoPlayers = {
    Server1: `${process.env.NEXT_PUBLIC_TV_VIDSRC_PRO}${MovieId}/${season}/${episode}`,
    Server2: `${process.env.NEXT_PUBLIC_TV_VIDSRC_IN}${MovieId}/${season}/${episode}`,
    Server3: `${process.env.NEXT_PUBLIC_TV_VIDSRC_ME}${MovieId}/${season}/${episode}`,
    Server4: `${process.env.NEXT_PUBLIC_TV_AUTOEMBED}${MovieId}/${season}/${episode}`,
    Server5: `${process.env.NEXT_PUBLIC_TV_MOVIESAPI}${MovieId}/${season}/${episode}`,
    Server6: `${process.env.NEXT_PUBLIC_TV_111MOVIES}${MovieId}/${season}/${episode}`,
    Server7: `${process.env.NEXT_PUBLIC_TV_VIDLINK}${MovieId}/${season}/${episode}`,
    Server8: `${process.env.NEXT_PUBLIC_TV_RGSHOWS}${MovieId}&s=${season}&e=${episode}`
  };

  const MovievideoPlayerEntry = Object.entries(MovieVideoPlayers);
  const TVVideoPlayerEntry = Object.entries(TVVideoPlayers);

  const changeServer = (item) => {
    setWatchInfo({ loading: true });

    if (item) {
      setWatchInfo({
        url: item[1],
        iframe: true,
        loading: false,
      });
    }
  };

  useEffect(() => {
    const setDefault = () => {
      setWatchInfo({ loading: true });
      setWatchInfo({
        url: MovieInfo?.type === "tv" ? TVVideoPlayerEntry[0][1] : MovievideoPlayerEntry[0][1],
        iframe: true,
        loading: false,
      });
    };

    setDefault();
  }, [MovieInfo]);

  // Gradient colors for each button
  const gradientColors = [
    "linear-gradient(45deg, #ff00ff, #00ffff)",  // Pink-Blue (Diamond)
    "linear-gradient(45deg, #ff7e5f, #feb47b)",  // Sunset Glow
    "linear-gradient(45deg, #8e44ad, #f1c40f)",  // Purple-Gold
    "linear-gradient(45deg, #00c6ff, #0072ff)",  // Cyan-Blue
    "linear-gradient(45deg, #ff416c, #ff4b2b)",  // Fiery Red-Orange
    "linear-gradient(45deg, #06beb6, #48b1bf)",  // Green-Blue
    "linear-gradient(45deg, #ee0979, #ff6a00)",  // Red-Orange
    "linear-gradient(45deg, #3a1c71, #ffaf7b)",  // Purple-Peach
    "linear-gradient(45deg, #ff4b1f, #ff9068)",  // Burnt Orange
    "linear-gradient(45deg, #3c1053, #ad5389)",  // Dark Purple-Pink
    "linear-gradient(45deg, #fc466b, #3f5efb)"   // Pink-Blue
  ];

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="bg-[#323044] w-full h-full px-4 flex items-center gap-8 max-[880px]:py-2 max-[515px]:flex-col max-[515px]:gap-5">
        <div className="flex items-center text-white font-semibold text-lg">
          <span>
            <svg
              viewBox="0 0 32 32"
              className="w-5 h-5 mr-1 max-[500px]:w-4"
              fill="none"
              aria-hidden="true"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.6661 6.66699C4.29791 6.66699 3.99943 6.96547 3.99943 7.33366V24.667C3.99943 25.0352 4.29791 25.3337 4.6661 25.3337H27.3328C27.701 25.3337 27.9994 25.0352 27.9994 24.667V7.33366C27.9994 6.96547 27.701 6.66699 27.3328 6.66699H4.6661Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
          Select a Server
        </div>
        <div className="flex gap-2 flex-wrap max-[515px]:justify-center">
          {(MovieInfo?.type === "movie" ? MovievideoPlayerEntry : TVVideoPlayerEntry)?.map((item, index) => (
            <div
              key={item[0]}
              onClick={() => changeServer(item)}
              style={{
                background: gradientColors[index % gradientColors.length],
                boxShadow: watchInfo?.url === item[1] ? "0 0 10px 4px rgba(255, 255, 255, 0.8)" : "0 0 5px 2px rgba(255, 255, 255, 0.3)",
                transition: "all 0.3s ease-in-out",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)"
              }}
              className="px-4 py-[6px] text-[15px] border border-[#5b5682] rounded-md cursor-pointer font-bold text-white hover:scale-105 hover:shadow-[0px_0px_15px_5px_rgba(255,255,255,0.5)]"
            >
              {item[0]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Server;
