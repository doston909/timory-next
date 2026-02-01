import { Stack, Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { WatchStory } from "@/libs/components/homepage/WatchStoriesCard";


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
    image: "/img/brand/story.webp",
    imagePosition: "left",
    buttonText: "Full view",
  },
  {
    id: 4,
    title: "PRECISION ENGINEERING MASTERY",
    description:
      "Morbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient.",
    image: "/img/brand/story2.webp",
    imagePosition: "right",
    buttonText: "Full view",
  },
  {
    id: 5,
    title: "HERITAGE WATCHMAKING ART",
    description:
      "Torbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient.",
    image: "/img/brand/story.webp",
    imagePosition: "left",
    buttonText: "Full view",
  },
  {
    id: 6,
    title: "MODERN HOROLOGICAL INNOVATION",
    description:
      "Morbi tincidunt augue interdum velit euismod. Nulla pharetra diam sit amet nisl. Et netus et malesuada fames ac turpis egestas maecenas. Penatibus et magnis dis parturient.",
    image: "/img/brand/story2.webp",
    imagePosition: "right",
    buttonText: "Full view",
  },
];

const WatchStoriesDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const story = watchStories.find(
    (s) => s.id === parseInt(id as string, 10)
  );

  if (!story) {
    return (
      <Stack className="watch-story-detail">
        <Box className="detail-container">
          <p>Story not found</p>
          <Button onClick={() => router.push("/")}>Go Back</Button>
        </Box>
      </Stack>
    );
  }

  return (
    <Stack className="watch-story-detail">
      <Box className="detail-container">
        <Button
          className="back-button"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
        >
          Back
        </Button>

        <Box className="detail-content">
          <Box className="detail-image-box">
            <img src={story.image} alt={story.title} />
          </Box>
          <Box className="detail-text-box">
            <h1 className="detail-title">{story.title}</h1>
            <p className="detail-description">{story.description}</p>
            <p className="detail-description">{story.description}</p>
            <p className="detail-description">{story.description}</p>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default WatchStoriesDetail;





