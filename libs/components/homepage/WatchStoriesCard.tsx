import { Stack, Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export type WatchStory = {
  id: number;
  title: string;
  description: string;
  image: string;
  imagePosition: "left" | "right";
  buttonText: string;
};

const WatchStoriesCard = ({ story }: { story: WatchStory }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push({
      pathname: "/watch-stories/[id]",
      query: { id: story.id },
    });
  };

  return (
    <Box className="watch-story-card">
      {story.imagePosition === "left" ? (
        <>
          <Box className="story-image-box">
            <img src={story.image} alt={story.title} />
          </Box>
          <Box className="story-content-box">
            <h2 className="story-title">{story.title}</h2>
            <p className="story-description">{story.description}</p>
            <Button
              className="story-button"
              variant="outlined"
              onClick={handleButtonClick}
            >
              {story.buttonText}
              <ArrowForwardIcon sx={{ ml: 1, fontSize: 18 }} />
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box className="story-content-box">
            <h2 className="story-title">{story.title}</h2>
            <p className="story-description">{story.description}</p>
            <Button
              className="story-button"
              variant="outlined"
              onClick={handleButtonClick}
            >
              {story.buttonText}
              <ArrowForwardIcon sx={{ ml: 1, fontSize: 18 }} />
            </Button>
          </Box>
          <Box className="story-image-box">
            <img src={story.image} alt={story.title} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default WatchStoriesCard;

