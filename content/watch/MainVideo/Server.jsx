import React, { useEffect } from "react";
import { useWatchContext } from "@/context/Watch";

const Server = () => {
  const { MovieId, setWatchInfo, watchInfo, MovieInfo, episode, season } = useWatchContext();

  // Load URLs from environment variables
  const MovieVideoPlayers = {
    "Server 1": `${process.env.NEXT_PUBLIC_PIKASHOW}${MovieInfo?.imdb_id}?d=pikachu.app&sinku`,
    "Server 2": `${process.env.NEXT_PUBLIC_VIDLINK}${MovieId}`,
    "Server 3": `${process.env.NEXT_PUBLIC_VIDSRCDEV}${MovieId}`,
    "Server 4": `${process.env.NEXT_PUBLIC_VIDSRC_CC}${MovieId}`,
    "Server 5": `${process.env.NEXT_PUBLIC_VIDSRC_IN}${MovieId}`,
    "Server 6": `${process.env.NEXT_PUBLIC_VIDSRC_PRO}${MovieId}`,
    "Server 7": `${process.env.NEXT_PUBLIC_AUTOEMBED}${MovieId}`,
    "Server 8": `${process.env.NEXT_PUBLIC_MOVIESAPI}${MovieId}`,
    "Server 9": `${process.env.NEXT_PUBLIC_111MOVIES}${MovieId}`,
    "Server 10": `${process.env.NEXT_PUBLIC_RGSHOWS}${MovieId}`,
    "Server 11": `${process.env.NEXT_PUBLIC_MULTIEMBED}${MovieId}&tmdb=1`,
  };

  const TVVideoPlayers = {
    "Server 1": `${process.env.NEXT_PUBLIC_TV_VIDSRC_PRO}${MovieId}/${season}/${episode}`,
    "Server 2": `${process.env.NEXT_PUBLIC_TV_VIDSRC_IN}${MovieId}/${season}/${episode}`,
    "Server 3": `${process.env.NEXT_PUBLIC_TV_VIDSRC_ME}${MovieId}/${season}/${episode}`,
    "Server 4": `${process.env.NEXT_PUBLIC_TV_AUTOEMBED}${MovieId}/${season}/${episode}`,
    "Server 5": `${process.env.NEXT_PUBLIC_TV_MOVIESAPI}${MovieId}/${season}/${episode}`,
    "Server 6": `${process.env.NEXT_PUBLIC_TV_111MOVIES}${MovieId}/${season}/${episode}`,
    "Server 7": `${process.env.NEXT_PUBLIC_TV_VIDLINK}${MovieId}/${season}/${episode}`,
    "Server 8": `${process.env.NEXT_PUBLIC_TV_RGSHOWS}${MovieId}&s=${season}&e=${episode}`,
  };

  const MovievideoPlayerEntry = Object.entries(MovieVideoPlayers);
  const TVVideoPlayerEntry = Object.entries(TVVideoPlayers);

  const changeServer = async (item, isIframe = true) => {
    setWatchInfo({ loading: true });

    if (isIframe) {
      if (item) {
        setWatchInfo({
          url: item[1],
          iframe: true,
          loading: false,
        });
      }
      return;
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

  const serverColors = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFD700", 
    "#FF8C00", "#ADFF2F", "#00CED1", "#DC143C", "#8A2BE2", "#20B2AA"
  ];

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="bg-[#323044] w-full h-full px-4 flex items-center gap-8 max-[880px]:py-2 max-[515px]:flex-col max-[515px]:gap-5">
        <div className="flex items-center text-white font-bold text-lg">
          <span>
            <svg
              viewBox="0 0 32 32"
              className="w-5 h-5 mr-2 max-[500px]:w-4"
              fill="none"
              aria-hidden="true"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.6661 6.66699C4.29791 6.66699 3.99943 6.96547 3.99943 7.33366V24.667C3.99943 25.0352 4.29791 25.3337 4.6661 25.3337H27.3328C27.701 25.3337 27.9994 25.0352 27.9994 24.667V7.33366C27.9994 6.96547 27.701 6.66699 27.3328 6.66699H4.6661ZM8.66667 21.3333C8.29848 21.3333 8 21.0349 8 20.6667V11.3333C8 10.9651 8.29848 10.6667 8.66667 10.6667H14C14.3682 10.6667 14.6667 10.9651 14.6667 11.3333V12.6667C14.6667 13.0349 14.3682 13.3333 14 13.3333H10.8C10.7264 13.3333 10.6667 13.393 10.6667 13.4667V18.5333C10.6667 18.607 10.7264 18.6667 10.8 18.6667H14C14.3682 18.6667 14.6667 18.9651 14.6667 19.3333V20.6667C14.6667 21.0349 14.3682 21.3333 14 21.3333H8.66667ZM18 21.3333C17.6318 21.3333 17.3333 21.0349 17.3333 20.6667V11.3333C17.3333 10.9651 17.6318 10.6667 18 10.6667H23.3333C23.7015 10.6667 24 10.9651 24 11.3333V12.6667C24 13.0349 23.7015 13.3333 23.3333 13.3333H20.1333C20.0597 13.3333 20 13.393 20 13.4667V18.5333C20 18.607 20.0597 18.6667 20.1333 18.6667H23.3333C23.7015 18.6667 24 18.9651 24 19.3333V20.6667C24 21.0349 23.7015 21.3333 23.3333 21.3333H18Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
          Server
        </div>
        <div className="flex gap-2 flex-wrap max-[515px]:justify-center">
          {(MovieInfo?.type === "movie" ? MovievideoPlayerEntry : TVVideoPlayerEntry)?.map(
            (item, index) => (
              <div
                key={item[0]}
                onClick={() => changeServer(item)}
                style={{
                  background: watchInfo?.url === item[1] ? "#4a446c" : serverColors[index % serverColors.length],
                  color: "white",
                  border: "1px solid white",
                }}
                className="px-4 py-[6px] text-[15px] rounded-md cursor-pointer hover:opacity-80"
              >
                {item[0]}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Server;
