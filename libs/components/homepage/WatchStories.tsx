import { Stack, IconButton, Box } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
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
  const [pageLoadTime] = useState(() => Date.now());
  const hasProcessedQuery = useRef(false);
  const totalPages = Math.ceil(watchStories.length / STORIES_PER_PAGE);
  const router = useRouter();

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const startIndex = currentPage * STORIES_PER_PAGE;
  const endIndex = startIndex + STORIES_PER_PAGE;
  const currentStories = watchStories.slice(startIndex, endIndex);

  // URL'dan fromStoryId bo'lsa, shu id joylashgan sahifaga o'tamiz
  useEffect(() => {
    const { fromStoryId } = router.query;
    if (!fromStoryId) return;

    const raw = Array.isArray(fromStoryId) ? fromStoryId[0] : fromStoryId;
    const targetId = parseInt(raw as string, 10);
    if (Number.isNaN(targetId)) return;

    const idx = watchStories.findIndex((s) => s.id === targetId);
    if (idx === -1) return;

    const targetPage = Math.floor(idx / STORIES_PER_PAGE);
    setCurrentPage(targetPage);
  }, [router.query.fromStoryId]);

  // Sahifa va kartalar chizilgandan keyin, maqsad kartaga scroll
  // Faqat navigation bo'lganda, page reload bo'lganida emas
  useEffect(() => {
    const { fromStoryId } = router.query;
    if (!fromStoryId || hasProcessedQuery.current) return;

    // Birinchi marta processlaymiz
    hasProcessedQuery.current = true;

    // Agar sahifa yuklanganidan 500ms dan kam vaqt o'tgan bo'lsa, 
    // bu page reload, scroll qilmaymiz va query ni tozalaymiz
    const timeSinceLoad = Date.now() - pageLoadTime;
    if (timeSinceLoad < 500) {
      // Query parametrni tozalaymiz (shallow routing)
      const { pathname } = router;
      const newQuery = { ...router.query };
      delete newQuery.fromStoryId;
      router.replace({ pathname, query: newQuery }, undefined, { shallow: true });
      return;
    }

    const raw = Array.isArray(fromStoryId) ? fromStoryId[0] : fromStoryId;
    const targetId = parseInt(raw as string, 10);
    if (Number.isNaN(targetId)) return;

    const el = document.getElementById(`watch-story-card-${targetId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      // Scroll qilgandan keyin query parametrni tozalaymiz
      const { pathname } = router;
      const newQuery = { ...router.query };
      delete newQuery.fromStoryId;
      router.replace({ pathname, query: newQuery }, undefined, { shallow: true });
    }
  }, [currentPage, router.query.fromStoryId, pageLoadTime, router]);

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

