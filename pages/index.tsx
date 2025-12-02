import LimitedEdition from "@/libs/components/homepage/LimitedEdition";
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


const Home: NextPage = () => {
  return (
      <Stack className={"home-page"}>
   <TopBrands />
    <OurGoal />
      <PopularWatches />
        
         <WatchStories />
        <LimitedEdition />
       
    

     
       
       <BestSeller />

       <CreateAI />
      
       
      <News />
      </Stack>
  );
};

export default withLayoutMain(Home);
