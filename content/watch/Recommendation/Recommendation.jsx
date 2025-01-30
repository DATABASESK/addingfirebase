import RecommendationCard from "@/components/Cards/HorizontalCard/HorizontalCard";
import { getRecommendation } from "@/lib/MoviesFunctions";
import { Fragment } from "react";

const Recommendation = async ({ MovieId, type }) => {
  const { results: recommendation = [] } = await getRecommendation(MovieId, type) || {};

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="text-[#ffffffe0] text-[18px] font-medium font-['poppins'] mb-4">
        Recommendation
      </div>

      <div className="w-full flex flex-col gap-3 sm:grid sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
        {recommendation?.slice(0, 12)?.map((item, index) => (
          <Fragment key={index}>
            <RecommendationCard
              data={item}
              type={item?.media_type || type}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
