import LimitedEdition from "@/libs/components/homepage/LimitedEdition";
import PopularWatches from "@/libs/components/homepage/PopularWatches";
import TopBrands from "@/libs/components/homepage/TopBrands";
import withLayoutMain from "@/libs/components/layout/LayoutHome";
import { Stack } from "@mui/material";
import { NextPage } from "next";
import TopDealers from "@/libs/components/homepage/TopDealers";
import BestSeller from "@/libs/components/homepage/BestSeller";


const Home: NextPage = () => {
  return (
      <Stack className={"home-page"}>
      <PopularWatches />
        
        <LimitedEdition />
       
       <TopBrands />

      <TopDealers />
       
       <BestSeller />
       <Stack>
          <Stack className="container">Choose You Dial</Stack>
        </Stack>
        <Stack>
          <Stack className="container">Watch Stories</Stack>
        </Stack>
        <Stack>
          <Stack className="container">Latest News</Stack>
        </Stack>
      </Stack>
  );
};

export default withLayoutMain(Home);
