import Collection from "@/content/Home/Collection";
import Herosection from "@/content/Home/HeroSection/Herosection";
import Popular from "@/content/Home/Popular";
import TopRated from "@/content/Home/Season";
import Trending from "@/content/Home/Trending";
import WatchHistory from "@/content/Home/WatchHistory";
import Tamil from "@/content/Home/Tamil";
import Horror from "@/content/Home/Horror";
import Romantic from "@/content/Home/Romantic";
import RecentTamil from "@/content/Home/RecentTamil"; // Import Recent Tamil Movies
import { 
  getTrendingMovies, 
  getTopRatedMovies, 
  getTamilTrendingMovies, 
  getHorrorMovies, 
  getRomanticMovies, 
  getRecentTamilMovies 
} from "@/lib/MoviesFunctions";

const Home = async () => {
  const [trendingdata, top_rateddata, tamilMovies, horrorMovies, romanticMovies, recentTamilMovies] = await Promise.all([
    getTrendingMovies(),
    getTopRatedMovies(),
    getTamilTrendingMovies(),
    getHorrorMovies(),
    getRomanticMovies(),
    getRecentTamilMovies(), // Fetch recent Tamil movies
  ]);

  return (
    <>
      <Herosection data={trendingdata} />

      {/* Global Spacing Added */}
      <div className="w-full flex flex-col items-center z-10 relative main-responsive space-y-16 mt-16">
        <Trending data={trendingdata} />
        <RecentTamil data={recentTamilMovies} /> {/* Recent Tamil Movies (Moved to 2nd Place) */}
        <WatchHistory />
        <Collection />
        <Popular />
        <TopRated data={top_rateddata} />
        <Tamil data={tamilMovies} />
        <Horror data={horrorMovies} />
        <Romantic data={romanticMovies} />
      </div>

      {/* background */}
      <div className="fixed w-[138.33px] h-[82.25px] left-[1%] top-[2%] bg-[#92b7fc8f] blur-[200px]"></div>
      <div className="fixed w-[500px] h-[370.13px] right-[50%] bottom-[20%] bg-[#576683b4] blur-[215.03px] translate-x-[70%] z-0 rounded-full"></div>
    </>
  );
};

export default Home;
