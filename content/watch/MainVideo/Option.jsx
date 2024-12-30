import { LuExpand } from "react-icons/lu";
import { FaForward, FaLightbulb } from "react-icons/fa6";
import { FaBackward } from "react-icons/fa";
import { BiCollapse } from "react-icons/bi";
import { useWatchSettingContext } from "@/context/WatchSetting";
import { useWatchContext } from "@/context/Watch";

const Option = () => {
  const { setWatchSetting, watchSetting } = useWatchSettingContext();
  const { setEpisode, MovieInfo } = useWatchContext();

  const toggleFullscreen = () => {
    const elem = document.documentElement; // Use the whole document as the fullscreen element
    if (!watchSetting.fullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
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
    setWatchSetting(prev => ({ ...prev, fullscreen: !prev.fullscreen }));
  };

  return (
    <div className="flex justify-between bg-[#22212c] px-2 py-2 text-slate-200 text-sm max-[880px]:flex-col max-[880px]:gap-5">
      <div className="flex gap-5 max-[880px]:flex-wrap">

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
          Auto Play
          <span className="text-[#e26bbd]">{watchSetting.autoPlay ? "Off" : "On"}</span>
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setWatchSetting(prev => ({ ...prev, autoNext: !prev.autoNext }))}
        >
          Auto Next
          <span className="text-[#e26bbd]">{watchSetting.autoNext ? "On" : "Off"}</span>
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={toggleFullscreen}
        >
          Fullscreen
          <span className="text-[#e26bbd]">{watchSetting.fullscreen ? "Off" : "On"}</span>
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
  );
};

export default Option;
