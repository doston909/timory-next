import { Stack, Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
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
  const [prevImage, setPrevImage] = useState(story.image);
  const [currentImage, setCurrentImage] = useState(story.image);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (story.image !== currentImage) {
      setIsTransitioning(true);
      const img = new Image();
      img.src = story.image;
      img.onload = () => {
        setPrevImage(currentImage);
        setCurrentImage(story.image);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      };
    }
  }, [story.image, currentImage]);

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
          <Box className="story-image-box" onClick={handleButtonClick}>
            {isTransitioning && (
              <img 
                src={prevImage} 
                alt={story.title}
                className="image-fade-out"
              />
            )}
            <img 
              src={currentImage} 
              alt={story.title}
              className={isTransitioning ? "image-fade-in" : "image-visible"}
            />
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
              <ArrowForwardIcon sx={{ ml: 1, fontSize: 24 }} />
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
              <ArrowForwardIcon sx={{ ml: 1, fontSize: 24 }} />
            </Button>
          </Box>
          <Box className="story-image-box" onClick={handleButtonClick}>
            {isTransitioning && (
              <img 
                src={prevImage} 
                alt={story.title}
                className="image-fade-out"
              />
            )}
            <img 
              src={currentImage} 
              alt={story.title}
              className={isTransitioning ? "image-fade-in" : "image-visible"}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default WatchStoriesCard;

