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
    <div className="w-full flex flex-col gap-4 relative overflow-hidden">
      {/* Snowfall Effect */}
      <div className="snowfall-container">
        {Array.from({ length: 50 }).map((_, index) => (
          <div key={index} className="snowflake">❄</div>
        ))}
      </div>

      {/* Glowing Gradient "Select a Server" Header */}
      <div 
        className="server-header"
      >
        Select a Server
      </div>

      {/* Server Selection Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        {(MovieInfo?.type === "movie" ? MovievideoPlayerEntry : TVVideoPlayerEntry)?.map((item, index) => (
          <div
            key={item[0]}
            onClick={() => changeServer(item)}
            className="server-button"
          >
            {item[0]}
          </div>
        ))}
      </div>

      {/* CSS Styling */}
      <style jsx>{`
        .server-header {
          background: linear-gradient(45deg, #ff00ff, #00ffff, #ff6600);
          box-shadow: 0 0 10px 4px rgba(255, 255, 255, 0.8);
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
          border: 2px solid rgba(255, 255, 255, 0.5);
          padding: 12px 20px;
          border-radius: 10px;
          font-size: 18px;
          font-weight: bold;
          text-align: center;
          cursor: pointer;
          display: inline-block;
          margin: auto;
          max-width: 200px;
        }

        .server-button {
          background: linear-gradient(45deg, #ff0080, #8000ff);
          box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.6);
          color: #fff;
          padding: 10px 20px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s ease;
          text-align: center;
          font-size: 16px;
          border: 2px solid rgba(255, 255, 255, 0.6);
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
        }

        .server-button:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.9);
        }

        /* Snowfall Animation */
        .snowfall-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
        }

        .snowflake {
          position: absolute;
          top: -10px;
          font-size: 18px;
          color: rgba(255, 255, 255, 0.9);
          animation: snowfall linear infinite;
        }

        @keyframes snowfall {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        /* Randomized snowflake positions */
        ${Array.from({ length: 50 })
          .map((_, index) => `
            .snowflake:nth-child(${index + 1}) {
              left: ${Math.random() * 100}%;
              animation-duration: ${Math.random() * 3 + 2}s;
              animation-delay: ${Math.random() * 2}s;
            }
          `)
          .join("")}
      `}</style>
    </div>
  );
};

export default Server;
