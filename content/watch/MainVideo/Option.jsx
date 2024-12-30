import { useEffect } from "react";
import { LuExpand } from "react-icons/lu";
import { FaForward, FaLightbulb } from "react-icons/fa6";
import { FaBackward } from "react-icons/fa";
import { BiCollapse } from "react-icons/bi";
import { useWatchSettingContext } from "@/context/WatchSetting";
import { useWatchContext } from "@/context/Watch";

const Option = () => {
  const { setWatchSetting, watchSetting } = useWatchSettingContext();
  const { setEpisode, MovieInfo } = useWatchContext();

  useEffect(() => {
    if (watchSetting.autoPlay) {
      const videoElement = document.querySelector("video");
      if (videoElement) {
        videoElement.play();
        enterFullscreen(videoElement);
      }
    }
  }, [watchSetting.autoPlay]);

  const enterFullscreen = (elem) => {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(); // Safari
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen(); // IE11
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen(); // Safari
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen(); // IE11
    }
  };

  const toggleMovieFullscreen = () => {
    const videoElement = document.querySelector("video"); // Assuming the video element is on the page
    if (!videoElement) {
      console.error("Video element not found!");
      return;
    }

    if (!watchSetting.movieFullscreen) {
      enterFullscreen(videoElement); // Enter fullscreen mode for the video
    } else {
      exitFullscreen(); // Exit fullscreen mode
    }

    setWatchSetting((prev) => ({
      ...prev,
      movieFullscreen: !prev.movieFullscreen,
    }));
  };

  return (
    <div className="flex justify-between bg-[#22212c] px-2 py-2 text-slate-200 text-sm max-[880px]:flex-col max-[880px]:gap-5">
      <div className="flex gap-5 max-[880px]:flex-wrap">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() =>
            setWatchSetting((prev) => ({
              ...prev,
              isExpanded: !prev.isExpanded,
            }))
          }
        >
          <span>{watchSetting.isExpanded ? <BiCollapse /> : <LuExpand />}</span>
          {watchSetting.isExpanded ? "Collapse" : "Expand"}
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() =>
            setWatchSetting((prev) => ({ ...prev, light: !prev.light }))
          }
        >
          <span>
            <FaLightbulb />
          </span>
          Light
          <span className="text-[#e26bbd]">
            {watchSetting.light ? "On" : "Off"}
          </span>
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() =>
            setWatchSetting((prev) => ({
              ...prev,
              autoPlay: !prev.autoPlay,
            }))
          }
        >
          Auto Play
          <span className="text-[#e26bbd]">
            {watchSetting.autoPlay ? "Off" : "On"}
          </span>
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() =>
            setWatchSetting((prev) => ({
              ...prev,
              autoNext: !prev.autoNext,
            }))
          }
        >
          Auto Next
          <span className="text-[#e26bbd]">
            {watchSetting.autoNext ? "On" : "Off"}
          </span>
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={toggleMovieFullscreen}
        >
          Movie Fullscreen
          <span className="text-[#e26bbd]">
            {watchSetting.movieFullscreen ? "On" : "Off"}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            if (MovieInfo?.type === "tv") {
              setEpisode((prev) => (prev > 1 ? prev - 1 : prev));
            }
          }}
        >
          <span>
            <FaBackward />
          </span>{" "}
          Prev
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            if (MovieInfo?.type === "tv") {
              setEpisode((prev) => prev + 1);
            }
          }}
        >
          Next{" "}
          <span>
            <FaForward />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Option;
