import { Stack } from "@mui/material";
import WatchStoriesCard, { WatchStory } from "./WatchStoriesCard";

const watchStories: WatchStory[] = [
  {
    id: 1,
    title: "VINTAGE MEN & WOMEN'S WATCH",
    description:
      "Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient.",
    image: "/img/brand/story.webp",
    imagePosition: "left",
    buttonText: "Full view",
  },
  {
    id: 2,
    title: "WATCH REPAIR & SERVICES",
    description:
      "Morbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient.",
    image: "/img/brand/story2.webp",
    imagePosition: "right",
    buttonText: "Full view",
  },
];

const WatchStories = () => {
  return (
    <Stack className="watch-story-section">
       <h2 className="section-title">Brands Story</h2>
      <p className="section-subtitle">History speaks about us</p>
      {watchStories.map((story) => (
        <WatchStoriesCard key={story.id} story={story} />
      ))}
    </Stack>
  );
};

export default WatchStories;

