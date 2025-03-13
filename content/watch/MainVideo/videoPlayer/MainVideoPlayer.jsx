/* eslint-disable react-hooks/exhaustive-deps */
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider, Track, useMediaRemote } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { useWatchContext } from '@/context/Watch';
import { SaveProgress } from '@/utils/saveProgress';
import { useEffect, useRef, useState } from 'react';

function throttle(func, limit) {
  let lastFunc, lastRan;
  return function (...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, Math.max(limit - (Date.now() - lastRan), 0));
    }
  };
}

const MainVideoPlayer = ({ videoInfo, movieInfo }) => {
  const { MovieId, episode, season, setEpisode, setSeason } = useWatchContext();
  const [duration, setDuration] = useState(0);
  const [videoUrl, setVideoUrl] = useState('');

  const playerRef = useRef(null);
  const remote = useMediaRemote(playerRef);

  // Function to update video source
  useEffect(() => {
    if (movieInfo?.type === "tv" && movieInfo?.seasons) {
      const newEpisodeUrl = movieInfo?.seasons[season - 1]?.episodes?.[episode - 1]?.url || videoInfo?.server;
      setVideoUrl(newEpisodeUrl);
    } else {
      setVideoUrl(videoInfo?.server);
    }
  }, [episode, season, movieInfo, videoInfo]);

  // Function to save progress periodically
  const throttledSaveProgress = throttle((data) => {
    SaveProgress(
      MovieId,
      season || 1,
      episode,
      data?.currentTime,
      movieInfo?.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movieInfo?.poster_path}` 
        : `https://s4.anilist.co/file/anilistcdn/character/large/default.jpg`,
      duration,
      movieInfo?.title || movieInfo?.name || movieInfo?.original_name || movieInfo?.original_title,
      movieInfo?.type
    );
  }, 8000);

  // Resume from last watched timestamp
  const startFromWhereItWasLeft = () => {
    const watch_history = JSON.parse(localStorage?.getItem("watch_history"));

    if (
      watch_history &&
      watch_history[MovieId] &&
      watch_history[MovieId].episode?.toString() === episode?.toString() &&
      watch_history[MovieId].currentTime
    ) {
      const currentTime = parseInt(watch_history[MovieId].currentTime, 10);
      remote.seek(currentTime);
    }
  };

  useEffect(() => {
    startFromWhereItWasLeft();
  }, [videoUrl]);

  return (
    <div className="aspect-video">
      <MediaPlayer
        ref={playerRef}
        title={(movieInfo?.title || movieInfo?.name)?.length > 20 
          ? `${(movieInfo?.title || movieInfo?.name).slice(0, 20)}...` 
          : (movieInfo?.title || movieInfo?.name)}
        viewType="video"
        logLevel="warn"
        load="eager"
        posterLoad="eager"
        streamType="on-demand"
        crossOrigin
        playsInline
        src={`https://m3-u8-proxy-iota.vercel.app/m3u8-proxy?url=${encodeURIComponent(videoUrl)}&headers=${encodeURIComponent(`{"referer": "${videoInfo?.referer}"}`)}`}
        onTimeUpdate={throttledSaveProgress}
        onDurationChange={(e) => setDuration(e)}
      >
        <MediaProvider />
        <DefaultVideoLayout icons={defaultLayoutIcons} />

        {videoInfo?.subtitle?.map((item) => (
          <Track
            key={item?.lang}
            src={item?.src}
            kind="subtitles"
            label={item?.lang}
          />
        ))}
      </MediaPlayer>
    </div>
  );
};

export default MainVideoPlayer;
