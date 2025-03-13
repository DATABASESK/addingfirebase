'use client';

import { getEpisodes } from '@/lib/TVfunctions';
import { saveWatchProgress } from '@/utils/ProgressHandler';
import { useSearchParams } from 'next/navigation';
import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';

export const WatchAreaContext = createContext();

export function WatchAreaContextProvider({ children, MovieInfo, MovieId }) {
  const searchparam = useSearchParams();

  const [episode, setEpisode] = useState(parseInt(searchparam.get('ep')) || 1);
  const [season, setSeason] = useState(parseInt(searchparam.get('se')) || 1);
  const [watchInfo, setWatchInfo] = useState({ loading: true });
  const [episodes, setEpisodes] = useState([]);
  const [episodeLoading, setEpisodeLoading] = useState(true);

  const imdb_id = MovieInfo?.external_ids?.imdb_id || ''; // Get IMDb ID

  // Fetch episodes when season changes
  useEffect(() => {
    if (!MovieInfo) return; // Early return if MovieInfo is not available

    setEpisodeLoading(true); // Start loading state

    if (MovieInfo.type !== "tv") {
      const sampleData = [
        {
          episode_number: 1,
          name: MovieInfo.title,
          overview: MovieInfo.overview,
          runtime: 86,
          season_number: 1,
          still_path: MovieInfo.backdrop_path,
        },
      ];

      setEpisodes(sampleData);
      setEpisodeLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const episodeData = await getEpisodes(MovieId, season, imdb_id);

        if (!episodeData) {
          handleNoEpisodeFound();
          return;
        }

        setEpisodes(episodeData.episodes);
      } catch (error) {
        handleError(error);
      } finally {
        setEpisodeLoading(false);
      }
    };

    fetchData();
  }, [MovieInfo, MovieId, season, imdb_id]);

  // Update watchInfo when episode changes
  useEffect(() => {
    if (episodes.length === 0) return;

    const selectedEpisode = episodes.find((item) => item.episode_number === episode);

    if (!selectedEpisode) {
      handleNoEpisodeFound();
      return;
    }

    setWatchInfo({
      loading: false,
      url: selectedEpisode?.url || '',
      watchdata: selectedEpisode,
    });

    saveWatchProgress(MovieInfo, episodes, episode, season);
  }, [episode, episodes]);

  const handleNoEpisodeFound = () => {
    setWatchInfo({ loading: false, url: '', watchdata: null });
    toast(`No episodes found`);
  };

  const handleError = (error) => {
    console.error('Failed to fetch watch data:', error);
    setWatchInfo({ loading: false, error: 'Failed to fetch data' });
    toast('Failed to fetch data');
  };

  const contextValue = useMemo(
    () => ({
      episode,
      watchInfo,
      setWatchInfo,
      setEpisode,
      episodes,
      MovieInfo,
      MovieId,
      season,
      setSeason,
      episodeLoading,
      setEpisodeLoading,
      imdb_id,
    }),
    [
      episode,
      watchInfo,
      episodes,
      MovieInfo,
      MovieId,
      season,
      episodeLoading,
      imdb_id,
    ]
  );

  return <WatchAreaContext.Provider value={contextValue}>{children}</WatchAreaContext.Provider>;
}

export function useWatchContext() {
  return useContext(WatchAreaContext);
}
