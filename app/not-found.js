import Image from 'next/image'; // Import Next.js Image component
import Head from 'next/head'; // If you want to include custom font via `@font-face`
import { nightTokyo } from "@/utils/fonts"; // Import the nightTokyo font

export default function Custom404() {
  return (
    <>
      {/* Adding custom font via @font-face */}
      <Head>
        <style>{`
          @font-face {
            font-family: 'NightinTokyo';
            src: url('/assets/font/NightinTokyo.ttf') format('truetype');
          }
        `}</style>
      </Head>

      <div className="w-full h-screen bg-[#001f3d] flex flex-col items-center justify-center text-center px-4">
        {/* Disclaimer Section */}
        <div className="font-bold text-white text-lg mb-4 space-y-4">
          <p className="text-xl">Legal Disclaimer</p>
          <p>
            SK MOVIES does not host any files on its servers. All content is provided by third-party services.
          </p>
          <p className="text-xl">Important Notice</p>
          <p>
            SK MOVIES is a content aggregator that only links to third-party services and providers. <br/>
            We do not host, upload, or distribute any videos, films, or media files. <br/>
            All media content displayed is hosted by external services not affiliated with SK MOVIES. <br/>
            Any legal issues regarding the content should be directed to the respective file hosts and providers.
          </p>
          <p className="text-xl">Terms of Use</p>
          <p>
            By using SK MOVIES, you acknowledge and agree that we are not responsible for and have no control over the content displayed through third-party services. <br/>
            Users are responsible for ensuring their use of third-party services complies with applicable laws and regulations. <br/>
            SK MOVIES reserves the right to modify, suspend, or discontinue any aspect of the service at any time without notice.
          </p>
          <p className="text-xl">Copyright and DMCA</p>
          <p>
            If you believe your copyrighted work has been linked to without authorization, please contact the respective hosting services directly. SK MOVIES is not responsible for hosting or removing content from third-party services. <br/>
            As a content aggregator, SK MOVIES operates under the safe harbor provisions of the Digital Millennium Copyright Act (DMCA) and similar regulations worldwide.
          </p>
          <p className="text-xl">Limitation of Liability</p>
          <p>
            SK MOVIES, its operators, affiliates, and licensors shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages resulting from: <br/>
            - Your use or inability to use the service <br/>
            - Any content accessed through third-party services <br/>
            - Unauthorized access to or alteration of your transmissions or data <br/>
            - Statements or conduct of any third party on the service
          </p>
        </div>

        {/* Created by Section */}
        <div className="mt-4">
          <p className="text-lg text-white">Created by</p>
          <Image
            src="https://th.bing.com/th/id/OIP.SmnQrozPVg1WdFThnnjqhwHaKQ?w=156&h=197&c=7&r=0&o=5&pid=1.7"
            alt="Image"
            width={156}
            height={197}
            className="rounded-md mt-2"
          />
        </div>

        {/* Name Section */}
        <div className="mt-4">
          <p className={`${nightTokyo.className} text-3xl text-white`}>Kishore</p>
        </div>
      </div>
    </>
  );
}
