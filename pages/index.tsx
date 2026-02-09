import PopularWatches from "@/libs/components/homepage/PopularWatches";
import TopBrands from "@/libs/components/homepage/TopBrands";
import withLayoutMain from "@/libs/components/layout/LayoutHome";
import { Stack } from "@mui/material";
import { NextPage } from "next";
import BestSeller from "@/libs/components/homepage/BestSeller";
import WatchStories from "@/libs/components/homepage/WatchStories";
import CreateAI from "@/libs/components/homepage/CreateAI";
import OurGoal from "@/libs/components/homepage/OurGoal";
import News from "@/libs/components/homepage/News";
import TopDealers from "@/libs/components/homepage/TopDealers";
import LimitedEdition from "@/libs/components/homepage/LimitedEdition";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { GET_WATCHES } from "@/apollo/user/query";
import { useQuery } from "@apollo/client";

const Home: NextPage = () => {
  const device = useDeviceDetect();

  const {
    loading: getWatchesLoading,
    data: getWatchesData,
    error: getWatchesError,
    refetch: getWatchesRefetch,
  } = useQuery(GET_WATCHES, {
    fetchPolicy: "network-only",
    variables: {
      input: {
        page: 1,
        limit: 9,
        sort: "createdAt",
        direction: "DESC",
        search: {},
      },
    },
  });
console.log("getWatchesData", getWatchesData);
  return (
    <Stack className={"home-page"}>
      <TopBrands />
      <OurGoal />
      <PopularWatches />
      <WatchStories />
      <LimitedEdition />
      <TopDealers />
      <CreateAI />
      <BestSeller />
      <News />
    </Stack>
  );
};

export default withLayoutMain(Home);
