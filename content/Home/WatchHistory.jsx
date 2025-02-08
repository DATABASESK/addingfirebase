"use client";
import ContinueWatchingCard from "@/components/Cards/ContinueWatchingCard/ContinueWatchingCard";
import { getWatchProgress } from "@/utils/ProgressHandler";
import { Fragment, useEffect, useState } from "react";

const ContinueWatching = () => {
  const [mappedData, setMappedData] = useState([]);

  useEffect(() => {
    const data = getWatchProgress(false);
    if (data) {
      setMappedData(data);
    }
  }, []);

  return (
    <Fragment>
      <div className="w-full flex flex-col items-center z-10 relative main-responsive top-[86px]">
        <div className="w-full max-w-[96rem] relative py-6">
          
          {/* Small line separation */}
          <div className="w-[-webkit-fill-available] h-[1px] absolute bg-[#212029] top-[1px]"></div>

          <div className="mt-[15px] flex flex-col">
            <h1 className="text-[#ffffffea] font-medium text-[23px] font-['poppins']">
              Continue Watching
            </h1>

            {mappedData.length < 1 ? null : (
              <div className="mt-8 mb-24 grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
                {mappedData.map((data) => (
                  <div key={data.id} className="relative bg-black p-3 rounded-lg">
                    {/* Full Movie Name Display */}
                    <p className="text-white font-semibold text-lg">{data.title}</p>

                    <ContinueWatchingCard data={data} customClass="h-[180px]" />

                    {/* Play Button at Bottom Right */}
                    <button
                      onClick={() => console.log("Play", data.title)}
                      className="absolute bottom-2 right-2 bg-red-600 p-2 rounded-full text-white hover:bg-red-700 transition"
                      title="Play"
                    >
                      ▶️
                    </button>
                  </div>
                ))}

                {/* Filler Cards for Alignment */}
                {mappedData.length % 3 !== 0 &&
                  Array.from({ length: 3 - (mappedData.length % 3) }).map((_, idx) => (
                    <ContinueWatchingCard key={idx} hidden customClass="h-[180px]" />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed w-[138.33px] h-[82.25px] left-[1%] top-[2%] bg-[#92b7fc8f] blur-[200px]"></div>
      <div className="fixed w-[500px] h-[370.13px] right-[50%] bottom-[20%] bg-[#576683b4] blur-[215.03px] translate-x-[70%] z-0 rounded-b-[30%]"></div>
    </Fragment>
  );
};

export default ContinueWatching;
