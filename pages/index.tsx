

import PopularWatches from "@/libs/components/homepage/PopularWatches";
import withLayoutMain from "@/libs/components/layout/LayoutHome";
import { Stack } from "@mui/material";
import { NextPage } from "next";


const Home: NextPage = () => {
  return (
      <Stack className={"home-page"}>
      <PopularWatches />
        <Stack>
          <Stack className="container">Limited Editions Spotlight</Stack>
        </Stack>
        <Stack>
          <Stack className="container">Top Brands</Stack>
        </Stack>
        <Stack>
          <Stack className="container">Top Agents</Stack>
        </Stack>
        <Stack>
          <Stack className="container">Bestseller Watches</Stack>
        </Stack>
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
