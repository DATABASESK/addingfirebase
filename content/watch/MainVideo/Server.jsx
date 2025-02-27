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
    Server11: `${process.env.NEXT_PUBLIC_MULTIEMBED}${MovieId}&tmdb=1`,
  };

  const TVVideoPlayers = {
    Server1: `${process.env.NEXT_PUBLIC_TV_VIDSRC_PRO}${MovieId}/${season}/${episode}`,
    Server2: `${process.env.NEXT_PUBLIC_TV_VIDSRC_IN}${MovieId}/${season}/${episode}`,
    Server3: `${process.env.NEXT_PUBLIC_TV_VIDSRC_ME}${MovieId}/${season}/${episode}`,
    Server4: `${process.env.NEXT_PUBLIC_TV_AUTOEMBED}${MovieId}/${season}/${episode}`,
    Server5: `${process.env.NEXT_PUBLIC_TV_MOVIESAPI}${MovieId}/${season}/${episode}`,
    Server6: `${process.env.NEXT_PUBLIC_TV_111MOVIES}${MovieId}/${season}/${episode}`,
    Server7: `${process.env.NEXT_PUBLIC_TV_VIDLINK}${MovieId}/${season}/${episode}`,
    Server8: `${process.env.NEXT_PUBLIC_TV_RGSHOWS}${MovieId}&s=${season}&e=${episode}`,
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

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Glowing Gradient "Select a Server" Header */}
      <div 
        className="px-5 py-3 text-lg font-bold text-white rounded-md shadow-lg transition-all duration-300 text-center"
        style={{
          background: "linear-gradient(45deg, #ff00ff, #00ffff, #ff6600)",
          boxShadow: "0 0 10px 4px rgba(255, 255, 255, 0.8)",
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
          letterSpacing: "1px",
          border: "2px solid rgba(255, 255, 255, 0.5)",
          cursor: "pointer",
          display: "inline-block",
          margin: "auto",
          maxWidth: "200px"
        }}
      >
        Select a Server
      </div>

      {/* Server Selection Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        {(MovieInfo?.type === "movie" ? MovievideoPlayerEntry : TVVideoPlayerEntry)?.map((item, index) => (
          <div
            key={item[0]}
            onClick={() => changeServer(item)}
            style={{
              background: `linear-gradient(45deg, ${index % 2 === 0 ? "#ff0080, #8000ff" : "#00ffff, #ff6600"})`,
              boxShadow: watchInfo?.url === item[1] 
                ? "0px 0px 15px 5px rgba(255, 255, 255, 0.9)" 
                : "0px 0px 10px rgba(0, 0, 0, 0.5)",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              textAlign: "center",
              fontSize: "16px",
              border: "2px solid rgba(255, 255, 255, 0.6)",
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)",
            }}
            className="hover:scale-105 transform transition-all duration-300"
          >
            {item[0]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Server;
