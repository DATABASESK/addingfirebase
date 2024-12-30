import { LuExpand } from "react-icons/lu";
import { FaForward, FaLightbulb } from "react-icons/fa6";
import { FaBackward } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { useWatchSettingContext } from "@/context/WatchSetting";
import { useWatchContext } from "@/context/Watch";
import { BiCollapse } from "react-icons/bi";
import { useRef, useState } from "react";

const Option = () => {
  const { setWatchSetting, watchSetting } = useWatchSettingContext();
  const { setEpisode, MovieInfo } = useWatchContext();
  const videoRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const videoElement = videoRef.current;
    if (!isFullscreen) {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else if (videoElement.webkitRequestFullscreen) { /* Safari */
        videoElement.webkitRequestFullscreen();
      } else if (videoElement.msRequestFullscreen) { /* IE11 */
        videoElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="flex flex-col bg-[#22212c] px-2 py-2 text-slate-200 text-sm gap-5">
      {/* Video Player */}
      <div className="video-container">
        <video
          ref={videoRef}
          controls
          className="w-full max-h-[400px] bg-black"
          src="your-video-url-here.mp4"
        />
      </div>

      {/* Options */}
      <div className="flex justify-between flex-wrap gap-5">
        <div className="flex gap-5">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setWatchSetting(prev => ({ ...prev, isExpanded: !prev.isExpanded }))}
          >
            <span>{watchSetting.isExpanded ? <BiCollapse /> : <LuExpand />}</span>
            {watchSetting.isExpanded ? "Collapse" : "Expand"}
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setWatchSetting(prev => ({ ...prev, light: !prev.light }))}
          >
            <span><FaLightbulb /></span>
            Light
            <span className="text-[#e26bbd]">{watchSetting.light ? "On" : "Off"}</span>
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setWatchSetting(prev => ({ ...prev, autoPlay: !prev.autoPlay }))}
          >
            Auto Play <span className="text-[#e26bbd]">{watchSetting.autoPlay ? "Off" : "On"}</span>
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setWatchSetting(prev => ({ ...prev, autoNext: !prev.autoNext }))}
          >
            Auto Next <span className="text-[#e26bbd]">{watchSetting.autoNext ? "On" : "Off"}</span>
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={toggleFullscreen}
          >
            <span>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              if (MovieInfo?.type === "tv") {
                setEpisode(prev => prev > 1 ? prev - 1 : prev);
              }
            }}
          >
            <span><FaBackward /></span> Prev
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              if (MovieInfo?.type === "tv") {
                setEpisode(prev => prev + 1);
              }
            }}
          >
            Next <span><FaForward /></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Option;
