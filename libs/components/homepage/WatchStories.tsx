import { Stack, IconButton, Box } from "@mui/material";
import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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
  {
    id: 3,
    title: "LUXURY TIMEKEEPING COLLECTION",
    description:
      "Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient.",
    image: "/img/brand/st1.jpeg",
    imagePosition: "left",
    buttonText: "Full view",
  },
  {
    id: 4,
    title: "PRECISION ENGINEERING MASTERY",
    description:
      "Morbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient.",
    image: "/img/brand/st2.jpeg",
    imagePosition: "right",
    buttonText: "Full view",
  },
  {
    id: 5,
    title: "HERITAGE WATCHMAKING ART",
    description:
      "Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient.",
    image: "/img/brand/st3.jpeg",
    imagePosition: "left",
    buttonText: "Full view",
  },
  {
    id: 6,
    title: "MODERN HOROLOGICAL INNOVATION",
    description:
      "Morbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient.",
    image: "/img/brand/st4.jpeg",
    imagePosition: "right",
    buttonText: "Full view",
  },
];

const STORIES_PER_PAGE = 2;

const WatchStories = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(watchStories.length / STORIES_PER_PAGE);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const startIndex = currentPage * STORIES_PER_PAGE;
  const endIndex = startIndex + STORIES_PER_PAGE;
  const currentStories = watchStories.slice(startIndex, endIndex);

  return (
    <Stack id="watch-story-section" className="watch-story-section">
      <h2 className="section-title">Brands Story</h2>
      <p className="section-subtitle">History speaks about us</p>

      <Box className="watch-story-container">
        <IconButton
          className="scroll-arrow scroll-arrow-left"
          onClick={handlePrev}
          aria-label="Previous stories"
        >
          <ChevronLeftIcon />
        </IconButton>

        <Box className="watch-story-content" key={currentPage}>
          {currentStories.map((story) => (
            <WatchStoriesCard key={story.id} story={story} />
          ))}
        </Box>

        <IconButton
          className="scroll-arrow scroll-arrow-right"
          onClick={handleNext}
          aria-label="Next stories"
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Stack>
  );
};

export default WatchStories;

