import PopularWatches from "@/libs/components/homepage/PopularWatches";
import TopBrands from "@/libs/components/homepage/TopBrands";
import withLayoutMain from "@/libs/components/layout/LayoutHome";
import { Stack, Box } from "@mui/material";
import { NextPage } from "next";
import { useEffect } from "react";
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
import { consumeHomepageScrollRestore } from "@/libs/homepageScroll";

const Home: NextPage = () => {
  const device = useDeviceDetect();

  useEffect(() => {
    const sectionId = consumeHomepageScrollRestore();
    if (sectionId) {
      requestAnimationFrame(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "auto", block: "start" });
        }
      });
    }
  }, []);

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
      <Box id="top-brands">
        <TopBrands />
      </Box>
      <Box id="our-goal">
        <OurGoal />
      </Box>
      <Box id="popular-watches">
        <PopularWatches />
      </Box>
      <Box id="watch-stories">
        <WatchStories />
      </Box>
      <Box id="limited-edition">
        <LimitedEdition />
      </Box>
      <Box id="top-dealers">
        <TopDealers />
      </Box>
      <Box id="create-ai">
        <CreateAI />
      </Box>
      <Box id="best-seller">
        <BestSeller />
      </Box>
      <Box id="news">
        <News />
      </Box>
    </Stack>
  );
};

export default withLayoutMain(Home);
