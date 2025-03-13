import Collection from "@/content/Home/Collection";
import Herosection from "@/content/Home/HeroSection/Herosection";
import Popular from "@/content/Home/Popular";
import TopRated from "@/content/Home/Season";
import Trending from "@/content/Home/Trending";
import WatchHistory from "@/content/Home/WatchHistory";
import Tamil from "@/content/Home/Tamil";
import Horror from "@/content/Home/Horror";
import Romantic from "@/content/Home/Romantic";
import RecentTamil from "@/content/Home/RecentTamil"; 
import TopNetflixSeries from "@/content/Home/TopNetflixSeries"; // ✅ Import Top Netflix Series
import FantasyMovies from "@/content/Home/FantasyMovies"; // ✅ Import Fantasy Movies

import { 
  getTrendingMovies, 
  getTopRatedMovies, 
  getTamilTrendingMovies, 
  getHorrorMovies, 
  getRomanticMovies, 
  getRecentTamilMovies,
  getTopNetflixSeriesGlobal, // ✅ Fetch Function for Netflix Series
  getFantasyMovies // ✅ Fetch Function for Fantasy Movies
} from "@/lib/MoviesFunctions";

const Home = async () => {
  const [
    trendingdata, 
    top_rateddata, 
    tamilMovies, 
    horrorMovies, 
    romanticMovies, 
    recentTamilMovies,
    topNetflixSeries, // ✅ Fetching Netflix Series
    fantasyMovies // ✅ Fetching Fantasy Movies
  ] = await Promise.all([
    getTrendingMovies(),
    getTopRatedMovies(),
    getTamilTrendingMovies(),
    getHorrorMovies(),
    getRomanticMovies(),
    getRecentTamilMovies(),
    getTopNetflixSeriesGlobal(), // ✅ Fetching Top Netflix Series
    getFantasyMovies() // ✅ Fetching Fantasy Movies
  ]);

  return (
    <>
      <Herosection data={trendingdata} />

      {/* Global Spacing Added */}
      <div className="w-full flex flex-col items-center z-10 relative main-responsive space-y-16 mt-16">
        <Trending data={trendingdata} />
        <TopNetflixSeries data={topNetflixSeries} /> {/* ✅ Added Netflix Series */}
        <RecentTamil data={recentTamilMovies} />
        <WatchHistory />
        <FantasyMovies data={fantasyMovies} /> {/* ✅ Added Fantasy Movies Below Watch History */}
        <Collection />
        <Popular />
        <TopRated data={top_rateddata} />
        <Tamil data={tamilMovies} />
        <Horror data={horrorMovies} />
        <Romantic data={romanticMovies} />
      </div>

      {/* Background Effects */}
      <div className="fixed w-[138.33px] h-[82.25px] left-[1%] top-[2%] bg-[#92b7fc8f] blur-[200px]"></div>
      <div className="fixed w-[500px] h-[370.13px] right-[50%] bottom-[20%] bg-[#576683b4] blur-[215.03px] translate-x-[70%] z-0 rounded-full"></div>
    </>
  );
};

export default Home;
