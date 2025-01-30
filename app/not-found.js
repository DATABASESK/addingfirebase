export default function Custom404() {
  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-center px-4">
      <div className="text-4xl font-bold text-white mb-4">
        404 - Page Not Found
      </div>

      <div className="text-xl text-white mb-8">
        Oops! It seems you've reached a page that doesn't exist.
      </div>

      <div className="text-lg text-white max-w-[600px] mb-8 px-4">
        <p>This website is a movie platform created as part of a college project.</p>
        <p>It is built solely for educational purposes and is not intended for commercial use or sale.</p>
        <p>Please enjoy browsing the content, and let us know if you have any questions!</p>
      </div>

      <a href="/" className="mt-4 text-blue-500 hover:underline">
        Back to Homepage
      </a>
    </div>
  );
}
