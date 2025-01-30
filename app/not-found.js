import Image from 'next/image'; // Import Next.js Image component
import Head from 'next/head'; // If you want to include custom font via `@font-face`

export default function Custom404() {
  return (
    <>
      {/* Adding custom font via @font-face */}
      <Head>
        <style>{`
          @font-face {
            font-family: 'NightinTokyo';
            src: url('/assets/font/NightinTokyo-Bold.ttf') format('truetype');
          }
        `}</style>
      </Head>

      <div className="w-full h-screen bg-white flex flex-col items-center justify-center text-center px-4">
        <div className="text-lg text-black mb-4">
          <p>This website is a movie platform created as part of a college project.</p>
          <p>It is built solely for educational purposes and is not intended for commercial use or sale.</p>
          <p>Please enjoy browsing the content!</p>
        </div>

        {/* Added "Created by" and image */}
        <div className="mt-4">
          <p className="text-lg">Created by</p>
          <Image
            src="https://th.bing.com/th/id/OIP.SmnQrozPVg1WdFThnnjqhwHaKQ?w=156&h=197&c=7&r=0&o=5&pid=1.7"
            alt="Image"
            width={156}
            height={197}
            className="rounded-md mt-2"
          />
        </div>

        {/* Added Kishore's name with custom font */}
        <div className="mt-4">
          <p className="text-2xl font-[NightinTokyo]">Kishore</p>
        </div>
      </div>
    </>
  );
}
