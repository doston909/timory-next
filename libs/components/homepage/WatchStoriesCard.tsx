import { Stack, Box, Button } from "@mui/material";
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
            <Button className="story-button" variant="outlined">
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
            <Button className="story-button" variant="outlined">
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

