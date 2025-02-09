import Image from 'next/image';
import Head from 'next/head';
import { nightTokyo } from "@/utils/fonts";

export default function Custom404() {
  return (
    <>
      <Head>
        <style>{`
          @font-face {
            font-family: 'NightinTokyo';
            src: url('/assets/font/NightinTokyo.ttf') format('truetype');
          }
        `}</style>
      </Head>

      <div className="w-full min-h-screen bg-[#001f3d] flex flex-col items-center justify-center text-center px-6 py-8 space-y-6 pt-20">
        <div className="bg-[#002a4d] p-6 rounded-lg shadow-lg max-w-3xl">
          <h1 className="text-2xl font-bold text-white mb-4">Legal Disclaimer</h1>
          <p className="text-white text-sm leading-relaxed">
            SK MOVIES does not host any files on its servers. All content is provided by third-party services.
          </p>
          <h2 className="text-xl font-semibold text-white mt-4">Important Notice</h2>
          <p className="text-white text-sm leading-relaxed">
            SK MOVIES is a content aggregator linking to third-party providers. We do not host, upload, or distribute any media files. All displayed content is hosted by external services not affiliated with SK MOVIES. Any legal issues should be directed to the respective file hosts.
          </p>
          <h2 className="text-xl font-semibold text-white mt-4">Terms of Use</h2>
          <p className="text-white text-sm leading-relaxed">
            By using SK MOVIES, you acknowledge that we are not responsible for and have no control over third-party content. Users must ensure their usage complies with applicable laws. SK MOVIES reserves the right to modify or discontinue any aspect of the service at any time without notice.
          </p>
          <h2 className="text-xl font-semibold text-white mt-4">Copyright and DMCA</h2>
          <p className="text-white text-sm leading-relaxed">
            If you believe your copyrighted work has been linked without authorization, please contact the respective hosting service. SK MOVIES operates under DMCA safe harbor provisions and similar regulations worldwide.
          </p>
          <h2 className="text-xl font-semibold text-white mt-4">Limitation of Liability</h2>
          <p className="text-white text-sm leading-relaxed">
            SK MOVIES and its affiliates are not liable for any direct or indirect damages resulting from:
          </p>
          <ul className="list-disc text-white text-sm pl-6 text-left">
            <li>Your use or inability to use the service</li>
            <li>Any content accessed via third-party services</li>
            <li>Unauthorized access to or alteration of data</li>
            <li>Statements or conduct of any third party on the service</li>
          </ul>
        </div>

        <div className="flex flex-col items-center mt-6">
          <p className="text-lg text-white font-semibold">Created by</p>
          <Image
            src="https://th.bing.com/th/id/OIP.SmnQrozPVg1WdFThnnjqhwHaKQ?w=156&h=197&c=7&r=0&o=5&pid=1.7"
            alt="Creator Image"
            width={156}
            height={197}
            className="rounded-lg shadow-lg mt-2"
          />
          <p className={`${nightTokyo.className} text-3xl text-white mt-2`}>Kishore</p>
        </div>
      </div>
    </>
  );
}
