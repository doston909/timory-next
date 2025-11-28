import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import WatchStoriesDetail from "@/libs/components/homepage/WatchStoriesDetail";
import { NextPage } from "next";

const WatchStoryDetailPage: NextPage = () => {
  return <WatchStoriesDetail />;
};

export default withLayoutBasic(WatchStoryDetailPage);

