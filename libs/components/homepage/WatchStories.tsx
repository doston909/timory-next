import { Stack, IconButton, Box } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import WatchStoriesCard, { WatchStory } from "./WatchStoriesCard";
import { useTranslation } from "@/libs/context/useTranslation";

const watchStories: WatchStory[] = [
  {
    id: 1,
    title: "Rolex",
    description:
      "Alfred Davis and his brother-in-law Hans Wilsdorf founded Wilsdorf and Davis, the company that would eventually become Rolex SA, in London in 1905. Wilsdorf and Davis's main commercial activity at the time involved importing Hermann Aegler's Swiss movements to England and placing...",
    image: "/img/brand/r7.jpg",
    imagePosition: "left",
    buttonText: "Full view",
  },
  {
    id: 2,
    title: "Patek Philippe",
    description:
      "The company traces its origins to the mid-19th century, when Polish watchmaker Antoni Patek and his Czech-born Polish business partner Franciszek Czapek formed Patek, Czapek & Cie in Geneva on 1 May 1839 and started...",
    image: "/img/brand/p7.webp",
    imagePosition: "right",
    buttonText: "Full view",
  },
  {
    id: 3,
    title: "Jacob & Co",
    description:
      "After graduating early from a jewelry design course in 1981 in New York City, Jacob Arabo opened a small booth in New York City's Diamond District, where he began designing for jewelry labels and private clients. In 1986, Arabo opened his own company, called 'Diamond Quasar'..",
    image: "/img/brand/j6.avif",
    imagePosition: "left",
    buttonText: "Full view",
  },
  {
    id: 4,
    title: "Richard Mille",
    description:
      "Richard Mille is a Swiss luxury watch company founded in 2001 by Dominique Guenat and Richard Mille, based in Les Breuleux, Switzerland. The brand specialises in high-priced clockwork watches, which have been criticised by some as ridiculous and unnecessarily extravagant...",
    image: "/img/brand/r6.webp",
    imagePosition: "right",
    buttonText: "Full view",
  },
  {
    id: 5,
    title: "Audemars Piguet",
    description:
      "In 1875 Audemars opened his own atelier in his family’s farmhouse, dedicated to “complicated” ébauches. Six years later, in 1881, he partnered with his friend and fellow watchmaker Edward Auguste Piguet to create Audemars Piguet & Cie...",
    image: "/img/brand/a6.jpg",
    imagePosition: "left",
    buttonText: "Full view",
  },
  {
    id: 6,
    title: "Omega",
    description:
      "In 1848, Louis Brandt founded the company that would become Omega in La Chaux-de-Fonds, Switzerland. He assembled key-wound precision pocket watches from parts supplied by local craftsmen.[13] He sold his watches from Italy to Scandinavia by way of England...",
    image: "/img/brand/o6.webp",
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
  const { t } = useTranslation();

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
      <h2 className="section-title">{t("home.brandsStory")}</h2>
      <p className="section-subtitle">{t("home.historySpeaksAboutUs")}</p>

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

