import { useWatchContext } from '@/context/Watch';
import VideoPlayerContainer from './VideoPlayerContainer';
import { useEffect, useState } from 'react';

const VideoPlayer = ({ getInstance }) => {
  const { watchInfo, MovieInfo, episode, season } = useWatchContext();
  const [videoUrl, setVideoUrl] = useState(watchInfo?.url);

  // Update video URL when episode or season changes
  useEffect(() => {
    if (watchInfo?.iframe) {
      setVideoUrl(watchInfo?.url);
    }
  }, [watchInfo?.url, episode, season]);

  return watchInfo?.iframe ? (
    <iframe
      src={videoUrl}
      className="aspect-video"
      allowFullScreen
      loading="lazy"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      title={MovieInfo?.title || MovieInfo?.name || MovieInfo?.original_name || MovieInfo?.original_title}
    />
  ) : (
    <VideoPlayerContainer getInstance={getInstance} />
  );
};

export default VideoPlayer;
