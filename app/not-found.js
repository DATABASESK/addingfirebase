"use client"; // Ensure this component runs on the client side

import { FaArrowRight } from "react-icons/fa6";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center w-full h-screen bg-black">
      {/* Embedded External Website */}
      <iframe
        src="https://skyt-movie.onrender.com/"
        title="SKYT Movie"
        className="w-full h-full"
        style={{
          border: "none",
        }}
      ></iframe>

      {/* Return to Homepage Button */}
      <div className="fixed bottom-5 right-5 z-10">
        <button
          onClick={() => (window.location.href = "/")}
          className="hover:bg-slate-900 duration-100 text-white px-4 py-2 backdrop-blur-md text-[14px] border-[1px] border-[#ffffff4b] rounded-xl flex gap-2 items-center"
        >
          Back To Homepage <span className="mt-[3px]"><FaArrowRight /></span>
        </button>
      </div>
    </div>
  );
}
